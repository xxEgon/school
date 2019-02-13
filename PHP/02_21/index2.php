	<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8"/>
</head>
<body>
	21.02- PHP <br><br>
	<form method="GET">
		Podaj bok a prostokąta: <input type="text" name="boka"/><br><br>
        Podaj bok b prostokąta: <input type="text" name="bokb"/><br><br>       
		<input type="submit" value="Oblicz"/>
	</form>
</body>
</html>
<?php
	function pole($a,$b)
	{
		return $a*$b;
	}
	if(isset($_GET['boka'], $_GET['bokb'])) 
	{
		$a= $_GET['boka'];
		$b= $_GET['bokb'];
		echo "Pole prostokąta o bokach $a i $b wynosi ".pole($a, $b);
	}
?>