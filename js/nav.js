// Insertar el contenido del archivo `nav.html` con el addEventListener para que 
document.addEventListener("DOMContentLoaded", () => {
  fetch("nav.html")
    .then((response) => {
      return response.text(); // Obtener el contenido como texto
    })
    .then((data) => {
      const navigation = document.createElement("div");
      navigation.id = "navigation";
      navigation.innerHTML = data;
      document.body.insertAdjacentElement("afterbegin", navigation);
      resaltarRuta();
    });
});
function resaltarRuta() {
  // Obtener la última parte de la URL 
  const rutaActual = window.location.pathname.split("/").pop();

  // Buscar el enlace cuyo `href` coincida con la ruta actual
  const linkActivo = document.querySelector(`a[href="${rutaActual}"]`);
  if (linkActivo) {
    // Agregar la clase `activo` al enlace encontrado
    linkActivo.classList.add("activo");
  }
}
