import {
  getAllProducts,
  printCards,
  printNavButtons,
  postProductToCart,
  deleteProductFromCart,
  putProductToCart,
} from "../services/funciones.js";

// Se realiza la activación del servidor local con el JSON-server y el archivo db.json

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

const URL_API = "http://localhost:3000/productos";

// Url del endpoint de la API de productos en el carrito.
const URL_API_CARRITO = "http://localhost:3000/carrito";

let arrayProductos = [];
let arrayProductosFavoritos = [];
let containerProductosFavoritos = "";
let arrayProductosCarrito = [];

// Conseguir los productos que se han añadido a favoritos desde el LocalStorage.
const arrayIdProductosFavoritos = JSON.parse(
  localStorage.getItem("arrayIdProductosFavoritos")
);

// Se escucha el evento DOMContentLoaded para que se ejecute la función getAllProducts y se pinte la información en el contenedor de las cards cada vez que se recargue la página.

document.addEventListener("DOMContentLoaded", async () => {
  // Conseguir todos los productos de la API.
  arrayProductos = await getAllProducts(URL_API);
  arrayProductosCarrito = await getAllProducts(URL_API_CARRITO);

  const containerNavButtons = document.querySelector(".container__navButtons");
  printNavButtons(botones, containerNavButtons);

  // Filtrar los productos que se han añadido a favoritos.
  arrayIdProductosFavoritos.forEach((idProducto) => {
    const producto = arrayProductos.find(
      (producto) => producto.id === parseInt(idProducto)
    );
    arrayProductosFavoritos.push(producto);
  });

  // Pintar los productos que se han añadido a favoritos.
  containerProductosFavoritos = document.querySelector(".containerProductos");
  printCards(arrayProductosFavoritos, containerProductosFavoritos);
});

// Se capturan los eventos clic de toda la página y con condicionales if se ejecutan las funciones que correspondan.
document.addEventListener("click", async (event) => {
  event.preventDefault();

  // Redirecciona a la página principal si se da clic en el logo o en el home.
  if (event.target.classList.contains("pagePpal")) {
    window.location.href = "../index.html";
  }

  // Pintar las cards de los productos que se encontraron en la búsqueda.
  if (event.target.classList.contains("header__formButton")) {
    const inputBusqueda = document.getElementById("inputSearch");
    const productoBuscado = await searchProduct(inputBusqueda, URL_API);
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

  // Suma o resta la cantidad de productos que se van a añadir al carrito. También, añade o elimina el producto del array de productos en el carrito.
  if (event.target.classList[2] === "remove") {
    let contador = parseInt(event.target.nextElementSibling.innerText);
    if (contador > 0) {
      contador--;
      event.target.nextElementSibling.innerHTML = contador;
    }

    // Elimina el producto del array de productos en el carrito si la cantidad es 0.
    if (event.target.nextElementSibling.innerHTML >= 0) {
      const idProducto = parseInt(event.target.getAttribute("name"));
      const producto = arrayProductos.find((producto) => {
        return producto.id === idProducto;
      });

      producto.cantidad = event.target.nextElementSibling.innerText;

      if (
        arrayProductosCarrito.some((producto) => producto.id === idProducto) &&
        event.target.nextElementSibling.innerHTML == 0
      ) {
        await deleteProductFromCart(URL_API_CARRITO, idProducto);
        arrayProductosCarrito = await getAllProducts(URL_API_CARRITO);
      }

      if (producto.cantidad >= 1) {
        await putProductToCart(URL_API_CARRITO, idProducto, producto);
      }
    }
  } else if (event.target.classList[2] === "add") {
    let contador = parseInt(event.target.previousElementSibling.innerText);
    contador++;
    event.target.previousElementSibling.innerHTML = contador;

    // Añade el producto del array de productos en el carrito si la cantidad es mayor a 0.
    if (event.target.previousElementSibling.innerHTML >= 1) {
      const idProducto = parseInt(event.target.getAttribute("name"));
      const producto = arrayProductos.find((producto) => {
        return producto.id === idProducto;
      });

      producto.cantidad = event.target.previousElementSibling.innerText;

      if (
        !arrayProductosCarrito.some((producto) => producto.id === idProducto)
      ) {
        await postProductToCart(URL_API_CARRITO, producto);
        arrayProductosCarrito = await getAllProducts(URL_API_CARRITO);
      }

      if (producto.cantidad > 1) {
        await putProductToCart(URL_API_CARRITO, idProducto, producto);
      }
    }
  }

  // Permite eliminar productos al array de productos favoritos.
  if (event.target.classList.contains("cancel")) {
    const idProducto = parseInt(event.target.attributes.name.value);
    Swal.fire("Good job!", "Product removed from wish list!", "success");
    const index = arrayIdProductosFavoritos.indexOf(idProducto);
    if (index > -1) {
      arrayIdProductosFavoritos.splice(index, 1);
    }

    // Elimina de la pantalla la card del producto que se eliminó de favoritos.
    event.target.closest(".cardProducto").remove();

    // Actualiza el array de productos favoritos en el LocalStorage.
    localStorage.setItem(
      "arrayIdProductosFavoritos",
      JSON.stringify(arrayIdProductosFavoritos)
    );
  }

  // Redirecciona a la página de productos favoritos o lista deseada.
  if (event.target.classList.contains("wishlistPage")) {
    window.location.href = "../pages/wishlist.html";
  }

  // Redirecciona a la página de cart o carrito.
  if (event.target.classList.contains("cartPage")) {
    window.location.href = "../pages/cart.html";
  }

  // Redirecciona a la página de administrador.
  if (event.target.classList.contains("adminPage")) {
    window.location.href = "../pages/admin.html";
  }
});

// Funcionalidad para que el nav se mantenga fijo en la parte superior de la página.
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header__navTop");
  if (window.pageYOffset > header.offsetTop) {
    header.classList.add("sticky-header");
  } else {
    header.classList.remove("sticky-header");
  }
});

// Escuchador de eventos mouseover para cambiar la imagen cuando se pase el mouse por encima de los productos.
document.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("cardProducto__img")) {
    const producto = arrayProductos.find(
      (producto) => producto.id === parseInt(event.target.id)
    );
    event.target.src = producto.img2;
  }
});

// Escuchador de eventos mouseout para cambiar la imagen cuando se pase el mouse por encima de los productos.
document.addEventListener("mouseout", (event) => {
  if (event.target.classList.contains("cardProducto__img")) {
    const producto = arrayProductos.find(
      (producto) => producto.id === parseInt(event.target.id)
    );
    event.target.src = producto.img;
  }
});

// Funcionalidad que esperar 0.25 segundos antes de pintar la cantidad de productos que están en el carrito así se cambie de página.
setTimeout(() => {
  arrayIdProductosFavoritos.forEach((idProducto) => {
    const producto = arrayProductosCarrito.find((producto) => {
      return producto.id == idProducto;
    });

    if (producto) {
      document.getElementsByName(producto.id)[3].innerHTML = producto.cantidad;
    }
  });
}, 200);
