let usuarios = [];
let formularioAbierto = null;

// Función para cargar los datos en la tabla
const cargarTabla = (usuarios) => {
  const tabla = document.getElementById("tablaUsuarios");
  tabla.innerHTML = ""; // Limpiar tabla antes de cargar los nuevos datos

  if (usuarios.length === 0) {
    tabla.innerHTML =
      "<tr><td colspan='6'>No hay usuarios registrados.</td></tr>";
  }

  usuarios.forEach((usuario, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellidos}</td>
            <td>${usuario.telefono}</td>
            <td>${usuario.email}</td>
            <td>${usuario.sexo}</td>
            <td>
                <button onclick="editarUsuario(${index}, ${usuario.id})">Editar</button>
                <button onclick="eliminarUsuario(${index}, ${usuario.id})">Eliminar</button>
            </td>
        `;
    tabla.appendChild(fila);
  });
};

// Obtener los usuarios desde el servidor
const obtenerUsuarios = async () => {
  try {
    const respuesta = await fetch("ws/getUsuario.php");
    if (!respuesta.ok) throw new Error("Error en la respuesta del servidor");

    const datos = await respuesta.json();

    if (datos.success) {
      usuarios = datos.data;
      cargarTabla(usuarios);
    } else {
      console.error("Error al obtener los usuarios:", datos.message);
    }
  } catch (error) {
    console.error("Error al conectar con el servidor:", error);
  }
};

// Eliminar un usuario
const eliminarUsuario = async (index, id) => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminará el usuario de forma permanente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const respuesta = await fetch("ws/deleteUsuario.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        const datos = await respuesta.json();
        if (datos.success) {
          usuarios.splice(index, 1); // Actualiza el array local
          cargarTabla(usuarios); // Recargar tabla
          Swal.fire("Eliminado", datos.message, "success");
        } else {
          Swal.fire("Error", datos.message, "error");
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo conectar con el servidor", "error");
      }
    }
  });
};

// Editar un usuario
const editarUsuario = (index, id) => {
  if (formularioAbierto) {
    cancelarEdicion();
  }

  const usuario = usuarios[index];
  const formulario = document.createElement("div");
  formulario.innerHTML = `
        <form id="formEditar">
            <label>Nombre: <input type="text" id="nombre" value="${
              usuario.nombre
            }"></label><br>
            <label>Apellidos: <input type="text" id="apellidos" value="${
              usuario.apellidos
            }"></label><br>
            <label>Teléfono: <input type="tel" id="telefono" value="${
              usuario.telefono
            }"></label><br>
            <label>Email: <input type="text" id="email" value="${
              usuario.email
            }"></label><br>
            <label>Sexo: 
                <select id="sexo">
                    <option value="Masculino" ${
                      usuario.sexo === "Masculino" ? "selected" : ""
                    }>Masculino</option>
                    <option value="Femenino" ${
                      usuario.sexo === "Femenino" ? "selected" : ""
                    }>Femenino</option>
                </select>
            </label><br>
            <button type="button" onclick="guardarUsuario(${index}, ${id})">Guardar</button>
            <button type="button" onclick="cancelarEdicion()">Cancelar</button>
        </form>
    `;
  document.body.appendChild(formulario);
  formularioAbierto = formulario;
};

// Cancelar la edición y cerrar el formulario
const cancelarEdicion = () => {
  if (formularioAbierto) {
    formularioAbierto.remove();
    formularioAbierto = null;
  }
};

// Guardar los cambios del usuario
const guardarUsuario = async (index, id) => {
  const nombre = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellidos").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const sexo = document.getElementById("sexo").value;

  const usuarioModificado = { id, nombre, apellidos, telefono, email, sexo };

  try {
    const respuesta = await fetch("ws/modificarUsuario.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioModificado),
    });

    const datos = await respuesta.json();
    if (datos.success) {
      usuarios[index] = usuarioModificado; // Actualiza el array local
      cargarTabla(usuarios); // Recargar tabla
      cancelarEdicion(); // Cerrar el formulario
      Swal.fire("Actualizado", datos.message, "success");
    } else {
      Swal.fire("Error", datos.message, "error");
    }
  } catch (error) {
    Swal.fire("Error", "No se pudo conectar con el servidor", "error");
  }
};

// Filtrar usuarios por nombre y las primeras tres letras
const filtrarUsuarios = () => {
  const busqueda = document.getElementById("buscador").value.toLowerCase();

  if (busqueda.length < 3) {
    cargarTabla(usuarios);
    return;
  }

  // Filtrar usuarios si hay al menos 3 letras
  const usuariosFiltrados = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().substring(0, 3) === busqueda.substring(0, 3)
  );
  cargarTabla(usuariosFiltrados);
};

// Cargar los usuarios cuando la página cargue
window.onload = () => {
  obtenerUsuarios();
};
