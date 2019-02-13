<?php
session_start();
if (!isset($_SESSION["login"])){
  header("Location: logowanie.php");
 exit();
}
?>
<HTML>
<head>
    <title>SuperFakty - zalogowano</title>
    <meta charset="utf-8" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
<body>
    <?php
    $error = false;
    if(isset($_POST["zatwierdz"])){
      $_FILES["zdjecie"];
      if(strlen($_POST["ta_tytul"]) > 0 && strlen($_POST["ta_tresc"]) > 0 && isset($_FILES['zdjecie'])) {
          if ($_FILES['zdjecie']['type'] == 'image/jpeg')
          {
            if(is_uploaded_file($_FILES['zdjecie']['tmp_name']))
            {
              $obrazek=base64_encode(file_get_contents($_FILES['zdjecie']['tmp_name']));
              $conn=@mysqli_connect("localhost", "cos", "cos", "cos");
              $rs=mysqli_query($conn, "INSERT INTO artykuly (tytul, tresc, autor, zdjecie, czas) VALUES ('".$_POST["ta_tytul"]."', '".$_POST["ta_tresc"]."', '".$_SESSION["login"]."', '".$obrazek."', CURRENT_TIMESTAMP('DD-MM-YYYY')) ") or exit("Błąd w SQL 1");
            }
            else
            {
              $error = 'Problem: Możliwy atak podczas przesyłania pliku. Plik nie został zapisany.';
            }
          }
          else
          {
            $error = "Nie ma pliku";
          }
      }
      else {
        $error="Niepoprawne wartości";
      }
    }

    $edytowanie = false;
    $obecne_id = -1;

    if(isset($_POST["wyloguj"])){
      header("Location: wyloguj.php?". SID);
      exit();
    }
    if(isset($_POST["anuluj"])){

    }
    if(isset($_POST["edit"])){
      $edytowanie = true;
      $obecne_id = $_POST["edit"];
    }
    if(isset($_POST["delete"])){
      $conn=@mysqli_connect("localhost", "cos", "cos", "cos");
      $rs=mysqli_query($conn, "DELETE FROM artykuly WHERE id='".$_POST["delete"]."'") or exit("Błąd w SQL 1");
    }
    if(isset($_POST["zatwierdz_edit"])){
      if(!empty($_FILES['zdjecie_edit']['name'])){
        if(strlen($_POST["ta_tytul_edit"]) > 0 && strlen($_POST["ta_tresc_edit"]) > 0) {
            if ($_FILES['zdjecie_edit']['type'] == 'image/jpeg')
            {
              if(is_uploaded_file($_FILES['zdjecie_edit']['tmp_name']))
                {
                  $obrazek_edit=base64_encode(file_get_contents($_FILES['zdjecie_edit']['tmp_name']));
                  $conn=@mysqli_connect("localhost", "cos", "cos", "cos");
                  $rs=mysqli_query($conn, "UPDATE artykuly SET tytul='".$_POST["ta_tytul_edit"]."', tresc='".$_POST["ta_tresc_edit"]."', zdjecie='".$obrazek_edit."', czas=CURRENT_TIMESTAMP('DD-MM-YYYY') WHERE id='".$_POST["zatwierdz_edit"]."'") or exit("Błąd w SQL 1");
              }
              else
              {
                $error = 'Problem: Możliwy atak podczas przesyłania pliku. Plik nie został zapisany.';
              }
            }
            else
            {
              $error = "Nie ma pliku";
            }
        }
        else {
          $error="Niepoprawne wartości";
        }
      }
      else {
        if(strlen($_POST["ta_tytul_edit"]) > 0 && strlen($_POST["ta_tresc_edit"]) > 0) {
          $conn=@mysqli_connect("localhost", "cos", "cos", "cos");
          $rs=mysqli_query($conn, "UPDATE artykuly SET tytul='".$_POST["ta_tytul_edit"]."', tresc='".$_POST["ta_tresc_edit"]."', czas=CURRENT_TIMESTAMP('DD-MM-YYYY') WHERE id='".$_POST["zatwierdz_edit"]."'") or exit("Błąd w SQL 1");
        }
        else {
          $error="Niepoprawne wartości";
        }
      }

    }
    echo '<div class="mainDiv">
    <div class="errorDiv">'.($error ? $error : "").'</div>
    <div class="headerDiv">
    <div class="title">
      SuperFakty
    </div>
       <div class="logDiv">
        <div>
          Witaj, <b>'
          .$_SESSION["login"].
          '</b> 
          </div>
          <div>
          <form method="POST">
            <input class="inp" type="hidden" name="wyloguj">
            <input class="inp btn" type="submit" value="Wyloguj">
          </form>
          </div>
          <div>
          <form method="POST">
            <input class="inp" type="hidden" name="dodaj">
            <input class="inp btn" type="submit" value="Dodaj artykuł">    
          </form>    
          </div>
          </div>
        </div>';
    if(isset($_POST["dodaj"])) {
      echo '<div class="dodajDiv">
        <form method="POST" enctype="multipart/form-data">
          <input class="inp" type="hidden" name="zatwierdz">
          <textarea class="dodaj_area" id="ta_tytul" name="ta_tytul"></textarea>
          <textarea class="dodaj_area" id="ta_tresc" name="ta_tresc"></textarea>
          <input class="dodaj_zdj" type="file" name="zdjecie" accept="image/*" id="file"/>
          <label for="file">Wybierz zdjęcie</label>
          <input class="inp btn zatwierdz" type="submit" value="Zatwierdź"/>  
        </form>
        <form method="POST">
          <input class="inp" type="hidden" name="anuluj">
          <input class="inp zatwierdz btn anuluj" type="submit" value="Anuluj">    
        </form>      
      </div>';
    }

    echo '<div class="articlesDiv">';
        
    $conn=@mysqli_connect("localhost", "cos", "cos", "cos");
    $rs=mysqli_query($conn, "SELECT * FROM artykuly ORDER BY id DESC") or exit("Błąd w SQL");
    while($rec=mysqli_fetch_array($rs)) 
    {  
       if($edytowanie && $rec["id"] == $obecne_id){
        echo '<div class="art editing">';
        echo '<form method="POST" enctype="multipart/form-data">
          <input class="inp" type="hidden" name="zatwierdz_edit" value="'.$rec["id"].'">
          <textarea class="dodaj_area" id="ta_tytul_edit" name="ta_tytul_edit">'.$rec["tytul"].'</textarea>
          <textarea class="dodaj_area" id="ta_tresc_edit" name="ta_tresc_edit">'.$rec["tresc"].'</textarea>
          <input class="dodaj_zdj" type="file" name="zdjecie_edit" accept="image/*" id="file"/>
          <label for="file">Wybierz zdjęcie</label>
          <input class="inp btn zatwierdz" type="submit" value="Zatwierdź"/>  
        </form>
        <form method="POST">
          <input class="inp" type="hidden" name="anuluj">
          <input class="inp zatwierdz btn anuluj" type="submit" value="Anuluj">    
        </form>
        <div class="dodaj_miniaturka"><img src="data:image/jpeg;base64,'.$rec["zdjecie"].'" alt="img"/>
        </div>';      
       }
       else {
        echo '<div class="art">';
        if($rec["autor"] == $_SESSION["login"])
        {
          echo '<div class="art-edit">
              <form method="POST">
                <input class="inp" type="hidden" name="edit" value="'.$rec["id"].'">
                <input class="inp btn edit" type="submit" value="Edytuj">    
              </form>  
              <form method="POST">
                <input class="inp" type="hidden" name="delete" value="'.$rec["id"].'">
                <input class="inp btn edit" type="submit" value="Usuń">    
              </form>      
          </div>';
        }

        echo '<div class="art-title">'
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
        ' | '.$rec["czas"].'</div>';      
      }
      echo '</div>';
  }
  echo '</div>
    </div>';
    
?>
      
  </body>
</HTML>
