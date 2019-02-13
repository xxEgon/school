	<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8"/>
</head>
<body>
	28.02- PHP <br><br>
	<form method="GET">     
		<input type="submit" value="Losuj"/>
	</form>
</body>
</html>
<?php
	$suma=0;
	define("ILE",10);
	for($i=0;$i<ILE;$i++){
		$liczby[$i]= rand(1,100);
		$suma+=$liczby[$i];
		echo $liczby[$i]." ";
	}
	echo "<br>".$suma;
	echo "<br>".($suma/ILE);
	do{
		$zamiana= false;
	for($i=0;$i<ILE-1;$i++)
	{
		if($liczby[$i]>$liczby[$i+1])
		{
			/*$pom= $liczby[$i];
			$liczby[$i]=$liczby[$i+1];
			$liczby[$i+1]= $pom;*/
			$liczby[$i]=$liczby[$i]+$liczby[$i+1];
			$liczby[$i+1]=$liczby[$i]-$liczby[$i+1];
			$liczby[$i]=$liczby[$i]-$liczby[$i+1];
			$zamiana= true;
		}
	}
	}
	while($zamiana==true);
	echo "<br>";
	for($i=0;$i<ILE;$i++)
	{
		echo $liczby[$i]." ";
	}
?>