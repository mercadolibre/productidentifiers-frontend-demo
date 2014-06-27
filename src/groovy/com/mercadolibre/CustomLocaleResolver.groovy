package com.mercadolibre

import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.springframework.web.servlet.i18n.SessionLocaleResolver

class CustomLocaleResolver extends SessionLocaleResolver{

	def localeCache = [:]
	
	def allowedLocales
	def defaultLocaleBySite
	def fallbackLocale
	
	@Override
	public Locale resolveLocale(HttpServletRequest req) {
		def locale = super.resolveLocale(req)

		def localeLanguage = locale.getLanguage()
		
		if (!allowedLocales.contains(localeLanguage)) {
			def country = getCountry(req.forwardURI)
			
			if (country && defaultLocaleBySite[country]) {
				localeLanguage = defaultLocaleBySite[country]
			}
			else {
				localeLanguage = fallbackLocale
			}

			locale = getLocaleFromCache(localeLanguage)
		}
		
		locale
	}
	
	def getLocaleFromCache (localeLanguage) {
		if (!localeCache[localeLanguage]) {
			localeCache[localeLanguage] = new Locale(localeLanguage)
		}
		localeCache[localeLanguage]
	}

	def getCountry (uri) {
		def match = uri =~ /\/manager\/(.*)/
		match ? match[0][1] : null
	}
}
