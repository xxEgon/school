<html>
<head>
	<title>Moja strona w PHP</title>
	<meta charset="utf-8">
</head>
<body>
	16.05 - PHP <br><br>
	<form method="GET">   
		<input name="autor" type="text" />
		<input name="mail" type="text" />
		<br>
		<br>
		<textarea name="wpis" cols="40" rows="10" ></textarea>
		<input type="submit" value="Dodaj"/>
		<br>
		<br>
	</form>   

</body>
</html>
<?php

	$conn=@mysqli_connect("localhost", "dfilipowski", "dfilipowski", "dfilipowski");
	if(!$conn) 
	{
		exit("Brak polaczenia z serwerem");
	}

	if(isset($_GET['autor'], $_GET['mail'] , $_GET['wpis'])) 
	{
		$a= $_GET['autor'];
		$w= $_GET['wpis'];
		$m= $_GET['mail'];
		mysqli_query($conn, "INSERT INTO goscie(autor, wpis, mail, data) VALUES ('$a', '$w', '$m', CURDATE() )") or exit("Błąd w SQL");
	}

	$rs=mysqli_query($conn, "SELECT * FROM goscie") or exit("Błąd w SQL");
	
	$licz = 0;

	while($rec=mysqli_fetch_array($rs)) 
	{
		$licz++;
		echo 'Autor:'.$rec["autor"] . '<br>E-mail:'.$rec["mail"].'<br>Wpis: ' . $rec["wpis"]. '<br>Data: ' . $rec["data"]."<br><br><br>";
	}

	echo $licz;

?>
