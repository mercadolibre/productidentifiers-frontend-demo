grails.servlet.version = "2.5" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.target.level = 1.7
grails.project.source.level = 1.7

grails.project.dependency.resolution = {
    // inherit Grails' default dependencies
    inherits("global") {
    }
    log "error" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
    checksums true // Whether to verify checksums on resolve
    legacyResolve false // whether to do a secondary resolve on plugin installation, not advised and here for backwards compatibility

    repositories {
        inherits true // Whether to inherit repository definitions from plugins

        grailsPlugins()
        grailsHome()
        grailsCentral()

        mavenLocal()
        mavenCentral()
    }

    dependencies {
		//Heroku
        runtime 'postgresql:postgresql:9.1-901-1.jdbc4'
		
		compile('org.codehaus.groovy.modules.http-builder:http-builder:0.7.1')
		compile('org.codehaus.gpars:gpars:1.2.1')
    }

    plugins {
		//Heroku
		compile ':heroku:1.0.1'
		compile ':cloud-support:1.0.8'
		runtime ':hibernate:3.6.10.10'
		runtime ":database-migration:1.3.2"
		compile ':cache:1.0.1'
        runtime ":jquery:1.8.3"
        runtime ":resources:1.2"

		//build ":tomcat:7.0.52.1"		
		build ':jetty:3.0.0'
    }
}
