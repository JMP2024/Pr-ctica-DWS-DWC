<?php
require "accesoPDO.php";

$acceso = new AccesoPDO();
$id = $_GET['id'] ?? null;
$response = $acceso->getUsuarios($id);

header('Content-Type: application/json');
echo json_encode($response);

