// Importo las funciones que necesito desde services

import {
  getAllProducts,
  printCards,
  printNavButtons,
  searchProduct,
  postProductToCart,
  deleteProductFromCart,
  putProductToCart,
  printCardsToCartIcono,
  totalPriceIndexToCart,
} from "../services/funciones.js";

// Se realiza la activación del servidor local con el JSON-server y el archivo db.json

const URL_API = "http://localhost:3000/productos";

// Url del endpoint de la API de productos en el carrito.
const URL_API_CARRITO = "http://localhost:3000/carrito";

// Creo el array donde capturaré la información que consigo del servidor local y capturo el contenedor donde pintaré todas las cards de los productos.
let arrayProductos = [];
let containerProductos = "";
const arrayIdProductosFavoritos =
  JSON.parse(localStorage.getItem("arrayIdProductosFavoritos")) || [];

let arrayProductosCarrito = [];

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

// Escuchador de eventos mouseover para cambiar la imagen cuando se pase el mouse por encima de los productos.
document.addEventListener("mouseover", async (event) => {
  if (event.target.classList.contains("cardProducto__img")) {
    const producto = arrayProductos.find(
      (producto) => producto.id === parseInt(event.target.id)
    );
    event.target.src = producto.img2;
  }

  if (event.target.classList.contains("cardProductoCart__img")) {
    const producto = arrayProductos.find(
      (producto) => producto.id === parseInt(event.target.id)
    );
    event.target.src = producto.img2;
  }

  // Muestra los productos en un contenedor cuando se está pasando sobre el carrito.
  if (event.target.classList.contains("cartPage")) {
    const dropdownContent =
      document.getElementsByClassName("dropdown-content")[0];
    dropdownContent.classList.add("dropdown-content-active");

    setTimeout(() => {
      dropdownContent.classList.remove("dropdown-content-active");
    }, 2000);
  }

  // Muestra los iconos de ver producto, añadir a favoritos de la card de cada producto cuando se pase el mouse por encima de los productos.
  if (event.target.classList.contains("cardProducto__img")) {
    event.target.nextElementSibling.classList.add(
      "cardProducto__iconos--active"
    );
  }
});

// Escuchador de eventos mouseout para cambiar la imagen cuando se pase el mouse por encima de los productos.
document.addEventListener("mouseout", (event) => {
  if (event.target.classList.contains("cardProducto__img")) {
    const producto = arrayProductos.find(
      (producto) => producto.id === parseInt(event.target.id)
    );
    event.target.src = producto.img;

    // Esconde los iconos de ver producto, añadir a favoritos de la card de cada producto cuando se quita el mouse sobre los productos.
    event.target.nextElementSibling.classList.remove(
      "cardProducto__iconos--active"
    );
  }

  if (event.target.classList.contains("cardProductoCart__img")) {
    const producto = arrayProductos.find(
      (producto) => producto.id === parseInt(event.target.id)
    );
    event.target.src = producto.img;
  }
});

// Se escucha el evento DOMContentLoaded para que se ejecute la función getAllProducts y se pinte la información en el contenedor de las cards cada vez que se recargue la página.
document.addEventListener("DOMContentLoaded", async () => {
  arrayProductos = await getAllProducts(URL_API);
  arrayProductosCarrito = await getAllProducts(URL_API_CARRITO);

  containerProductos = document.querySelector(".containerProductos");
  const containerNavButtons = document.querySelector(".container__navButtons");

  printCards(arrayProductos, containerProductos);
  printNavButtons(botones, containerNavButtons);

  const contenedorProductosCart = document.getElementsByClassName(
    "container__productsToCartIcono"
  )[0];
  const totalPrice = document.getElementsByClassName(
    "dropdown-content--priceToPay"
  )[0];

  const totalPay = totalPriceIndexToCart(arrayProductosCarrito);
  totalPrice.innerHTML = totalPay.toLocaleString();

  printCardsToCartIcono(arrayProductosCarrito, contenedorProductosCart);
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
        const contenedorProductosCart = document.getElementsByClassName(
          "container__productsToCartIcono"
        );
        printCardsToCartIcono(arrayProductosCarrito, contenedorProductosCart);
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
        const contenedorProductosCart = document.getElementsByClassName(
          "container__productsToCartIcono"
        );
        printCardsToCartIcono(arrayProductosCarrito, contenedorProductosCart);
      }

      if (producto.cantidad > 1) {
        await putProductToCart(URL_API_CARRITO, idProducto, producto);
      }
    }
  }

  // Permite añadir productos al array de productos favoritos.
  if (event.target.classList.contains("wishlist")) {
    event.target.classList.toggle("wishlist--active");
    const idProducto = parseInt(event.target.attributes.name.value);
    if (
      event.target.classList.contains("wishlist--active") &&
      !arrayIdProductosFavoritos.includes(idProducto)
    ) {
      Swal.fire("Good job!", "Product added to wish list!", "success");
      arrayIdProductosFavoritos.push(idProducto);
      localStorage.setItem(
        "arrayIdProductosFavoritos",
        JSON.stringify(arrayIdProductosFavoritos)
      );
    } else {
      Swal.fire("Good job!", "Product removed from wish list!", "success");
      const idProducto = parseInt(event.target.attributes.name.value);
      const index = arrayIdProductosFavoritos.indexOf(idProducto);
      if (index > -1) {
        arrayIdProductosFavoritos.splice(index, 1);
      }
      localStorage.setItem(
        "arrayIdProductosFavoritos",
        JSON.stringify(arrayIdProductosFavoritos)
      );
    }
  }

  // Redirecciona a la página de productos favoritos o lista deseada.
  if (event.target.classList.contains("wishlistPage")) {
    window.location.href = "../pages/wishlist.html";
  }

  // Redirecciona a la página de cart o carrito.
  if (event.target.classList.contains("cartPage")) {
    window.location.href = "../pages/cart.html";
  }

  // Redirecciona a la página de cart o carrito.
  if (event.target.classList.contains("viewCart")) {
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

// Funcionalidad que esperar 0.25 segundos antes de pintar los corazones de los productos que están en favoritos así se cambie de página.
setTimeout(() => {
  if (arrayIdProductosFavoritos !== null) {
    arrayIdProductosFavoritos.forEach((idProducto) => {
      document
        .querySelector(`svg[name="${idProducto}"`)
        .classList.add("wishlist--active");
    });
  }

  // Funcionalidad que esperar 0.25 segundos antes de pintar la cantidad de productos que están en el carrito así se cambie de página.
  arrayProductosCarrito.forEach((producto) => {
    document.getElementsByName(producto.id)[3].innerHTML = producto.cantidad;
  });
}, 250);
