<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8">
</head>
<body>
	25.04 - PHP <br><br>
</body>
</html>
<?php
	$conn=@mysqli_connect("localhost", "dfilipowski", "dfilipowski", "dfilipowski");
	if(!$conn) 
	{
		exit("Brak polaczenia z serwerem");
	}
	mysqli_query($conn, "UPDATE licznik SET licz=licz+1");

	$rs=mysqli_query($conn, "SELECT licz FROM licznik") or exit("Błąd w SQL");
		
	$rec=mysqli_fetch_array($rs);
	
	echo "Licznik odwiedzin: ".$rec[0];

?>
