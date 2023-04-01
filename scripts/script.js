// Se realiza la activación del servidor local con el JSON-server y el archivo db.json

const url = "http://localhost:3000/productos";

// Creo una función GET que me va a permitir pedir toda la información de todos los productos que hay en el servidor. Mediante async/await y fetch.
const getAllProducts = async (url) => {
  //Método GET
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("WARN", response.status);
  }
  const data = await response.json();
  return data;
};

// Creo el array donde capturaré la información que consigo del servidor local y capturo el contenedor donde pintaré todas las cards de los productos.
const arrayProductos = await getAllProducts(url);
const containerProductos =
  document.getElementsByClassName("containerProductos");

const printCards = (productos, container) => {
  container = "";
  productos.forEach((producto) => {
    container += `
      <aside class="cardProducto">
        <figure class="cardProducto__figure">
          <img id="${producto.id}" class="cardProducto__img cardProducto__img--figure" src=${producto.img} />
        </figure>
        <h4 class="cardProducto__nombre">${producto.nombre}</h4>
        <h3 class="cardProducto__precio">${producto.precio}</h3>
        <button class="cardProducto__añadirCarrito">Add</button>
      </aside>
        `;

    document.addEventListener("mouseover", (event) => {
      if (event.target.id === `${producto.id}`) {
        document.getElementById(`${producto.id}`).src = `${producto.img2}`;
      }
    });

    document.addEventListener("mouseout", (event) => {
      if (event.target.id === `${producto.id}`) {
        document.getElementById(`${producto.id}`).src = `${producto.img}`;
      }
    });
  });

  document.querySelector(".containerProductos").innerHTML = container;
};

printCards(arrayProductos, containerProductos);
