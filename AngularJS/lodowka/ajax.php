<?php
	header('Content-Type: text/plain');
	include("hasla.php"); 

	try {
		//$dbh = new PDO($dsn, $user, $password);		
		$dbh = new PDO($dsn, $user, $password, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES UTF8')); 		
	} catch (PDOException $e) {
		echo 'Connection failed: ' . $e->getMessage();
	}

	if(isset($_GET['action']) ) {		
		switch($_GET['action']) 
		{
			case "go":
				$data = $_GET['data'];

				$sth = $dbh->prepare('SELECT name FROM lodowka_liczniki WHERE name = :name');
				$sth->bindValue(':name', $data, PDO::PARAM_STR);
				$sth->execute();
				$result = $sth->fetchAll(PDO::FETCH_ASSOC);

				if(! $result)
				{
					$sth = $dbh->prepare('INSERT INTO lodowka_liczniki (name, counter1, counter2) VALUES (:name, 0, 0)');
					$sth->bindValue(':name', $data, PDO::PARAM_STR);
				 	$sth->execute();
				}

				$sth = $dbh->prepare('SELECT counter1, counter2 FROM lodowka_liczniki WHERE name = :name');
				$sth->bindValue(':name', $data, PDO::PARAM_STR);
				$sth->execute();
				$result = $sth->fetchAll(PDO::FETCH_ASSOC);

				$sth = $dbh->prepare('SELECT * FROM lodowka WHERE name = :name');
				$sth->bindValue(':name', $data, PDO::PARAM_STR);
				$sth->execute();
				$result2 = $sth->fetchAll(PDO::FETCH_ASSOC);

				$res=Array(
					"ok" => 1,
					"counter1" => $result[0]['counter1'],
					"counter2" => $result[0]['counter2'],
					"magnets" => $result2
				);	

				echo json_encode($res);
				break;
			case "add":
				$name = $_GET['name'];
				$height = $_GET['height'];
				$width = $_GET['width'];
				$top = $_GET['top'];
				$left = $_GET['left'];
				$zindex = $_GET['zindex'];
				$tekst = $_GET['tekst'];	

				$sth = $dbh->prepare('INSERT INTO lodowka (`name`, `height`, `width`, `top`, `left`, `zindex`, `tekst`) VALUES (:name, :height, :width, :top, :left, :zindex, :tekst)');
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->bindValue(':height', $height, PDO::PARAM_STR);
				$sth->bindValue(':width', $width, PDO::PARAM_STR);
				$sth->bindValue(':top', $top, PDO::PARAM_STR);
				$sth->bindValue(':left', $left, PDO::PARAM_STR);
				$sth->bindValue(':zindex', $zindex, PDO::PARAM_INT);
				$sth->bindValue(':tekst', $tekst, PDO::PARAM_STR);
				$sth->execute();	

				$sth = $dbh->prepare('SELECT id FROM lodowka WHERE name = :name ORDER BY id DESC LIMIT 1');
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->execute();
				$id = $sth->fetchAll(PDO::FETCH_ASSOC);

				$sth = $dbh->prepare('SELECT counter1, counter2 FROM lodowka_liczniki WHERE name = :name');
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->execute();
				$result = $sth->fetchAll(PDO::FETCH_ASSOC);
			
				$sth = $dbh->prepare('UPDATE lodowka_liczniki SET counter1 = :counter1, counter2 = :counter2 WHERE name = :name');
				$sth->bindValue(':counter1', ++$result[0]['counter1'], PDO::PARAM_STR);
				$sth->bindValue(':counter2', ++$result[0]['counter2'], PDO::PARAM_STR);
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->execute();

				$res=Array(
					"ok" => 1,
					"id" => $id[0]['id']
				);

				echo json_encode($res);
				break;
			case "remove":
				$name = $_GET['name'];
				$id = $_GET['id'];

				$sth = $dbh->prepare('SELECT counter1 FROM lodowka_liczniki WHERE name = :name');
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->execute();
				$result = $sth->fetchAll(PDO::FETCH_ASSOC);
			
				$sth = $dbh->prepare('UPDATE lodowka_liczniki SET counter1 = :counter1 WHERE name = :name');
				$sth->bindValue(':counter1', --$result[0]['counter1'], PDO::PARAM_STR);
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->execute();

				$sth = $dbh->prepare('DELETE FROM lodowka WHERE id = :id');
				$sth->bindValue(':id', $id, PDO::PARAM_STR);
				$sth->execute();

				$res=Array(
						"ok" => 1,
						"action" => "deleted $id",
				);

				echo json_encode($res);
				break;
            case "setIndex":
                $name = $_GET['name'];
				$id = $_GET['id'];
				$zindex = $_GET['zindex'];
                
                $sth = $dbh->prepare('SELECT id, zindex FROM lodowka WHERE name = :name');
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->execute();
                $result = $sth->fetchAll(PDO::FETCH_ASSOC);
                
                for($i=0;$i< count($result); $i++)
                {
                    if(intval($result[$i]['zindex']) > intval($zindex))
                    {
                        $sth = $dbh->prepare('UPDATE lodowka SET zindex = :zindex WHERE name = :name AND id = :id');
				        $sth->bindValue(':name', $name, PDO::PARAM_STR);
				        $sth->bindValue(':id', $result[$i]['id'], PDO::PARAM_STR);
				        $sth->bindValue(':zindex', --$result[$i]['zindex'], PDO::PARAM_INT);
				        $sth->execute();
                        
                        
                        $licz++;
// $res=Array( // "ok" => 1, // "action" => "updated index id:".$result[$i]['id']."zindex:".$result[$i]['zindex'], // );

				        //echo json_encode($res);
                    }
                    //$licz++;
                }

				$res=Array(
						"ok" => 1,
						"action" => "updated index id:$id"
				);

				echo json_encode($res);
                break;
			case "updateIndex":
				$name = $_GET['name'];
				$id = $_GET['id'];
				$zindex = $_GET['zindex'];
                
                $sth = $dbh->prepare('SELECT id, zindex FROM lodowka WHERE name = :name');
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->execute();
                $result = $sth->fetchAll(PDO::FETCH_ASSOC);
                
                $licz = 0;
                $max = 0;
                for($i=0;$i< count($result); $i++)
                {
                    if(intval($result[$i]['zindex']) > $max)
                        $max = intval($result[$i]['zindex']);
                    if(intval($result[$i]['zindex']) > intval($zindex))
                    {
                        $sth = $dbh->prepare('UPDATE lodowka SET zindex = :zindex WHERE name = :name AND id = :id');
				        $sth->bindValue(':name', $name, PDO::PARAM_STR);
				        $sth->bindValue(':id', $result[$i]['id'], PDO::PARAM_STR);
				        $sth->bindValue(':zindex', --$result[$i]['zindex'], PDO::PARAM_INT);
				        $sth->execute();
                        
                        
                        $licz++;
// $res=Array( // "ok" => 1, // "action" => "updated index id:".$result[$i]['id']."zindex:".$result[$i]['zindex'], // );

				        //echo json_encode($res);
                    }
                    //$licz++;
                }
			
				$sth = $dbh->prepare('UPDATE lodowka SET zindex = :zindex WHERE name = :name AND id = :id');
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->bindValue(':id', $id, PDO::PARAM_STR);
				$sth->bindValue(':zindex', $max, PDO::PARAM_INT);
				$sth->execute();

				$res=Array(
						"ok" => 1,
						"action" => "updated index id:$id , licz:$licz, elo:".$result[0]['zindex'],
				);

				echo json_encode($res);
				break;
			case "updatePosition":
				$name = $_GET['name'];
				$id = $_GET['id'];
				$top = $_GET['top'];
				$left = $_GET['left'];
			
				$sth = $dbh->prepare('UPDATE lodowka SET `top` = :top, `left` = :left WHERE name = :name AND id = :id');
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->bindValue(':id', $id, PDO::PARAM_STR);
				$sth->bindValue(':top', $top, PDO::PARAM_STR);
				$sth->bindValue(':left', $left, PDO::PARAM_STR);
				$sth->execute();

				$res=Array(
						"ok" => 1,
						"action" => "updated position id:$id",
				);

				echo json_encode($res);
				break;
			case "updateSize":
				$name = $_GET['name'];
				$id = $_GET['id'];
				$height = $_GET['height'];
				$width = $_GET['width'];
			
				$sth = $dbh->prepare('UPDATE lodowka SET `height` = :height, `width` = :width WHERE name = :name AND id = :id');
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->bindValue(':id', $id, PDO::PARAM_STR);
				$sth->bindValue(':height', $height, PDO::PARAM_STR);
				$sth->bindValue(':width', $width, PDO::PARAM_STR);
				$sth->execute();

				$res=Array(
						"ok" => 1,
						"action" => "updated size id:$id",
				);

				echo json_encode($res);
				break;
			case "updateTekst":
				$name = $_GET['name'];
				$id = $_GET['id'];
				$tekst = $_GET['tekst'];
			
				$sth = $dbh->prepare('UPDATE lodowka SET `tekst` = :tekst WHERE name = :name AND id = :id');
				$sth->bindValue(':name', $name, PDO::PARAM_STR);
				$sth->bindValue(':id', $id, PDO::PARAM_STR);
				$sth->bindValue(':tekst', $tekst, PDO::PARAM_STR);
				$sth->execute();

				$res=Array(
						"ok" => 1,
						"action" => "updated tekst id:$id",
				);

				echo json_encode($res);
				break;
		}
	}
	
?>