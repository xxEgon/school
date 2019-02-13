	<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8"/>
</head>
<body>
	14.02- PHP
	<br>
	
</body>
</html>
<?php
	/*
	for($i=1, $j=10;$i<11;$i++, $j--)
	{
		//$j= 11-$i;
		echo("$i $j <br>");
	}
	*/	
	$i=0;
	$s=0;
	while(($s+$i)<=100) {	
		$s+=$i;
		$i++;
	}
	echo("<br>Potrzeba $i liczb");
?>