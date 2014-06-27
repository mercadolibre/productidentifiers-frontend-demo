package com.mercadolibre

import org.springframework.beans.factory.annotation.Value

import groovyx.net.http.RESTClient

class UserService {
	static transactional = false

	@Value('${pi.ml.api.url}')
	def mlApiUrl
	
	def getUserData (accessToken) {
		def userData
		
		def userDataClient = new RESTClient(mlApiUrl)
		def resp = userDataClient.get(path: 	'/users/me',
									  query:	[access_token:	accessToken])

		
		if (200 == resp.status) {
			userData = resp.data
		}
		
		userData
	}

}
