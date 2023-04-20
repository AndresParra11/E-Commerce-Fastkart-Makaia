// Se realiza la activación del servidor local con el JSON-server y el archivo db.json

const URL_API = "http://localhost:3000/productos";

// Creo una función GET que me va a permitir pedir toda la información de todos los productos que hay en el servidor. Mediante async/await y fetch.
const getAllProducts = async (url) => {
  //Método GET
  const response = await fetch(URL_API);
  if (!response.ok) {
    throw new Error("WARN", response.status);
  }
  const data = await response.json();
  return data;
};

// Creo el array donde capturaré la información que consigo del servidor local y capturo el contenedor donde pintaré todas las cards de los productos.
let arrayProductos = [];
let containerProductos = "";
const botones = [
  "Home",
  "Shop",
  "Product",
  "Mega Menu",
  "Blog",
  "Pages",
  "Seller",
];

const printCards = (productos, container) => {
  container.innerHTML = "";
  productos.forEach((producto) => {
    container.innerHTML += `
      <aside class="cardProducto flex-grow-1 d-flex flex-column align-items-center">
        <figure class="cardProducto__figure">
          <img id="${producto.id}" class="cardProducto__img" src=${producto.img} />
        </figure>
        <h4 class="cardProducto__nombre fs-6 fw-bold align-self-start ps-2">${producto.nombre}</h4>
        <h3 class="cardProducto__precio fs-5 m-0 text-success align-self-start ps-2">${producto.precio}</h3>
        <div class="container d-flex flex-row justify-content-between align-items-center btn-add-cart ">
          <button class="btn">Add</button>
          <span class="material-symbols-outlined cardProducto__span">add</span>
        </div>
      </aside>`;
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
};

const printNavButtons = (botones, container) => {
  container.innerHTML = "";
  botones.forEach((boton) => {
    container.innerHTML += `
    <div class="dropdown header__nav">
      <button
      class="btn btn-secondary dropdown-toggle header__navButtons"
      type="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      >
      ${boton}
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>`;
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  arrayProductos = await getAllProducts(URL_API);
  containerProductos = document.querySelector(".containerProductos");
  const containerNavButtons = document.querySelector(".container__navButtons");

  printCards(arrayProductos, containerProductos);
  printNavButtons(botones, containerNavButtons);
});
