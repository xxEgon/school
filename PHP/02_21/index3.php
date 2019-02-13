	<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8"/>
</head>
<body>
	21.02- PHP <br><br>
	<form method="GET">
		Podaj liczbę: <input type="text" name="n"/><br><br>       
		<input type="submit" value="Oblicz"/>
	</form>
</body>
</html>
<?php
	function silnia($n)
	{
		if($n<1)
		{
			if($n>=0)
				return 1;
			else 
				return "Error";
		}
		else
		{
			return silnia($n-1)*$n;
		}
		
	}
	if(isset($_GET['n'])) 
	{
		$n= $_GET['n'];
		echo "$n! =  ".silnia($n);
	}
?>