import {
  getAllProducts,
  printNavButtons,
  printCardsToCart,
  postProductToCart,
  deleteProductFromCart,
  putProductToCart,
  totalPriceToCart,
  putBuyInPurchases,
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

// Url del endpoint de la API de las compras.
const URL_API_COMPRAS = "http://localhost:3000/compras";

let arrayProductos = [];
let containerProductosCarrito = "";
let arrayProductosCarrito = [];

// Se escucha el evento DOMContentLoaded para que se ejecute la función getAllProducts y se pinte la información en el contenedor de las cards cada vez que se recargue la página.

document.addEventListener("DOMContentLoaded", async () => {
  // Conseguir todos los productos de la API.
  arrayProductos = await getAllProducts(URL_API);

  // Conseguir todos los productos que hay en el carrito de la API.
  arrayProductosCarrito = await getAllProducts(URL_API_CARRITO);

  const containerNavButtons = document.querySelector(".container__navButtons");
  printNavButtons(botones, containerNavButtons);

  // Pintar los productos que se han añadido al carrito.
  containerProductosCarrito = document.querySelector(
    ".container__productsToCart"
  );

  printCardsToCart(arrayProductosCarrito, containerProductosCarrito);
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

// Funcionalidad para que el nav se mantenga fijo en la parte superior de la página.
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header__navTop");
  if (window.pageYOffset > header.offsetTop) {
    header.classList.add("sticky-header");
  } else {
    header.classList.remove("sticky-header");
  }
});

// Se capturan los eventos clic de toda la página y con condicionales if se ejecutan las funciones que correspondan.
document.addEventListener("click", async (event) => {
  // Redirecciona a la página principal si se da clic en el logo o en el home.
  if (event.target.classList.contains("pagePpal")) {
    window.location.href = "../index.html";
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
        totalPriceToCart(arrayProductosCarrito);
      }

      if (producto.cantidad >= 1) {
        await putProductToCart(URL_API_CARRITO, idProducto, producto);
        totalPriceToCart(arrayProductosCarrito);
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
        totalPriceToCart(arrayProductosCarrito);
      }

      if (producto.cantidad > 1) {
        await putProductToCart(URL_API_CARRITO, idProducto, producto);
        totalPriceToCart(arrayProductosCarrito);
      }
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

  // Redirecciona a la página principal.
  if (event.target.classList.contains("returnToShopping")) {
    window.location.href = "../index.html";
  }

  // Redirecciona a la página de administrador.
  if (event.target.classList.contains("adminPage")) {
    window.location.href = "../pages/admin.html";
  }

  // Funcionalidad para que el formulario de checkout se muestre.
  if (event.target.classList.contains("mainButtonCheckout")) {
    formulario.style.display = "block";
    closestForm[0].style.visibility = "hidden";
    closestForm[1].style.visibility = "hidden";
    closestForm[2].style.visibility = "hidden";
    closestForm[3].style.visibility = "hidden";
  }

  // Funcionalidad para que el formulario de checkout se oculte.
  if (event.target.classList.contains("closeForm")) {
    closestForm[0].style.visibility = "visible";
    closestForm[1].style.visibility = "visible";
    closestForm[2].style.visibility = "visible";
    closestForm[3].style.visibility = "visible";
    formulario.style.display = "none";
  }

  // Permite eliminar productos al array de productos en el carrito.
  if (event.target.classList.contains("removeCart")) {
    const idProducto = parseInt(event.target.attributes.name.value);
    Swal.fire("Good job!", "Product removed from cart!", "success");

    await deleteProductFromCart(URL_API_CARRITO, idProducto);
    arrayProductosCarrito = await getAllProducts(URL_API_CARRITO);

    // Elimina de la pantalla la card del producto que se eliminó de favoritos.
    event.target.closest(".productRow").remove();
    totalPriceToCart(arrayProductosCarrito);
  }
});

const formulario = document.getElementById("formCart");
const closestForm = document.getElementsByClassName("closestForm");

formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  // Pasos para que solo se muestre el formulario de la compra.
  closestForm[0].style.visibility = "visible";
  closestForm[1].style.visibility = "visible";
  closestForm[2].style.visibility = "visible";
  closestForm[3].style.visibility = "visible";
  formulario.style.display = "none";

  // Actualización de la base de datos en la API con la compra realizada.
  const inputsNodeList = document.querySelectorAll("input");
  const inputs = Array.from(inputsNodeList);
  inputs.splice(0, 2);

  const formData = {};

  inputs.forEach((input) => {
    if (input.id) {
      formData[input.id] = input.value;
    }
  });

  formData["productsToBuy"] = arrayProductosCarrito;
  formData["subtotal"] = document.getElementById("subTotalPay").innerText;
  formData["shipping"] = document.getElementById("shippingPay").innerText;
  formData["totalPay"] = document.getElementById("totalPay").innerText;

  putBuyInPurchases(URL_API_COMPRAS, formData);

  window.location.href = "../index.html";
});

// Funcionalidad que esperar 0.25 segundos antes de pintar la cantidad de productos que están en el carrito así se cambie de página.
setTimeout(() => {
  arrayProductosCarrito.forEach((producto) => {
    document.getElementsByName(producto.id)[2].innerHTML = producto.cantidad;
  });

  totalPriceToCart(arrayProductosCarrito);
}, 200);
