package com.mercadolibre.productidentifiers

import org.springframework.beans.factory.annotation.Value
import groovyx.net.http.RESTClient
import com.mercadolibre.exception.ProductIdentifiersSetException
import groovyx.net.http.HttpResponseException
import static groovyx.net.http.ContentType.JSON

class ProductIdentifiersService {
	static transactional = false

	@Value('${pi.ml.api.url}')
	def mlApiUrl
	
	def getProductIdentifiers (itemId) {
		def productIdentifiers
		
		def productIdentifiersDataClient = new RESTClient(mlApiUrl)
		def resp = productIdentifiersDataClient.get(path: "/items/${itemId}/product_identifiers")

		if (200 == resp.status) {
			productIdentifiers = resp.data
		}
		else {
			//TODO ...
		}
		
		productIdentifiers
	}
	
	def setProductIdentifiers (itemId, proposedProductIdentifiers, accessToken) {
		def acceptedProductIdentifiers

		def productIdentifiers = [:]
		
		if (proposedProductIdentifiers.brand) {
			productIdentifiers.brand = proposedProductIdentifiers.brand
		}
		if (proposedProductIdentifiers.mpn) {
			productIdentifiers.mpn = proposedProductIdentifiers.mpn
		}
		if (proposedProductIdentifiers.gtins) {
			productIdentifiers.gtins = proposedProductIdentifiers.gtins
		}

		try {
			def productIdentifiersDataClient = new RESTClient(mlApiUrl)
			def resp = productIdentifiersDataClient.put(path: 				"/items/${itemId}/product_identifiers",
														query: 				[access_token:	accessToken],
														body:				productIdentifiers,
														requestContentType: JSON)
			if (200 == resp.status) {
				acceptedProductIdentifiers = resp.data
			}
			else {
				throw new ProductIdentifiersSetException(status: resp.status, description: resp.text)
			}

			acceptedProductIdentifiers
		} catch (HttpResponseException hre) {
			throw new ProductIdentifiersSetException(status: hre.response.status, description: hre.response.data)
		}
	}

}
