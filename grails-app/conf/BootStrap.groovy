import grails.converters.JSON
import net.sf.json.JSONNull

class BootStrap {

    def init = { servletContext ->
		configureJsonNullSanitization()
    }
    def destroy = {
    }
	
	
	def configureJsonNullSanitization () {
		grails.converters.JSON.registerObjectMarshaller(JSONNull, { return "" })
	}
}
