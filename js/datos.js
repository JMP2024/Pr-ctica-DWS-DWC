const usuarios = [
    {
        nombre: "Jorge",
        apellidos: "Martínez Pérez",
        telefono: "634488702",
        email: "2023mape@elcampico.org",
        sexo: "Masculino"
    },
    {
        nombre: "Ana",
        apellidos: "Lozano García",
        telefono: "987654321",
        email: "ana@example.com",
        sexo: "Femenino"
    },
    {
        nombre: "Jorver",
        apellidos: "Marinerito Ramírez",
        telefono: "634488102",
        email: "20dape@gmail.com",
        sexo: "Masculino"
    }
];

// Función que carga los datos en la tabla
function cargarTabla(data) {
    const tabla = document.getElementById("tablaUsuarios");
    tabla.innerHTML = ""; // Limpia la tabla antes de llenarla

    data.forEach(usuario => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.email}</td>
            <td>${usuario.sexo}</td>
            <td><button onclick="this.parentNode.parentNode.remove()">X</button></td> 
        `;
//parentNode para acceder primero al nodo padre (la celda de la tabla) y luego al padre de esa celda (la fila de la tabla).
        tabla.appendChild(fila);
    });
}

// Llama a cargarTabla con todos los usuarios al iniciar la página
window.onload = () => cargarTabla(usuarios);

function filtrarUsuarios() {
    const filtro = document.getElementById("buscador").value.toLowerCase();

    // Filtrar usuarios si hay al menos 3 caracteres en el filtro
    const usuariosFiltrados = filtro.length < 3 ? usuarios : usuarios.filter(usuario => {
        return usuario.nombre.toLowerCase().includes(filtro) || usuario.apellidos.toLowerCase().includes(filtro);
    });

    cargarTabla(usuariosFiltrados);
}
