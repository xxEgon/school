	<?php
		//phpinfo();
		//echo('PHP żółw <br>');
		//print('żółć <br>');
		//print("<img src=\"obrazek.jpg\" alt='elo' > <br>");
		
		//define("PI", 3.14);
		if(isset($_GET['a']) && isset($_GET['b'])) {
			$a= $_GET['a'];
			$b= $_GET['b'];
			$pole= $a*$b;
			//echo('Pole koła o promieniu '.$r.' wynosi: '.PI*$r*$r);
			//jak jest cudzyslow to nie trzeba tych kropek itd. j.w.
			echo("Pole prostokąta o bokach $a, $b wynosi: ".$pole);
			//echo "<br>".$r;
		}
	?>