package com.mercadolibre

//import groovyx.net.http.RESTClient
import org.springframework.beans.factory.annotation.Value

import com.sun.tools.internal.ws.processor.model.Response;

import groovyx.net.http.RESTClient
import static com.mercadolibre.util.Looper.*

import groovyx.gpars.GParsPool

class ItemService {
	static transactional = false
	
	def productIdentifiersService
	def categoryService
	
	@Value('${pi.ml.api.url}')
	def mlApiUrl

	def getItems (userId, accessToken) {
		def itemsData = []

		def totalItems = 0
		def retrievedItems = 0
		
		loop {
			def itemsDataClient = new RESTClient(mlApiUrl)
			def resp = itemsDataClient.get(path: 	"/users/${userId}/items/search",
										   query:	[status:		'active',
													 order:			'start_time_desc',
													 access_token:	accessToken,
													 offset:		retrievedItems
													]
											)
			
			
			
			
			if (200 == resp.status) {
				def itemIds = resp.data.results

				totalItems = resp.data.paging.total
				retrievedItems += itemIds.size()

				if (itemIds) {
					//itemsData.addAll( itemIds.collect { itemId -> getItem(itemId) } )
					
					def items
					GParsPool.withPool (10) {
						items = itemIds.collectParallel { itemId -> getItem(itemId) }
					}
					itemsData.addAll(items)
				}
			}
			else {
				//TODO ...
			}
		} until {retrievedItems == totalItems}

		itemsData
	}
	
	
	def getItem (itemId) {
		def item
		
		def itemsDataClient = new RESTClient(mlApiUrl)
		def resp = itemsDataClient.get(path: "/items/${itemId}")

		if (200 == resp.status) {
			item = resp.data
			item.product_identifiers = productIdentifiersService.getProductIdentifiers(itemId)
			item.category_breadcrumb = categoryService.getCategoryBreadcrumb(item.category_id)
		}
		else {
			//TODO ...
		}
		
		item
	}

}
