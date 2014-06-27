<html>
<head>
<script>
var siteUrls = {AR:'http://mercadolibre.com.ar',
				BR:'http://www.mercadolivre.com.br',
				CO:'http://mercadolibre.com.co',
				CR:'http://mercadolibre.com.cr',
				CL:'http://mercadolibre.cl',
				DO:'http://mercadolibre.com.do',
				EC:'http://mercadolibre.com.ec',
				MX:'http://mercadolibre.com.mx',
				PA:'http://mercadolibre.com.pa',
				PE:'http://mercadolibre.com.pe',
				PT:'http://mercadolibre.pt',
				UY:'http://mercadolibre.com.uy',
				VE:'http://mercadolibre.com.ve'}

var pathArray = window.location.pathname.split( '/' );
var country = pathArray[pathArray.length-1]
var mlLogoutUrl = siteUrls[country] + '/jm/logout'
location.href = mlLogoutUrl
</script>



