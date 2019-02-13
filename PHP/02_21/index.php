	<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8"/>
</head>
<body>
	21.02- PHP <br><br>
	<form method="GET">
		Podaj imie: <input type="text" name="imie"/><br><br>
		Podaj nazwisko: <input type="text" name="nazwisko"/><br><br>
		Podaj PESEL: <input type="text" name="pesel"/><br><br>       
		<input type="submit" value="Oblicz"/>
	</form>
</body>
</html>
<?php
	if(isset($_GET['imie'], $_GET['nazwisko'])) 
	{
		$imie= trim($_GET['imie']);
		$nazw= trim($_GET['nazwisko']);
		echo "$imie $nazw : inicjały:  ".substr($imie,0,1).substr($nazw,0,1);
		echo "<br>";
		echo "$imie $nazw : inicjały:  ".$imie[0].$nazw[0];
		$dlg= strlen($imie);
		echo "<br>";
		$plec= 	($imie[$dlg-1]=="a" && $imie!="barnaba")?"kobieta":"mężczyzna";
		echo "Płeć: $plec";
		$pesel= trim($_GET['pesel']);
		echo "<br>";
		echo ($pesel[strlen($pesel)-2]%2==0)?"kobieta":"mężczyzna";
	}
?>