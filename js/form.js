document.addEventListener("DOMContentLoaded", () => {
  // Referencia al formulario
  const form = document.getElementById("formRegistro");

  // Manejar el envío del formulario
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Mostrar confirmación con SweetAlert2
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se registrará un nuevo usuario.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, registrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Confirmación aceptada");

        try {
          // Capturar los datos del formulario
          const nuevoUsuario = {
            nombre: form.nombre.value.trim(),
            apellidos: form.apellidos.value.trim(),
            telefono: form.telefono.value.trim(),
            email: form.email.value.trim(),
            sexo: form.sexo.value,
            fecha_nacimiento: form.fecha_nacimiento.value,
          };

          // Verificar que no falte ningún dato
          if (
            !nuevoUsuario.nombre ||
            !nuevoUsuario.apellidos ||
            !nuevoUsuario.telefono ||
            !nuevoUsuario.email ||
            !nuevoUsuario.sexo ||
            !nuevoUsuario.fecha_nacimiento
          ) {
            Swal.fire("Error", "Todos los campos son obligatorios", "error");
            return;
          }

          // Enviar los datos al servidor
          const respuesta = await fetch("ws/crearUsuario2.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoUsuario),
          });

          // Verificar si la respuesta es JSON válida
          const textRespuesta = await respuesta.text();
          console.log("Respuesta del servidor (texto):", textRespuesta);
          const datos = JSON.parse(textRespuesta);

          // Mostrar mensaje basado en la respuesta del servidor
          if (datos.success) {
            Swal.fire("Registrado", datos.message, "success");
            form.reset();
          } else {
            Swal.fire("Error", datos.message, "error");
          }
        } catch (error) {
          console.error("Error al conectar con el servidor:", error);
          Swal.fire("Error", "No se pudo conectar al servidor", "error");
        }
      } else {
        console.log("Confirmación cancelada");
      }
    });
  });
});
