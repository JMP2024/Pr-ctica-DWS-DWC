<?php
require "accesoPDO.php";

$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'] ?? null;

if ($id) {
    $acceso = new AccesoPDO();
    $response = $acceso->deleteUsuario($id);
} else {
    $response = [
        'success' => false,
        'message' => 'ID no proporcionado',
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
?>
