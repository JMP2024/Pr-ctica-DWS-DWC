<?php
require_once 'interfaces/IToJson.php';

class User implements IToJson
{
    private $nombre;
    private $apellidos;
    private $password;
    private $tel;
    private $email;
    private $sexo;

    // Constructor 
    public function __construct($nombre, $apellidos, $password, $tel, $email, $sexo)
    {
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->password = $password;
        $this->tel = $tel;
        $this->email = $email;
        $this->sexo = $sexo;
    }

    // Getters y Setters 
    public function getNombre()
    {
        return $this->nombre;
    }
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    public function getApellidos()
    {
        return $this->apellidos;
    }
    public function setApellidos($apellidos)
    {
        $this->apellidos = $apellidos;
    }

    public function getPassword()
    {
        return $this->password;
    }
    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getTel()
    {
        return $this->tel;
    }
    public function setTel($tel)
    {
        $this->tel = $tel;
    }

    public function getEmail()
    {
        return $this->email;
    }
    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getSexo()
    {
        return $this->sexo;
    }
    public function setSexo($sexo)
    {
        $this->sexo = $sexo;
    }

    public function toJson()
    {
        return json_encode([
            'nombre' => $this->nombre,
            'apellidos' => $this->apellidos,
            'password' => $this->password,
            'tel' => $this->tel,
            'email' => $this->email,
            'sexo' => $this->sexo
        ]);
    }
}

