	<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8"/>
</head>
<body>
	14.02- PHP
	<br>
	<form method="GET">
		Podaj pierwszą liczbę: <input type="text" name="liczba1"/>
        <br>
        <br>
        Podaj drugą liczbę: <input type="text" name="liczba2"/>
        <br>
        <br>
		Podaj działanie (+,-,*,/): <input type="text" name="op"/>
		<input type="submit" value="Oblicz"/>
	</form>
</body>
</html>
<?php
	//(warunek)?prawda:fałsz;
	if(isset($_GET['liczba1']) && isset($_GET['liczba2']) && isset($_GET['op']))
		{
			$a= $_GET['liczba1'];
			$b= $_GET['liczba2'];
			$op= $_GET['op'];
			if(is_numeric($a) && is_numeric($b))
				switch($op)
				{
					case "+":
						echo("$a$op$b= ".($a+$b));
						break;
					case "-":
						echo("$a$op$b= ".($a-$b));
						break;
					case "*":
						echo("$a$op$b= ".($a*$b));
						break;
					case "/":
						if($b==0)
							echo("Nie mozna dzielic przez 0");
						else 
							echo("$a$op$b= ".($a/$b));
						break;			
					default:
						echo("Niepoprawny operator");
				}
			else
				echo("Podaj prawidłowe liczby");
		}	
?>