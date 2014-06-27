package com.mercadolibre.productidentifiers

import grails.converters.JSON

class UserController {

	def getUser () {
		def country = params.country

		if (session[country] && session[country].user_data) {
			def user = session[country].user_data
			render user as JSON
		}
		else {
			render status: 400, text: 'Null user not found'
		}		
	}
	
}
