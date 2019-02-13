	<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8"/>
</head>
<body>
	21.02- PHP <br><br>
	<form method="GET">
		Podaj tekst do zaszyfrowania: <input type="text" name="txt"/><br><br>     
		<input type="submit" value="Szyfruj"/>
	</form>
</body>
</html>
<?php
if(isset($_GET['txt'])) 
{
	$txt= $_GET['txt'];
	$dlg= strlen($txt);
	$szyfrowane=[];
	for($i=0;$i<$dlg;$i++)
	{
		$szyfrowane[$i]= chr(ord($txt[$i])+2);
		echo $szyfrowane[$i];
	}
	echo "<br><br>";
	for($i=0;$i<$dlg;$i++)
	{
		echo chr(ord($szyfrowane[$i])-2);
	}
}
	/*if(isset($_GET['imie'], $_GET['nazwisko'])) 
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
	}*/
?>