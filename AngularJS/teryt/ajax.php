<?php
    $xml_simc = simplexml_load_file("teryt_simc.xml");
    $xml_terc = simplexml_load_file("teryt_terc.xml");
    if(isset($_POST['f'], $_POST['w'], $_POST['p'], $_POST['g'])) {
        switch($_POST['f']) {
            case "WOJ":
                $result = $xml_terc->xpath("/teryt/catalog/row/NAZWA_DOD[text()='województwo']/../NAZWA");               
                break;
            case "POW":
                $wojNr = $xml_terc->xpath("/teryt/catalog/row/NAZWA_DOD[text()='województwo']/../NAZWA[text()='".$_POST['w']."']/../WOJ");
                $result = $xml_terc->xpath("/teryt/catalog/row/NAZWA_DOD[text()='powiat']/../WOJ[text()='".$wojNr[0]."']/../NAZWA");
                break;
            case "GMI":
                $wojNr = $xml_terc->xpath("/teryt/catalog/row/NAZWA_DOD[text()='województwo']/../NAZWA[text()='".$_POST['w']."']/../WOJ");
                $powNr = $xml_terc->xpath("/teryt/catalog/row/NAZWA_DOD[text()='powiat']/../WOJ[text()='".$wojNr[0]."']/../NAZWA[text()='".$_POST['p']."']/../POW");
                $result = $xml_terc->xpath("//teryt/catalog/row/NAZWA_DOD[contains(text(),'gmina') or contains(text(),'obszar') or contains(text(),'delegatura') or contains(text(), 'miasto') or contains(text(), 'dzielnica')]/../WOJ[text()='".$wojNr[0]."']/../POW[text()='".$powNr[0]."']/../NAZWA");
                break;
            case "MIA":
                $wojNr = $xml_terc->xpath("/teryt/catalog/row/NAZWA_DOD[text()='województwo']/../NAZWA[text()='".$_POST['w']."']/../WOJ");
                $powNr = $xml_terc->xpath("/teryt/catalog/row/NAZWA_DOD[text()='powiat']/../WOJ[text()='".$wojNr[0]."']/../NAZWA[text()='".$_POST['p']."']/../POW");
                $gmiNr = $xml_terc->xpath("/teryt/catalog/row/NAZWA_DOD[contains(text(),'gmina') or contains(text(),'obszar') or contains(text(),'delegatura') or contains(text(), 'miasto') or contains(text(), 'dzielnica')]/../WOJ[text()='".$wojNr[0]."']/../POW[text()='".$powNr[0]."']/../NAZWA[text()='".$_POST['g']."']/../GMI");
                $result = $xml_simc->xpath("/SIMC/catalog/row/WOJ[text()='".$wojNr[0]."']/../POW[text()='".$powNr[0]."']/../GMI[text()='".$gmiNr[0]."']/../NAZWA");
                break;
        }
        echo json_encode($result);
    }else {
        echo "NOT SET VARIABLES";
    } 
    
?>