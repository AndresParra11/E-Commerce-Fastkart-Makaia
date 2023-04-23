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

// Creo un array con los nombres de los botones que quiero pintar en el nav.
const botones = [
  "Home",
  "Shop",
  "Product",
  "Mega Menu",
  "Blog",
  "Pages",
  "Seller",
];

// Creo una función que me permita pintar las cards de los productos en el contenedor que le indique.
const printCards = (productos, container) => {
  container.innerHTML = "";
  productos.forEach((producto) => {
    container.innerHTML += `
      <aside class="cardProducto flex-grow-1 d-flex flex-column align-items-center">
        <figure class="cardProducto__figure">
          <img id="${producto.id}" class="cardProducto__img" src=${producto.img} />
          <div id="cardProducto__iconos" class="cardProducto__iconos px-2">
            <ul class="product-option iconos d-flex p-0 m-0 justify-content-center gap-2">
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="View" class="iconos">
                <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#view" tabindex="0" class="iconos">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye iconos"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </a>
              </li>
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Compare" class="iconos">
                <a href="compare.html" tabindex="0" class="iconos">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw iconos"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                </a>
              </li>
              <li data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Wishlist" class="iconos">
                <a href="wishlist.html" class="notifi-wishlist iconos" tabindex="0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart iconos wishlist"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </a>
              </li>
            </ul>
          </div>

        </figure>
        <h4 class="cardProducto__nombre fs-6 m-0 pb-2 fw-bold align-self-start ps-2">${producto.nombre}</h4>
        <h3 class="cardProducto__precio fs-5 m-0 text-success align-self-start ps-2">${producto.precio}</h3>
        <ul class="m-0 p-0 ps-2 d-flex w-100 justify-content-start">
          <span class="estrella">★</span>
          <span class="estrella">★</span>
          <span class="estrella">★</span>
          <span class="estrella">★</span>
          <span class="estrella">★</span>
        </ul>
        <div class="container d-flex flex-row justify-content-between align-items-center btn-add-cart ">
          <span class="material-symbols-outlined cardProducto__span remove">remove</span>
          <button class="btn d-flex aling-items-center">0</button>
          <span class="material-symbols-outlined cardProducto__span add">add</span>
        </div>
      </aside>`;

    // Funcionalidad para cambiar la imagen cuando se pase el mouse por encima de los productos.
    document.addEventListener("mouseover", (event) => {
      if (event.target.id === `${producto.id}`) {
        document.getElementById(`${producto.id}`).src = `${producto.img2}`;
        event.target.nextElementSibling.classList.toggle(
          `cardProducto__iconos--active`
        );
      }
    });

    document.addEventListener("mouseout", (event) => {
      if (event.target.id === `${producto.id}`) {
        document.getElementById(`${producto.id}`).src = `${producto.img}`;
        event.target.nextElementSibling.classList.toggle(
          `cardProducto__iconos--active`
        );
      }
    });
  });
};

// Creo una función que me permita pintar los botones del nav en el contenedor que le indique.
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

// Se crea función para la funcionalidad de buscar un producto por su nombre.
const inputBusqueda = document.getElementById("inputSearch");
const btnBuscar = document.getElementById("btnSearch");

const searchProduct = async () => {
  const valueSearch = inputBusqueda.value;
  arrayProductos = await getAllProducts(URL_API);

  const productosFiltrados = arrayProductos.filter((producto) =>
    producto.nombre.toLowerCase().includes(valueSearch.toLowerCase())
  );

  const result = productosFiltrados.length ? productosFiltrados : [];
  const messageResult = valueSearch
    ? true
    : `No ingresaste un producto para buscar. <br> Inténtalo de nuevo!`;

  return {
    resultSearch: result,
    messageSearch: messageResult,
  };
};

// Se escucha el evento DOMContentLoaded para que se ejecute la función getAllProducts y se pinte la información en el contenedor de las cards cada vez que se recargue la página.
document.addEventListener("DOMContentLoaded", async () => {
  arrayProductos = await getAllProducts(URL_API);
  containerProductos = document.querySelector(".containerProductos");
  const containerNavButtons = document.querySelector(".container__navButtons");

  printCards(arrayProductos, containerProductos);
  printNavButtons(botones, containerNavButtons);
});

// Se capturan los eventos clic de toda la página y con condicionales if se ejecutan las funciones que correspondan.
document.addEventListener("click", async (event) => {
  event.preventDefault();

  // Refrescar la página si se da clic en el logo.
  if (event.target.classList.contains("pagePpal")) {
    window.location.href = "../index.html";
  }

  // Pintar las cards de los productos que se encontraron en la búsqueda.
  if (event.target.classList.contains("header__formButton")) {
    const productoBuscado = await searchProduct();
    printCards(productoBuscado.resultSearch, containerProductos);

    // Mensaje de error si no se encuentra el producto buscado.
    if (productoBuscado.resultSearch.length == false) {
      Swal.fire("Oops!", "Este producto no existe.", "error");
    }

    // Mensaje de error si no se ingresa un producto para buscar y se da clic en el botón de buscar.
    if (productoBuscado.messageSearch.length) {
      Swal.fire("Oops!", productoBuscado.messageSearch, "error");
    }
  }

  // Pintar las cards de los productos que se encuentren en la categoría seleccionada.
  if (event.target.classList.contains("filtredButton")) {
    const filter = event.target.name;
    const filtredProducts = arrayProductos.filter((producto) => {
      return producto.categoria.includes(filter);
    });
    printCards(filtredProducts, containerProductos);
  }

  // Pintar todas las cards de todos los productos cuando se da clic al botón de "All categories".
  if (event.target.classList.contains("AllCategories")) {
    printCards(arrayProductos, containerProductos);
  }

  // Calificación con estrellas de los productos.
  if (event.target.classList.contains("estrella")) {
    event.target.classList.add("activo");
    let estrellaAnterior = event.target.previousElementSibling;
    while (estrellaAnterior.classList.contains("estrella")) {
      estrellaAnterior.classList.add("activo");
      estrellaAnterior = estrellaAnterior.previousElementSibling;
      if (estrellaAnterior === null) {
        break;
      }
    }
  }

  if (event.target.classList[2] === "remove") {
    let contador = parseInt(event.target.nextElementSibling.innerText);
    if (contador > 0) {
      contador--;
      event.target.nextElementSibling.innerHTML = contador;
    }
  } else if (event.target.classList[2] === "add") {
    let contador = parseInt(event.target.previousElementSibling.innerText);
    contador++;
    event.target.previousElementSibling.innerHTML = contador;
  }

  if (event.target.classList.contains("wishlist")) {
    event.target.classList.toggle("wishlist--active");
  }
});

// Funcionalidad para que el nav se mantenga fijo en la parte superior de la página.
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header__navTop");
  if (window.pageYOffset > header.offsetTop) {
    header.classList.add("sticky-header");
  } else {
    header.classList.remove("sticky-header");
  }
});
