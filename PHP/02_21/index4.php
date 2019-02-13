	<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8"/>
</head>
<body>
	21.02- PHP <br><br>
	<form method="GET">
		Podaj ilosc krokow: <input type="text" name="n"/><br><br>       
		<input type="submit" value="Oblicz"/>
	</form>
</body>
</html>
<?php
	function fibo($n)
	{
		if($n<3)
			return 1;
		else {
			return fibo($n-1)+fibo($n-2);
		}
	}
	if(isset($_GET['n'])) 
	{
		$n= $_GET['n'];
		echo "Krok $n ciągu fibonacciego wynosi ".fibo($n);
	}
?>