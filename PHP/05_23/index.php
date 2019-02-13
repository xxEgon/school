<?php
  for($i=0; $i<10; $i++)
    { $liczby[$i] = rand()%10; }
  header("Content-type: image/jpeg");
  $rysunek = imagecreate (310,300)
    or die("Biblioteka graficzna nie została zainstalowana!");
  $kolorbialy = imagecolorallocate ($rysunek, 255, 255, 255);
  $kolorczarny = imagecolorallocate ($rysunek, 0, 0, 0);
  imagefill($rysunek, 0, 0, $kolorbialy);

  for( $i=0; $i<10; $i++)
  {
    $kolorslupka = imagecolorallocate ($rysunek, 25*$i, 25*$i,0);
	//imagefilledrectangle ($rysunek, $i*10+3, 90-$liczby[$i]*10, $i*10+7, 90, $kolorslupka);
    imagefilledrectangle ($rysunek, 30, $i*30+3, 300-$liczby[$i]*30, $i*30+15, $kolorslupka);
    imagestring ($rysunek, 10, 10, $i*30, $i, $kolorczarny);
  }
  imagejpeg($rysunek);
?>

