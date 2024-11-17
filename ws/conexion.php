<?php
class Conexion
{
    protected $conexion_db;

    public function __construct()
    {
        try {
            $this->conexion_db = new PDO('mysql:host=localhost; dbname=colegio', 'root', '');
            $this->conexion_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conexion_db->exec("SET CHARACTER SET utf8");
        } catch (Exception $e) {
            throw new Exception("Error de conexión a la base de datos: " . $e->getCode(), $e->getMessage());
        }
    }
}
