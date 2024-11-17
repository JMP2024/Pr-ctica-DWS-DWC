<?php
require "accesoPDO.php";

$acceso = new AccesoPDO();
$id = $_GET['id'] ?? null;

if ($id != null) {
    // Leer datos de entrada en formato JSON
    $inputData = file_get_contents("php://input");
    $parsedData = json_decode($inputData, true);

    // Si no se puede decodificar el JSON, retornar error
    if (!$parsedData) {
        $response = [
            'success' => false,
            'message' => 'Datos de entrada inválidos',
            'data' => null
        ];
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    // Filtrar los datos válidos para la actualización
    $datos = array_filter([
        'nombre' => $parsedData['nombre'],
        'apellidos' => $parsedData['apellidos'],
        'password' => $parsedData['password'],
        'telefono' => $parsedData['telefono'],
        'email' => $parsedData['email'],
        'sexo' => $parsedData['sexo'],
        'fecha_nacimiento' => $parsedData['fecha_nacimiento'],
    ]);

    $response = $acceso->modificarUsuario($id, $datos);
} else {
    $response = [
        'success' => false,
        'message' => 'ID no especificado',
        'data' => null
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
