<?php
    $xml = simplexml_load_file("czasopisma.xml");
    if(isset($_GET['f'], $_GET['p']) && $_GET['f']==1) {
        $result = $xml->xpath($_GET['p']);
    }
    echo json_encode($result);
    //echo "ok";
?>