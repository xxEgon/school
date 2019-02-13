<?php
	header('Content-Type: text/plain');
	
	include("hasla2.php"); //require
	
	try {

		$dbh = new PDO($dsn, $user, $password);		

	} catch (PDOException $e) {

		echo 'Connection failed: ' . $e->getMessage();
	}
	
	if(isset($_POST['f']) && $_POST['f']==1) {

		global $wynik;
		
		$wynik= "";

		function AddRandomNumberToString($w) {
			
			do {

				$liczba = (string)mt_rand(1,49);

			} while ( strstr( $w , $liczba) != false ) ;

			$w.= ($liczba.";") ;
			return $w;
		}
		
		for( $i=0 ; $i < 6 ; $i++ )
		{	
			$wynik = AddRandomNumberToString($wynik);			
		}
		
		$wynik = substr($wynik, 0, -1);
	
		$data= date("d-m-Y H:i:s");
		
		$sth = $dbh->prepare('insert into lotto(wynik,data) values(:wynik,:data)');
		$sth->bindValue(':wynik', $wynik, PDO::PARAM_STR);
		$sth->bindValue(':data', $data, PDO::PARAM_STR);
		$sth->execute();

		if(isset($_POST['f']) && $_POST['f']==1 && isset($_POST['s']) && $_POST['s']=="p") {


			$sth = $dbh->prepare('select * from lotto');
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);
			$arr=Array(
				"dane" => $result,
				"ok" => 1
			);
			echo json_encode($arr);

		}
		elseif(isset($_POST['s']) && $_POST['s']=="k") {
		
			$sth = $dbh->prepare('select * from lotto order by id desc limit 1');
			$sth->execute();
			$result = $sth->fetchAll(PDO::FETCH_ASSOC);
			$arr=Array(
				"dane" => $result,
				"ok" => 1
			);
			echo json_encode($arr);
			
		}
		
	}elseif(isset($_POST['f']) && $_POST['f']==2) {
		
		$sth = $dbh->prepare('delete from lotto WHERE lotto.id ='. $_POST['s']);
		$sth->execute();
		$result = $sth->fetchAll(PDO::FETCH_ASSOC);
		$arr=Array(
			"dane" => $result,
			"ok" => 1
		);
		echo json_encode($arr);
	}
	
?>
