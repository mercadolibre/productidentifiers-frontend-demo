<!doctype html>
<!--[if IE 7]>	<html class="no-js  lt-ie10 lt-ie9 lt-ie8 ie7" lang="es"> <![endif]-->
<!--[if IE 8]>	<html class="no-js lt-ie10 lt-ie9 ie8" lang="es"> <![endif]-->
<!--[if IE 9]>	<html class="no-js lt-ie10 ie9" lang="es"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="es"> <!--<![endif]-->
<head>
	<meta charset="UTF-8">
	<title><g:message code="pi.app.title"/></title>
	<!-- Mobile viewport optimization http://goo.gl/b9SaQ -->
	<meta name="HandheldFriendly" content="True">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta http-equiv="cleartype" content="on">
	<!-- Stylesheet -->
    <link rel="stylesheet" href="css/chico-0.13.3.css">
	<link rel="stylesheet" href="css/mesh-2.1.css">
	<link rel="stylesheet" href="css/styles.css">
</head>
<body>
	<div id="wrapper" class="common">
		<div id="top-bar">
			<header class="common">
				<h1><g:message code="pi.app.header"/></h1>
			</header>
		</div>
		<section id="application" class="main-content">
			<div class="ch-g1-2">
				<article>

					<h2><g:message code="pi.home.title"/></h2>
					<p><g:message code="pi.home.description"/></p>
					<ul>
						<li class="argentina"><a id="AR" href="/manager/AR">Argentina</a></li>
						<li class="brasil"><a id="BR" href="/manager/BR">Brasil</a></li>
						<li class="colombia"><a id="CO" href="/manager/CO">Colombia</a></li>
					</ul>
					<ul>
						<li class="chile"><a id="CL" href="/manager/CL">Chile</a></li>
						<li class="ecuador"><a id="EC" href="/manager/EC">Ecuador</a></li>
						<li class="mexico"><a id="MX" href="/manager/MX">México</a></li>
					</ul>
					<ul>
						<li class="peru"><a id="PE" href="/manager/PE">Perú</a></li>
						<li class="uruguay"><a id="UY" href="/manager/UY">Uruguay</a></li>
						<li class="venezuela"><a id="VE" href="/manager/VE">Venezuela</a></li>
					</ul>
				</article>
			</div>
			<div class="ch-g1-2">
				<aside>
					<img src="images/ilustracionHome1.png">
				</aside>
			</div>
		</section>		
	</div>
	<footer>
			<div class="common">
				<g:message code="pi.footer.rights"/></br>
				(*) <g:message code="pi.footer.notes.revision"/>
			</div>
		</footer>
	<script src="js/jquery.js"></script>
	<script src="js/chico-min-0.13.3.js"></script>
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-52066568-1', 'ml-product-identifiers.herokuapp.com');
		ga('send', 'pageview');
	</script>
	
</body>
</html>