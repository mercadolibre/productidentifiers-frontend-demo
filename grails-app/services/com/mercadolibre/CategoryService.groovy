package com.mercadolibre

import org.springframework.beans.factory.annotation.Value

import groovyx.net.http.RESTClient

class CategoryService {
	static transactional = false

	@Value('${pi.ml.api.url}')
	def mlApiUrl

	
	def getCategory (categoryId) {
		def category
		
		def categoryDataClient = new RESTClient(mlApiUrl)
		def resp = categoryDataClient.get(path: "/categories/${categoryId}")

		if (200 == resp.status) {
			category = resp.data
		}
		else {
			//TODO ...
		}
		
		category
	}
		
	def getCategoryBreadcrumb (categoryId) {
		getCategory(categoryId).path_from_root.collect { pathElement ->
			pathElement.name
		}.join(' > ')
	}

}
