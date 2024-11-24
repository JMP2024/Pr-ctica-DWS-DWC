const usuarios = [
  {
    nombre: "Jorge",
    apellidos: "Martínez Pérez",
    telefono: "634488702",
    email: "2023mape@elcampico.org",
    sexo: "Masculino",
  },
  {
    nombre: "Ana",
    apellidos: "Lozano García",
    telefono: "987654321",
    email: "ana@example.com",
    sexo: "Femenino",
  },
  {
    nombre: "Jorver",
    apellidos: "Marinerito Ramírez",
    telefono: "634488102",
    email: "20dape@gmail.com",
    sexo: "Masculino",
  },
];

// Cargar los datos en la tabla
const cargarTabla = (data) => {
  const tabla = document.getElementById("tablaUsuarios");
  tabla.innerHTML = ""; // Limpia la tabla

  data.forEach((usuario, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.email}</td>
            <td>${usuario.sexo}</td>
            <td>
                <button onclick="eliminarUsuario(${index})">X</button>
                <button onclick="editarUsuario(this)">Editar</button>
            </td>
        `;
    tabla.appendChild(fila);
  });
};

// Eliminar un usuario
const eliminarUsuario = (index) => {
  usuarios.splice(index, 1);
  cargarTabla(usuarios);
};

// Filtrar usuarios
const filtrarUsuarios = () => {
  const filtro = document.getElementById("buscador").value.toLowerCase();
  const usuariosFiltrados =
    filtro.length < 3
      ? usuarios
      : usuarios.filter(
          (usuario) =>
            usuario.nombre.toLowerCase().includes(filtro) ||
            usuario.apellidos.toLowerCase().includes(filtro)
        );
  cargarTabla(usuariosFiltrados);
};

// Editar un usuario
const editarUsuario = (boton) => {
  const fila = boton.parentElement.parentElement;
  const nombre = fila.cells[0].textContent;
  const apellidos = fila.cells[1].textContent;
  const telefono = fila.cells[2].textContent;
  const email = fila.cells[3].textContent;
  const sexo = fila.cells[4].textContent;

  const formulario = document.createElement("div");
  formulario.innerHTML = `
        <form id="formEditar">
            <label>Nombre: <input type="text" id="nombre" value="${nombre}"></label><br>
            <label>Apellidos: <input type="text" id="apellidos" value="${apellidos}"></label><br>
            <label>Teléfono: <input type="tel" id="telefono" value="${telefono}"></label><br>
            <label>Email: <input type="text" id="email" value="${email}"></label><br>
            <label>Sexo: <input type="text" id="sexo" value="${sexo}"></label><br>
            <button type="button" onclick="guardarUsuario(this, '${fila.rowIndex}')">Guardar</button>
        </form>
    `;
  document.body.appendChild(formulario);
};

// Guardar usuario editado
const guardarUsuario = (boton, index) => {
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const sexo = document.getElementById("sexo").value;

  // Actualizar datos en la tabla y en el array
  usuarios[index - 1] = { nombre, apellidos, telefono, email, sexo };
  cargarTabla(usuarios);
  alert("Usuario actualizado");
  document.getElementById("formEditar").remove();
};

// Inicializar tabla al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  cargarTabla(usuarios);
});
