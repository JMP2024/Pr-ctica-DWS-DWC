<?php
require "accesoPDO.php";

$acceso = new AccesoPDO();
$id = $_GET['id'] ?? null;

if ($id != null) {
    $response = $acceso->deleteUsuario($id);
} else {
    $response = [
        'success' => false,
        'message' => 'ID no especificado',
        'data' => null
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
