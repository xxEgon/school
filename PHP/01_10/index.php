<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8"/>
</head>
<body>
	tekst w HTML - żółw
	<br>
	<?php
		//phpinfo();
		//echo('PHP żółw <br>');
		//print('żółć <br>');
		//print("<img src=\"obrazek.jpg\" alt='elo' > <br>");
		
		define("PI", 3.14);
		$r= 3;
		$pole= PI*$r*$r;
		//echo('Pole koła o promieniu '.$r.' wynosi: '.PI*$r*$r);
		//jak jest cudzyslow to nie trzeba tych kropek itd. j.w.
		echo("Pole koła o promieniu $r wynosi: ".++$pole);
		echo "<br>".$r;
		
	?>
</body>
</html>