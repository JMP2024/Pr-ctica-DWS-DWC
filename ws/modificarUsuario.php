<?php
require "accesoPDO.php";

$acceso = new AccesoPDO();
$inputData = file_get_contents("php://input");
$parsedData = json_decode($inputData, true);

if (!$parsedData || !isset($parsedData['id'])) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos o ID no especificado']);
    exit;
}

$id = $parsedData['id'];
$datos = array_filter([
    'nombre' => $parsedData['nombre'] ?? null,
    'apellidos' => $parsedData['apellidos'] ?? null,
    'telefono' => $parsedData['telefono'] ?? null,
    'email' => $parsedData['email'] ?? null,
    'sexo' => $parsedData['sexo'] ?? null,
]);

$response = $acceso->modificarUsuario($id, $datos);

header('Content-Type: application/json');
echo json_encode($response);

