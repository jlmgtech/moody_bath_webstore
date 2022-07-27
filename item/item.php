<?php

$fdata = file_get_contents(__DIR__ . "/" . "../public/data/inventory.json");
if (!$fdata) {
    echo "Error: could not read inventory.json";
    exit(1);
}

$items = json_decode($fdata, true);
if (!$items) {
    echo "Error: could not decode inventory.json";
    exit(1);
}

$item = NULL;
foreach ($items as $_ => $i) {
    if ($i["slug"] == $_GET["item"]) {
        $item = $i;
        break;
    }
}

if ($item === NULL) {
    require_once __DIR__ . "/" . "../notfound/notfound.php";
} else {
    require_once __DIR__ . "/" . "itemview.php";
}
