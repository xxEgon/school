<html>

  <head>
    <title>SuperFakty - zaloguj</title>
    <meta charset="utf-8" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style.css">

  </head>

  <body>
    <?php
    if(isset($_POST["ponownie"])) {
      header("Location: logowanie.php");
      exit();
    }
    else {
      session_start();
      if(isset($_SESSION["login"]))
          $error = "Użytkownik <b>" . $_SESSION["login"] . "</b> został wylogowany.";
      else 
        $error = false;
         session_destroy();
    }  
    echo '<div class="mainDiv">
    <div class="errorDiv">'.($error ? $error : "").'</div>
    <div class="headerDiv">
    <div class="title">
      SuperFakty
    </div>
     <form method="POST">
       <div class="logDiv">
        <div>
          <input class="inp" type="hidden" name="ponownie">
        </div>
        <div>
          <input class="inp btn ponownie" type="submit" value="Zaloguj się ponownie">
        </div>
         <div>
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
