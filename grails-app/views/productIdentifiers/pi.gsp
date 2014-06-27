<!doctype html>
<!--[if IE 7]>    <html class="no-js lt-ie10 lt-ie9 lt-ie8 ie7" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie10 lt-ie9 ie8" lang="en"> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10 ie9" lang="en"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<html lang="en">
	<head>
	    <!-- Avoid script blocking -->
    	<script></script>
    	<meta charset="utf-8">
    	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    	
		<title><g:message code="pi.app.title"/></title>

		<link rel="shortcut icon" href="//www.mercadolibre.com/org-img/chico/img/favicon.ico?new" type="image/vnd.microsoft.icon" />

		<link href="/css/bootstrap.custom.css" type="text/css" rel="stylesheet"/>
		<link href="/css/bootstrap-dialog.min.css" type="text/css" rel="stylesheet"/>

    <link rel="stylesheet" type="text/css" href="/css/chico-0.13.3.css">
	<link rel="stylesheet" type="text/css" href="/css/mesh-2.1.css">
	<link rel="stylesheet" type="text/css" href="/css/styles.css">
		
		<link href="/css/prodids.css" type="text/css" rel="stylesheet"/>
	</head>
	<body class='modal-open'>
		<div id='blocker'></div>
		<div id='wrapper' class='common'>
			<div id="top-bar">
				<div>
			        <header class="common">
						<h1><g:message code="pi.app.header"/></h1>
						<p class="user">
							<span id='username'></span> - <a href='#' onclick='doLogout()'><g:message code="pi.app.logout"/></a>
						</p>
					</header>
			    </div>
			</div>

<section id="application" class="main-content">
	<div class="ch-g1">
		<article class="table">	
				<div class='body'>
					<div class='top'>
					</div>
					<div class='col-md-1'></div>
					<div class='content col-md-10'>
						<div id='items'>
							<table class="table table-bordered table-striped table-hover categoryTable ch-datagrid">
							<thead>
								<tr>
									<th><g:message code="pi.items.table.header.id"/></th>
					                <th><g:message code="pi.items.table.header.title"/></th>
					                <th><g:message code="pi.items.table.header.category"/></th>
					                <th><g:message code="pi.items.table.header.hasIdentifiers"/></th>
					                <th><g:message code="pi.items.table.header.actions"/></th>
					            </tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						</div>
						<div id='noItems' style='text-align: center;'>
							<h2><g:message code="pi.items.noActiveItems"/></h2>
						</div>
					</div>
					<div class='col-md-1'></div>
					<div class='bottom'>
					</div>
				</div>
</article>
			</div>
</section>
		</div>
	<footer>
			<div class="common">
				2014 Todos los derechos reservados
				<!--div class="logo-footer"><span></span></div>
				<div class="copyright"><span>Copyright &copy 1999-2013 MercadoLibre S.R.L</span></div-->
			</div>
		</footer>



		<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
		<script src="/js/chico-min-0.13.3.js"></script>
		<script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
		<script src="/js/bootstrap-dialog.min.js"></script>
		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
		
		  ga('create', 'UA-52066568-1', 'ml-product-identifiers.herokuapp.com');
		  ga('send', 'pageview');
		</script>
		<script src="/js/prodids.js"></script>
		<script>
			country = '${country}'

			function i18nLoad(i18n) {
				i18n['brand'] = '<g:message code="pi.productIdentifiers.brand"/>'
				i18n['brand.description'] = '<g:message code="pi.productIdentifiers.brand.description"/>'
				i18n['mpn'] = '<g:message code="pi.productIdentifiers.mpn"/>'
				i18n['mpn.description'] = '<g:message code="pi.productIdentifiers.mpn.description"/>'
				i18n['gtins'] = '<g:message code="pi.productIdentifiers.gtins"/>'
				i18n['gtins.description'] = '<g:message code="pi.productIdentifiers.gtins.description"/>'
				i18n['send'] = '<g:message code="pi.productIdentifiers.send"/>'
				i18n['cancel'] = '<g:message code="pi.productIdentifiers.cancel"/>'
				i18n['set'] = '<g:message code="pi.items.table.actions.set"/>'
				i18n['change'] = '<g:message code="pi.items.table.actions.change"/>'

				i18n['items.retrieving'] = '<g:message code="pi.items.retrieving"/>'
			}
		</script>
	</body>
</html>
