<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8">
</head>
<body>
	25.04 - PHP <br><br>
	<input id="autor" type="text" /input>
	<br>
	<br>
	<textarea id="wpis" cols="40" rows="10" > </textarea>
	<input type="submit" value="Dodaj"/>
	<br>
	<br>

</body>
</html>
<?php
	$conn=@mysqli_connect("localhost", "dfilipowski", "dfilipowski", "dfilipowski");
	if(!$conn) 
	{
		exit("Brak polaczenia z serwerem");
	}

	if(isset($_GET['autor'], $_GET['wpis'])) 
	{
		$a= $_GET['autor'];
		$w= $_GET['wpis'];
		mysqli_query($conn, "INSERT INTO goscie(autor, wpis, data) VALUES ('$a', '$w', CURDATE() )") or exit("Błąd w SQL");
	}

	$rs=mysqli_query($conn, "SELECT * FROM goscie") or exit("Błąd w SQL");
	
	while($rec=mysqli_fetch_array($rs)) 
	{
		echo 'Autor:'.$rec["autor"] . '<br>Wpis: ' . $rec["wpis"]. '<br>Data: ' . $rec["data"]."<br><br><br>";
	}

	//NIE DZIALA
	

?>
