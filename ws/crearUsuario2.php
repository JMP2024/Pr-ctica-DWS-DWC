<?php
require "accesoPDO.php";

// Captura el cuerpo de la solicitud y decodifica el JSON en un array asociativo
$input = file_get_contents('php://input');
$datos = json_decode($input, true);

$acceso = new AccesoPDO();
$response = $acceso->crearUsuario($datos);

header('Content-Type: application/json');
echo json_encode($response);
