
var i18n = []
var country

$(document).ready(function () {
	//$('#productIdentifiersDialog').hide()
	$('#items').hide()
	$('#noItems').hide()
//	$('#loadingItems').hide()
	$('#loggedInUser').hide()
	$('#loggedOutUser').hide()
	
	i18nLoad(i18n)
	
	loadUserData(function (userData) {
		if (userData) {
			$('#username').text(userData.nickname)
			$('#loggedInUser').show()
			loadItems()
		}
	})
})


var blocker
function block (message, element) {
	var target = $(element ? element : '#blocker')

	if (!blocker) {
		var properties = {}
		if (message) {
			properties.content = message
		}
		blocker = new ch.Transition(target, properties);
		blocker.show();
	}
}


function unblock (element) {
	var target = $(element ? element : window)

	if (blocker) {
		blocker.hide()
//		blocker.destroy()
		blocker = null
	}
}


function doLogin () {
	var loginUrl = '/login/'+country
	window.open(loginUrl, '_self')
}


function doLogout () {
	var logoutUrl = "/logout/"+country
	location.href = logoutUrl
}


function loadUserData (callback) {
	var userDataUrl = '/userData/'+country
	$.ajax({url:userDataUrl, dataType:'json',
		success: function (data) {
			var userData = data
			callback(userData)
		}
	})
}


function loadItems () {
	block(i18n['items.retrieving'])

	$('#items').hide()
	$('#noItems').hide()
//	$('#loggedOff').hide()
//	$('#loadingItems').show()

	var tokenRetrieveUrl = '/items/'+country
	$.ajax({url:tokenRetrieveUrl, dataType:'json', success: function (data) {
		var jsonData = data

		var firstItemId
		for (var i=0; i < jsonData.length; i++) {
			var item = jsonData[i]

			if (!firstItemId) {
				firstItemId = item.id
			}

			var hasProductIdentifiers = item.product_identifiers.brand || item.product_identifiers.mpn || item.product_identifiers.gtins.length

			var newRow = $('<tr>')
			newRow.attr('id', 'item_row_'+item.id)

			newRow.append( $('<td>').append( $('<a>').attr('tabindex', '-1').attr('href', item.permalink).attr('target', '_blank').append(item.id) ) )
			newRow.append( $('<td>').append(item.title) )
			newRow.append( $('<td>').append(item.category_breadcrumb) )

			var iconClass = hasProductIdentifiers ? 'ch-icon-ok' : 'ch-icon-remove'
			var iconColor = hasProductIdentifiers ? 'green' : 'red'
			newRow.append( $('<td>').attr('style', 'text-align:center').append( $('<span>').attr('id', 'has_product_identifiers_'+item.id).attr('class', iconClass).attr('style', 'color: '+iconColor) ))

			var itemData = {id: item.id, title: item.title, category_id: item.category_id}

			newRow.append( $('<td>').append( $('<input>').attr('id', 'item_button_'+item.id).attr('type', 'button').attr('class', 'ch-btn-skin ch-btn-small tableButton').val(hasProductIdentifiers ? i18n['change'] : i18n['set'])
														 .click(function (itemValues) {
														 		return function () {
																	showProductIdentifiersDialog(itemValues)
																}
															}(itemData)) ))

			$('#items > table > tbody').append(newRow)

			

		}

//		$('#loadingItems').hide()
		if (firstItemId) {
			$('#items').show()
			$('#item_button_'+firstItemId).focus()
		}
		else {
			$('#noItems').show()
		}

		unblock()
	}})
}


function loadProductIdentifiers(itemId, callback) {
	var productIdentifiersRetrieveUrl = '/productIdentifiers/'+country+'/'+itemId
	$.ajax({url:productIdentifiersRetrieveUrl, dataType:'json', success: function (data) {
		var jsonData = data
		callback(itemId, jsonData)
	}})
}

var productIdentifiersDialog
function showProductIdentifiersDialog (item) {
	BootstrapDialog.show({
		type: BootstrapDialog.TYPE_INFO,
		title: function () {return renderTitle(item)},
        message: function () {return renderDialog(item)},
        closable: false,
        onshown: function (dialogref) {
        	$('#brandHelp').tooltip();
        	$('#mpnHelp').tooltip();
        	$('#gtinsHelp').tooltip();
        	$('#piBrand').focus()
        	
//        	createTooltips()
        },
        buttons: [{
        	label: i18n['send']+' (enter)',
        	hotkey: 13,
            icon: 'glyphicon glyphicon-send',
            cssClass: 'ch-btn ch-btn-small',//'btn-primary',
            autospin: true,
            action: function(dialogRef){
					dialogRef.enableButtons(false)

					sendProductIdentifiers(function () {
												gtinContainerIdSequence = 0
												dialogRef.close()
												$('#item_button_'+item.id).focus()
											},
											function (sendButton) {
												return function () {
													dialogRef.enableButtons(true)
													sendButton.toggleSpin()
												}
											}(this))
        	}
        }, {
            label: i18n['cancel']+' (esc)',
            hotkey: 27,
            cssClass: 'ch-btn-skin ch-btn-small',
            action: function(dialogRef){
            	gtinContainerIdSequence = 0
                dialogRef.close();
                $('#item_button_'+item.id).focus()
            }
        }]
    });
}


function createTooltips () {
	new ch.Tooltip($('#piBrandHelp'), {content: i18n['brand.description'], align: 'top', side: 'right'})
	new ch.Tooltip($('#piMpnHelp'), {content: i18n['mpn.description'], align: 'top', side: 'right'})
	new ch.Tooltip($('#piGtinsHelp'), {content: i18n['gtins.description'], align: 'top', side: 'right'})
}

function renderTitle (item) {
	return '['+item.id+'] - '+item.title
}


function renderDialog (item) {
	var itemId = item.id
	var dialog = createDialog(item)

	cleanProductIdentifiersValues(dialog)

	loadProductIdentifiers(itemId, function (itemId, productIdentifiers) {
		setProductIdentifiersValues(itemId, productIdentifiers, dialog)
	})

	return dialog
}


function createDialog (item) {
	gtinContainerIdSequence = 0
	var hiddenItemId = $("<input>").attr('type', 'hidden').attr('id', 'piItemId')

	var brandDiv = $("<div>").attr("class", "ch-form-row")
//	brandDiv.append($("<label>").attr("for", "piBrand").html(i18n['brand']+':'))
	brandDiv.append($("<label>").attr("for", "piBrand").html(i18n['brand.description']+':'))
//	brandDiv.append($("<i>").attr('class', 'ch-form-icon ch-icon-question-sign').attr('id', 'piBrandHelp').attr('title', i18n['brand.description']))
	brandDiv.append($("<input>").attr('type', 'text').attr('class', 'ch-form-icon-input').attr('id', 'piBrand').attr('placeholder', i18n['brand']))

	var mpnDiv = $("<div>").attr("class", "ch-form-row")
//	mpnDiv.append($("<label>").attr("for", "piMpn").html(i18n['mpn']+':'))
	mpnDiv.append($("<label>").attr("for", "piMpn").html(i18n['mpn.description']+':'))
//	mpnDiv.append($("<i>").attr('class', 'ch-form-icon ch-icon-question-sign').attr('id', 'piMpnHelp').attr('title', i18n['mpn.description']))
	mpnDiv.append($("<input>").attr('type', 'text').attr('class', 'ch-form-icon-input').attr('id', 'piMpn').attr('placeholder', i18n['mpn']))

	var gtinsDiv = $("<div>").attr("class", "ch-form-row")
	
	var gtinValuesContainer = $("<div>").attr('id', 'gtinValuesContainer').attr("class", "piInputContainer inputContainer").attr('style', 'margin-bottom: 0px')

	gtinValuesContainer.append(createGtinContainer())

	//gtinsDiv.append($("<label>").attr('style', 'float:left;').attr("for", "piGtinCode_0").html(i18n['gtins']+':'))
	gtinsDiv.append($("<label>").attr('style', 'float:left;').attr("for", "piGtinCode_0").html(i18n['gtins.description']+':'))
//	gtinsDiv.append($("<i>").attr('style', 'float:left; padding-top:8px;').attr('class', 'ch-form-icon ch-icon-question-sign').attr('id', 'piGtinsHelp').attr('title', i18n['gtins.description']))
	
	gtinsDiv.append(gtinValuesContainer)

	var gtinsAddDiv = $("<div>").attr("class", "piFormElementContainer ch-form-row")
	var gtinAddContainer = $("<div>").attr("class", "piInputContainer inputContainer")
	var addGtin = $("<div>").attr("class", "gtinAdd").append( $('<span>').attr('style', 'float:left').attr('class', 'ch-icon-plus') ).append($('<p>').attr('style', 'float:left'))
					.click( function () {
								gtinValuesContainer.append(createGtinContainer())
								$('#piDialogElementsContainer').height("+=40")
							})
	gtinAddContainer.append(addGtin)
	gtinsAddDiv.append($("<label>").attr("class", "piLabel labelContainer").html("&nbsp;"))
	gtinsAddDiv.append(gtinAddContainer)

	var fieldSet = $("<fieldset>")
	fieldSet.append(hiddenItemId)
	fieldSet.append(brandDiv)
	fieldSet.append(mpnDiv)
	fieldSet.append(gtinsDiv)
	fieldSet.append(gtinsAddDiv)

	var dialogForm = $("<form>").attr('class', 'ch-form')
	dialogForm.append(fieldSet)

	var dialogDiv = $("<div>").attr("class", "piContainerElement inputContainer").append(dialogForm)
	dialogDiv.append(dialogForm)
	
	var container = $("<div>").attr('id', 'piDialogElementsContainer').attr("class", "piDialogElements ch-box-lite").attr("style", "height: 150px;")
	container.append(dialogDiv)

	return container
}


function closeProductIdentifiersDialog () {
	productIdentifiersDialog.hide()
//	productIdentifiersDialog.destroy()
	productIdentifiersDialog = null
}

var gtinContainerIdSequence = 0
function createGtinContainer () {
	var gtinContainerId = gtinContainerIdSequence++
	
	var gtinCode = $("<div>").attr("class", "gtinCode").append($("<input>").attr('type', 'text').attr('name', 'piGtinCode').attr('id', 'piGtinCode_'+gtinContainerId).attr('placeholder', i18n['gtins']))
	var gtinType = $("<div>").attr("class", "gtinType").append($("<select>").attr('class', 'ch-shownby-pointertap ch-dropdown-trigger ch-user-no-select ch-btn-skin ch-btn-small').attr('name', 'piGtinType').append('<option value="none">-</option>').append('<option value="UPC">UPC</option>').append('<option value="EAN">EAN</option>'))

	

	var gtinRemoveIcon = $('<span>').attr('class', 'ch-icon-remove').click( function (gtinContainerElementId) {
																							return function () {
																								if (0 == gtinContainerElementId) {
																									$('#gtin_container_0').find('[name=piGtinCode]').val(null)
																									$('#gtin_container_0').find('[name=piGtinType]').val('none')
																								}
																								else {
																									$('#gtin_container_'+gtinContainerElementId).remove()
																									$('#piDialogElementsContainer').height("-=40")
																								}
																							}
																						}(gtinContainerId) )

	var gtinRemove = $("<div>").attr("class", "gtinRemove").append( gtinRemoveIcon )


	return $("<div>").attr("class", "gtinContainer").attr('id', 'gtin_container_'+gtinContainerId).append(gtinCode).append(gtinType).append(gtinRemove)
}


function createNewGtinRow () {
	$('#piDialogElementsContainer').find('#gtinValuesContainer').append(createGtinContainer())
	$('#piDialogElementsContainer').height("+=40")
}


function updateItemsTable (itemId, hasProductIdentifiers) {
	var iconClass = hasProductIdentifiers ? 'ch-icon-ok' : 'ch-icon-remove'
	var iconColor = hasProductIdentifiers ? 'green' : 'red'
	$('#has_product_identifiers_'+itemId).attr('class', iconClass).attr('style', 'color: '+iconColor)

	$('#item_button_'+itemId).val(hasProductIdentifiers ? i18n['change'] : i18n['set'])
}


function setProductIdentifiersValues(itemId, productIdentifiers, domObject) {
	domObject.find('#piItemId').val(itemId)

	domObject.find('#piBrand').val(productIdentifiers.brand)
	domObject.find('#piMpn').val(productIdentifiers.mpn)

	if (productIdentifiers.gtins) {
		for (var idx = 0; idx < productIdentifiers.gtins.length; idx++) {
			var gtinCode = productIdentifiers.gtins[idx].code
			var gtinType = productIdentifiers.gtins[idx].type
			var domElement
			if (0 == idx) {
				domElement = $('#gtin_container_0')
			}
			else {
				domElement = createGtinContainer()
				domObject.find('#gtinValuesContainer').append(domElement)
				$('#piDialogElementsContainer').height("+=40")
			}
			domElement.find('[name=piGtinCode]').val(gtinCode)
			domElement.find('[name=piGtinType]').val(gtinType)
		}
	}
}


function cleanProductIdentifiersValues (domObject) {
	setProductIdentifiersValues(null, {brand:null, mpn:null, gtins:[]}, domObject)
}


function sendProductIdentifiers (successCallback, errorCallback) {
	var productIdentifiers = {}

	var itemId = $('#piItemId').val()
	var brand = $('#piBrand').val()

	var mpn = $('#piMpn').val()
	var gtinTypes = $('[name=piGtinType]')
	var gtinCodes = $('[name=piGtinCode]')

	if (brand) {
		productIdentifiers.brand = brand
	}
	if (mpn) {
		productIdentifiers.mpn = mpn
	}

	productIdentifiers.gtins = []

	if (gtinCodes) {
		var gtinCodes = $.map(gtinCodes, function (element) {return $(element).val()})
		var gtinTypes = $.map(gtinTypes, function (element) {return $(element).val()})

		for (var i = 0; i < gtinCodes.length; i++) {
			var gtinCode = gtinCodes[i]
			var gtinType = gtinTypes[i]
			if (gtinCode) {
				productIdentifiers.gtins.push( {type: gtinType == 'none' ? null : gtinType, code: gtinCode} )
			}
		}					
	}

	var productIdentifiersSetUrl = '/productIdentifiers/'+country+'/'+itemId


	ga('send', 'event', 'Product Identifiers', 'Send identifiers');
	
	var prodidsData = JSON.stringify(productIdentifiers)
	$.ajax({url:productIdentifiersSetUrl, type: 'PUT', contentType: 'application/json', dataType:'json', data: prodidsData, 
		success: function (data) {
			var productIdentifiers = data
			var hasProductIdentifiers = productIdentifiers.brand || productIdentifiers.mpn || productIdentifiers.gtins.length

			updateItemsTable(itemId, hasProductIdentifiers)
			
			ga('send', 'event', 'Product Identifiers', 'Response: OK');
			successCallback()
		},
		error: function (data) {
			var dataJson = data.responseJSON

			BootstrapDialog.show({title: 'Error', 
								   message: dataJson.cause.message, 
								   type: BootstrapDialog.TYPE_DANGER, 
								   buttons: [
										{
							                label: 'OK',
							                hotkey: 13,
							                action: function(dialogRef){
							                    dialogRef.close();
							                }
							            }
			]});

			ga('send', 'event', 'Product Identifiers', 'Response: Error', dataJson.cause.message);
			errorCallback()
		}
	})
}
