package com.mercadolibre

import org.springframework.beans.factory.annotation.Value

import groovyx.net.http.RESTClient
import groovyx.net.http.HttpResponseException


class AuthService {
	static transactional = false
	
	def mlApplicationCredentials
	
	def domainByCountry
	
	@Value('${pi.ml.api.url}')
	def mlApiUrl


	def getAuthUrl (country) {
		"http://auth.${domainByCountry[country]}/authorization?response_type=code&client_id=${mlApplicationCredentials.clientId}"
	}
	
	
	def exchangeCodeForToken (code) {
		def accessToken

		def tokenClient = new RESTClient(mlApiUrl)
		
		try {
			def resp = tokenClient.post(path:	'/oauth/token',
									    query:	[grant_type:	'authorization_code',
										   		 client_id:		mlApplicationCredentials.clientId,
												 client_secret:	mlApplicationCredentials.clientSecret,
												 code:			code,
												 redirect_uri:	mlApplicationCredentials.redirectUrl 
									   			])
	
			
	   		if (200 == resp.status) {
				   accessToken = resp.data.access_token
			}
		} catch (HttpResponseException hre) {
			//Do nothing, just return the null accessToken and let the right guy handle this
		} catch (Exception e) {
			//Same treatment here, but we're keeping it separated since we may want to do something
			//We've been getting some SocketException and errors of the sort in Heroku, hence this
		}
		
		accessToken
	}

}
