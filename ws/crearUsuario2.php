<?php
require "accesoPDO.php";

// Leer los datos enviados por el cliente
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que los datos no estén vacíos
if (isset($data['nombre'], $data['apellidos'], $data['telefono'], $data['email'], $data['sexo'], $data['fecha_nacimiento'])) {
    try {
        $acceso = new AccesoPDO();
        
        // Preparar la consulta SQL para insertar el nuevo usuario
        $query = "INSERT INTO alumno (nombre, apellidos, telefono, email, sexo, fecha_nacimiento) 
                  VALUES (:nombre, :apellidos, :telefono, :email, :sexo, :fecha_nacimiento)";
        
        $params = [
            ':nombre' => $data['nombre'],
            ':apellidos' => $data['apellidos'],
            ':telefono' => $data['telefono'],
            ':email' => $data['email'],
            ':sexo' => $data['sexo'],
            ':fecha_nacimiento' => $data['fecha_nacimiento'],
        ];

        // Ejecutar la consulta
        $resultado = $acceso->ejecutar($query, $params);

        if ($resultado) {
            echo json_encode(['success' => true, 'message' => 'Usuario creado correctamente']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al insertar el usuario en la base de datos']);
        }
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error del servidor: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos. Por favor, verifica el formulario.']);
}
