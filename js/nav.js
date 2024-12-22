// Insertar el contenido del archivo `nav.html` con el addEventListener 
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
  const rutaActual = window.location.pathname.split("/").pop();
  const linkActivo = document.querySelector(`a[href="${rutaActual}"]`);
  if (linkActivo) {
    linkActivo.classList.add("activo");
  }
}
