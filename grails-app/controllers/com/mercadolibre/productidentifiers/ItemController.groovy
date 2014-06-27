package com.mercadolibre.productidentifiers

import grails.converters.JSON

class ItemController {

	def itemService
	
	
	def getItems () {
		def country = params.country

		if (session[country] && session[country].user_data) {
			def userId = session[country].user_data.id
			def accessToken = session[country].access_token
	
			def items = itemService.getItems(userId, accessToken)
			render items as JSON
		}
		else {
			render status: 400, text: 'Items not found for null user'
		}
	}
}
