import {
  getAllProducts,
  printNavButtons,
  printCardsToCart,
  getUser,
  deleteProductFromCart,
  printCompras,
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

const URL_API_ADMIN = "http://localhost:3000/admin";

const URL_API_COMPRAS = "http://localhost:3000/compras";

let arrayProductos = [];
let containerProductos = "";

// Se escucha el evento DOMContentLoaded para que se ejecute la función getAllProducts y se pinte la información en el contenedor de las cards cada vez que se recargue la página.

document.addEventListener("DOMContentLoaded", async () => {
  arrayProductos = await getAllProducts(URL_API);
  const containerNavButtons = document.querySelector(".container__navButtons");
  printNavButtons(botones, containerNavButtons);
});

const formLogin = document.getElementById("formAdmin");
const verCompras = document.getElementById("verCompras");
const verProductos = document.getElementById("verProductos");
const crearPorducto = document.getElementById("crearProducto");
formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Conseguir todos datos de login del formulario.
  const formData = {};
  const inputsNodeList = document.querySelectorAll("input");
  const inputs = Array.from(inputsNodeList);
  inputs.splice(0, 1);

  inputs.forEach((input) => {
    if (input.id) {
      formData[input.id] = input.value;
    }
  });

  const user = formData["user"];
  const password = formData["password"];

  // Conseguir el usuario que se está logueando.
  const usuario = await getUser(URL_API_ADMIN, user, password);

  if (usuario.length) {
    Swal.fire(
      "Bienvenido",
      `${usuario[0].user} has iniciado sesión.`,
      "success"
    ).then(() => {
      sessionStorage.setItem("userId", JSON.stringify(usuario[0].user));
      formLogin.style.display = "none";
      verCompras.style.display = "block";
      verProductos.style.display = "block";
      crearPorducto.style.display = "block";

      // Cambiar el nombre del botón de guardar para más tarde por editar.
      Array.from(document.querySelectorAll(".saveCart")).forEach((tag) => {
        tag.innerHTML = "Editar";
      });
    });
  } else {
    Swal.fire("Oops...", "Usuario o contraseña incorrectos.", "error").then(
      () => {
        formLogin.reset();
      }
    );
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

  // Permite eliminar productos al array de productos en el carrito.
  if (event.target.classList.contains("removeCart")) {
    const idProducto = parseInt(event.target.attributes.name.value);
    console.log(idProducto);
    Swal.fire("Good job!", "Product removed from list of products!", "success");

    await deleteProductFromCart(URL_API, idProducto);
    arrayProductos = await getAllProducts(URL_API);

    // Elimina de la pantalla la card del producto que se eliminó de favoritos.
    event.target.closest(".productRow").remove();
  }

  const containerInfoPay = document.querySelector(".infoPay");
  const containerAdmin = document.querySelector(".containerAdmin");
  const containerCrearProducto = document.querySelector(".formAddProduct");
  const infoCompras = await getAllProducts(URL_API_COMPRAS);
  // Permite pintar los productos que se compraron en la pantalla de administrador.
  if (event.target.classList.contains("verCompras")) {
    document.getElementById("containerProductos").style.display = "table";
    containerInfoPay.style.display = "flex";
    containerCrearProducto.style.display = "none";
    printCompras(infoCompras, containerAdmin, containerInfoPay);
  }

  // Permite pintar los productos que hay en la API en la pantalla de administrador.
  if (event.target.classList.contains("verProductos")) {
    document.getElementById("containerProductos").style.display = "table";
    containerInfoPay.style.display = "none";
    containerCrearProducto.style.display = "none";
    printCardsToCart(arrayProductos, containerAdmin);
  }

  // Permite pintar los productos que hay en la API en la pantalla de administrador.
  if (event.target.classList.contains("crearProducto")) {
    document.getElementById("containerProductos").style.display = "none";
    containerInfoPay.style.display = "none";
    containerCrearProducto.style.display = "block";
  }
});
