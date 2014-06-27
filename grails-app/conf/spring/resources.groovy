import grails.util.Holders

import com.mercadolibre.CustomLocaleResolver

// Place your Spring DSL code here
beans = {
	
	def config = Holders.config
	
	mlApplicationCredentials (org.springframework.beans.factory.config.MapFactoryBean) {
		sourceMap = [
				  clientId:		config.pi.ml.credentials.clientId,
				  clientSecret:	config.pi.ml.credentials.clientSecret,
				  redirectUrl:	config.pi.ml.credentials.redirectUrl
				]
	}
	
	domainByCountry (org.springframework.beans.factory.config.MapFactoryBean) {
		sourceMap = [AR:'mercadolibre.com.ar',
					 BR:'mercadolivre.com.br',
					 CO:'mercadolibre.com.co',
					 CR:'mercadolibre.com.cr',
					 CL:'mercadolibre.cl',
					 DO:'mercadolibre.com.do',
					 EC:'mercadolibre.com.ec',
					 MX:'mercadolibre.com.mx',
					 PA:'mercadolibre.com.pa',
					 PE:'mercadolibre.com.pe',
					 PT:'mercadolibre.pt',
					 UY:'mercadolibre.com.uy',
					 VE:'mercadolibre.com.ve']
	}
	
	localeResolver(CustomLocaleResolver) {
		allowedLocales = ['es', 'pt']
		defaultLocaleBySite = [AR:'es',BR:'pt',CO:'es',CR:'es',CL:'es',DO:'es',EC:'es',MX:'es',PA:'es',PE:'es',PT:'pt',UY:'es',VE:'es']
		fallbackLocale = 'es'
	}

}
