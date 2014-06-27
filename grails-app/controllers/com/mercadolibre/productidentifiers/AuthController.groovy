package com.mercadolibre.productidentifiers

import grails.converters.JSON

class AuthController {

	def authService
	def userService
	
	def login () {
		def country = params.country
		if (!(session[country] && session[country].access_token)) {
			redirect mapping: 'authenticate', params: [country: country]
		}
		else {
			redirect mapping: 'pis', params: [country: country]
		}
	}
	
	def mlLogout () {
		render view: 'logout'
	}
	
	def logout () {
		def country = params.country
		session[country] = [:]
		mlLogout()
	}

	def auth () {
		redirect url: authService.getAuthUrl(params.country)
	}

	def authd () {
		def code = params.code
		
		def accessToken = authService.exchangeCodeForToken(code)
		
		if (accessToken) {
			def userData = userService.getUserData(accessToken)

			def country = userData.country_id			
			session[country] = [access_token: accessToken, user_data: userData]
			
			redirect mapping: 'pis', params:[country: userData.country_id]
		}
		else {
			//Restart process (we don't have 'country' param, so, let's restart the whole thing
			redirect mapping: 'flags'
		}
	}

	
}
