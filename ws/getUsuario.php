<?php
require 'conexion.php'; 
require 'config.php';

try {
    // Crear conexión
    $conexion = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta para obtener todos los usuarios
    $sql = "SELECT * FROM alumno";
    $stmt = $conexion->prepare($sql);
    $stmt->execute();

    // Obtener los resultados
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Devolver los datos en formato JSON
    echo json_encode([
        "success" => true,
        "data" => $usuarios,
    ]);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al obtener los usuarios: " . $e->getMessage(),
    ]);
}
