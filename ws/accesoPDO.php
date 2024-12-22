<?php
require "conexion.php";

class AccesoPDO extends Conexion
{
    public function __construct()
    {
        parent::__construct();
    }

    public function ejecutar($query, $params)
    {
        try {
            $sentencia = $this->conexion_db->prepare($query);
            $resultado = $sentencia->execute($params);

            return $resultado;
        } catch (Exception $e) {
            return false;
        }
    }

    public function getUsuarios($id = null)
    {
        try {
            $sql = $id ? "SELECT * FROM alumno WHERE id = :id" : "SELECT * FROM alumno";
            $sentencia = $this->conexion_db->prepare($sql);
            if ($id) {
                $sentencia->bindParam(':id', $id, PDO::PARAM_INT);
            }
            $sentencia->execute();
            $data = $sentencia->fetchAll(PDO::FETCH_ASSOC);

            return [
                'success' => true,
                'message' => 'Usuarios obtenidos correctamente',
                'data' => $data
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'data' => null
            ];
        }
    }

    public function deleteUsuario($id)
    {
        try {
            $sql = "DELETE FROM alumno WHERE id = :id";
            $sentencia = $this->conexion_db->prepare($sql);
            $sentencia->bindParam(':id', $id, PDO::PARAM_INT);
            $sentencia->execute();

            return [
                'success' => true,
                'message' => 'Usuario eliminado correctamente',
                'data' => ['id' => $id]
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'data' => null
            ];
        }
    }

    public function modificarUsuario($id, $datos)
    {
        if (empty($datos)) {
            return [
                'success' => false,
                'message' => 'No se proporcionaron datos para actualizar',
                'data' => null
            ];
        }

        try {
            // Consulta SQL 
            $campos = array_map(fn($campo) => "$campo = :$campo", array_keys($datos));
            $sql = "UPDATE alumno SET " . implode(', ', $campos) . " WHERE id = :id";

            $sentencia = $this->conexion_db->prepare($sql);

            // Añadir el parámetro `id`
            $datos['id'] = $id;
            $sentencia->execute($datos);

            return [
                'success' => true,
                'message' => 'Usuario modificado correctamente',
                'data' => ['id' => $id]
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'data' => null
            ];
        }
    }

    public function crearUsuario($datos)
    {
        try {
            $sql = "INSERT INTO alumno (nombre, apellidos, password, telefono, email, sexo, fecha_nacimiento) VALUES (:nombre, :apellidos, :password, :telefono, :email, :sexo, :fecha_nacimiento)";
            $sentencia = $this->conexion_db->prepare($sql);
            $sentencia->execute([
                ':nombre' => $datos['nombre'],
                ':apellidos' => $datos['apellidos'],
                ':password' => $datos['password'],
                ':telefono' => $datos['telefono'],
                ':email' => $datos['email'],
                ':sexo' => $datos['sexo'],
                ':fecha_nacimiento' => $datos['fecha_nacimiento']
            ]);

            return [
                'success' => true,
                'message' => 'Usuario creado correctamente',
                'data' => $datos
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'data' => null
            ];
        }
    }
}
