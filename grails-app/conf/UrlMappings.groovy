class UrlMappings {

	static mappings = {
		name flags: "/" (controller: 'site', action: 'flags')
		
		name pis: "/manager/$country" (controller: 'productIdentifiers', action: 'show')
		
		name login: "/login/$country" (controller: 'auth', action: 'login')
		name logout: "/logout/$country" (controller: 'auth', action: 'logout')
		name authenticate: "/auth/$country" (controller: 'auth', action: 'auth')
		name authenticatedCallback: "/authd" (controller: 'auth', action: 'authd')
		
		name userData: "/userData/$country" (controller: 'user', action: 'getUser')
		name items: "/items/$country" (controller: 'item', action: 'getItems')
		
		name productIdentifiers: "/productIdentifiers/$country/$itemId" (controller: "productIdentifiers", parseRequest: true) {
			action = [GET: "get", PUT: "set"]
		}
		
		"500"(view:'/error')
	}
}
