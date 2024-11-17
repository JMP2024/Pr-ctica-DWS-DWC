<?php
require_once 'models/User.php';

// Recoge los datos del formulario
$nombre = $_POST['nombre'];
$apellidos = $_POST['apellidos'];
$password = $_POST['password'];
$tel = $_POST['tel'];
$email = $_POST['email'];
$sexo = $_POST['sexo'];

// Crea una nueva instancia de User
$user = new User($nombre, $apellidos, $password, $tel, $email, $sexo);

// Almacena los datos del usuario en un archivo de texto
$file = 'usuarios.txt';
$data = $user->toJson() . PHP_EOL;
file_put_contents($file, $data, FILE_APPEND);

// Muestra la información del usuario en formato JSON
header('Content-Type: application/json');
echo $user->toJson();

