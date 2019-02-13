<?php
	header('Content-Type: text/plain');

	include("hasla.php"); 

	try {
		$dbh = new PDO($dsn, $user, $password);	
		//$dbh = new PDO($dsn, $user);		
	} catch (PDOException $e) {
		echo 'Connection failed: ' . $e->getMessage();
	}

	if(isset($_POST['a']) ) {		
		
		$a = $_POST['a'];

		switch($a) 
		{
			case -3:
				$b = $_POST['b'];

				$sth = $dbh->prepare('update ox set user = :user');
				$sth->bindValue(':user', $b, PDO::PARAM_STR);
				$sth->execute();
				$result = $sth->fetchAll(PDO::FETCH_ASSOC);

				$sth = $dbh->prepare('update ox set updated = :updated');
				$sth->bindValue(':updated', "-1", PDO::PARAM_STR);
				$sth->execute();

				$sth = $dbh->prepare('update ox set end = :end');
				$sth->bindValue(':end', "false", PDO::PARAM_STR);
				$sth->execute();

				$res=Array(
					"ok" => 1,
					"action" => "userUpdated",
				);

				echo json_encode($res);
				break;
			case -2:

				$sth = $dbh->prepare("select user from ox ");
				$sth->execute();
				$result = $sth->fetchAll(PDO::FETCH_ASSOC);

				$result = $result[0]['user'];

				if($result != "x" && $result != "o")
				{
					$res=Array(
						"ok" => 1,
						"action" => "notChoosed",
					);
				}
				else 
				{

					if($result == "x")
						$u = "o";
					else 
						$u = "x";

					$res=Array(
						"ok" => 1,
						"action" => "Choosed",
						"user" => $u,
					);

				}				

				echo json_encode($res);
				break;
			case -1:
				$sth = $dbh->prepare("select updated from ox ");
				$sth->execute();
				$result = $sth->fetchAll(PDO::FETCH_ASSOC);
				$result = $result[0]['updated'];

				if($result == "-1" )
				{
					$res=Array(
						"ok" => 1,
						"action" => "notUpdated",
					);
				}
				else 
				{					
					$res=Array(
						"ok" => 1,
						"action" => "Updated",
						"index" => $result,
					);
					$sth = $dbh->prepare('update ox set updated = :updated');
					$sth->bindValue(':updated', "-1", PDO::PARAM_STR);
					$sth->execute();
				}				

				echo json_encode($res);
				break;
			case 1:
				$b = $_POST['b'];

				$sth = $dbh->prepare('update ox set updated = :updated');
				$sth->bindValue(':updated', $b, PDO::PARAM_STR);
				$sth->execute();

				$res=Array(
					"ok" => 1,
					"action" => "updateSuccess",
				);

				echo json_encode($res);
				break;
			case 2:
				
				$sth = $dbh->prepare("select end from ox ");
				$sth->execute();
				$result = $sth->fetchAll(PDO::FETCH_ASSOC);
				$result = $result[0]['end'];

				
				if($result == "true") {
					$res=Array(
						"ok" => 1,
						"action" => "End",
					);
				}
				else {
					if($result == "draw") {
						$res=Array(
							"ok" => 1,
							"action" => "Draw",
						);
					}
					else {
						$res=Array(
							"ok" => 1,
							"action" => "notEnd",
						);
					}
				}
				echo json_encode($res);
				break;
			case 3:
				$b = $_POST['b'];

				if($b=="win") {
					$sth = $dbh->prepare('update ox set end = :end');
					$sth->bindValue(':end', "true", PDO::PARAM_STR);
					$sth->execute();

					$res=Array(
						"ok" => 1,
						"action" => "I_won",
					);
				}
				else {
					$sth = $dbh->prepare('update ox set end = :end');
					$sth->bindValue(':end', "draw", PDO::PARAM_STR);
					$sth->execute();

					$res=Array(
						"ok" => 1,
						"action" => "Draw",
					);
				}
				echo json_encode($res);
				break;
		}
	}
	
?>
