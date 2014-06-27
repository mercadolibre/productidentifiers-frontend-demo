package com.mercadolibre.productidentifiers

import grails.converters.JSON

import com.mercadolibre.exception.ProductIdentifiersSetException

class ProductIdentifiersController {
	
	def productIdentifiersService

	def show () {
		def country = params.country
		if (!(session[country] && session[country].access_token)) {
			redirect mapping: 'login', params: [country: country]
		}
		else {
			render view: 'pi', contentType: 'text/html', model: [country: params.country]
		}
	}
	
	def get () {
		def itemId = params.itemId
		render productIdentifiersService.getProductIdentifiers(itemId) as JSON
	}
	
	def set () {
		def responseObject
		
		def country = params.country

		if (session[country] && session[country].access_token) {
			def itemId = params.itemId
			def proposedProductIdentifiers = request.JSON
			def accessToken = session[country].access_token

			try {
				responseObject = productIdentifiersService.setProductIdentifiers(itemId, proposedProductIdentifiers, accessToken)
			} catch (ProductIdentifiersSetException pise) {
				response.status = pise.status
				responseObject = [status: pise.status, cause: pise.description]
			}
		}

		render responseObject as JSON
	}
	
}
