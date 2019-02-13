<?php
if (isset($_POST['login']) && isset($_POST['pass'])){
  $conn=@mysqli_connect("localhost", "cos", "cos", "cos");
  $login=htmlentities($_POST['login']);
  $haslo=htmlentities($_POST['pass']);
  $rs=mysqli_query($conn,"SELECT Count(id) FROM loginy WHERE login='$login'
   AND pass=sha1('$haslo')");
	$rec=mysqli_fetch_array($rs);
  if ($rec[0]>0){
    session_start();
	  $_SESSION['login']=$_POST['login'];
    header("Location: glowna.php?" . SID);
    exit();
  } else
    $error = "<b>Błędny login lub hasło!</b><br>";
} else
  $error = false;
?>
  <html>

  <head>
    <title>SuperFakty - zaloguj</title>
    <meta charset="utf-8" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>

  <body>
    <?php
    echo '<div class="mainDiv">
    <div class="errorDiv">'.($error ? $error : "").'</div>
    <div class="headerDiv">
    <div class="title">
      SuperFakty
    </div>
     <form method="POST">
       <div class="logDiv">
        <div>
          Login:
          <input class="inp" type="text" name="login">
        </div>
        <div>
          Hasło:
          <input class="inp" type="password" name="pass">
        </div>
         <div>
          <input class="inp btn" type="submit" value="Zaloguj się">
        </div>
        </div>
        </div>
        <div class="articlesDiv">';
        
    $conn=@mysqli_connect("localhost", "cos", "cos", "cos");
    $rs=mysqli_query($conn, "SELECT * FROM artykuly ORDER BY id DESC") or exit("Błąd w SQL");
    while($rec=mysqli_fetch_array($rs)) 
    { 
       echo '<div class="art">
       <div class="art-title">'
          .$rec["tytul"].
        '</div>
        <div class="art-cont">
          <div class="art-text">'
            .$rec["tresc"].
          '</div>
        <div class="art-zdj">
          <img src="data:image/jpeg;base64,'.$rec["zdjecie"].'" alt="img"/>
        </div>
        </div>
      <div class="art-author">Autor: '    
        .$rec["autor"].
      ', '.$rec["czas"].'</div>
       </div>';
    }
    echo '</div>
      </div>';
?>
      
  </body>

  </html>