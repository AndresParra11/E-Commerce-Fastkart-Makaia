// Creo una función GET que me va a permitir pedir toda la información de todos los productos que hay en el servidor. Mediante async/await y fetch.

export const getAllProducts = async (url) => {
  //Método GET
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("WARN", response.status);
  }
  const data = await response.json();
  return data;
};

// Creo una función con el verbo POST para añadir un endpoint de los productos en el carrito al servidor. Mediante async/await y fetch.

export const postProductToCart = async (urlEndPoint, productos) => {
  try {
    const response = await fetch(urlEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productos),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Creo una función con el verbo DELETE para eliminar un recurso de un endpoint específico del servidor. Mediante async/await y fetch. En este caso el producto del carrito.

export const deleteProductFromCart = async (urlEndPoint, productoId) => {
  try {
    const response = await fetch(`${urlEndPoint}/${productoId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Creo un a función con el verbo PUT para modificar un recurso de un endpoint específico del servidor. Mediante async/await y fetch. En este caso el producto del carrito.
export const putProductToCart = async (urlEndPoint, productoId, product) => {
  try {
    const response = await fetch(`${urlEndPoint}/${productoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const data = await response.json();
  } catch (error) {
    console.error(error);
  }
};

// Creo un a función con el verbo PUT para modificar un recurso de un endpoint específico del servidor. Mediante async/await y fetch. En este caso el producto del carrito.
export const putBuyInPurchases = async (urlEndPoint, purchase) => {
  try {
    const response = await fetch(urlEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchase),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Creo una función que me permita pintar las cards de los productos en el contenedor que le indique.
export const printCards = (productos, container) => {
  container.innerHTML = "";
  productos.forEach((producto) => {
    container.innerHTML += `
      <aside class="cardProducto flex-grow-1 d-flex flex-column align-items-center">
        <figure class="cardProducto__figure">
          <span class="material-symbols-outlined cancel" name="${
            producto.id
          }">cancel</span>
          <img id="${producto.id}" class="cardProducto__img" src=${
      producto.img
    } />
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
                <a href="" class="notifi-wishlist iconos" tabindex="0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart iconos wishlist" id="wishlist" name="${
                    producto.id
                  }"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </a>
              </li>
            </ul>
          </div>

        </figure>
        <h4 class="cardProducto__nombre fs-6 m-0 pb-2 fw-bold align-self-start ps-2">${
          producto.nombre
        }</h4>
        <h3 class="cardProducto__precio fs-5 m-0 text-success align-self-start ps-2">$ ${producto.precio.toLocaleString()}</h3>
        <ul class="m-0 p-0 ps-2 d-flex w-100 justify-content-start">
          <span class="estrella">★</span>
          <span class="estrella">★</span>
          <span class="estrella">★</span>
          <span class="estrella">★</span>
          <span class="estrella">★</span>
        </ul>
        <div class="container d-flex flex-row justify-content-between align-items-center btn-add-cart">
          <span class="material-symbols-outlined cardProducto__span remove" name="${
            producto.id
          }">remove</span>
          <button class="btn d-flex aling-items-center" name="${
            producto.id
          }">0</button>
          <span class="material-symbols-outlined cardProducto__span add" name="${
            producto.id
          }">add</span>
        </div>
      </aside>`;
  });
};

// Creo una función que me permita pintar las cards del array de los productos en el carrito en el contenedor que le indique.
export const printCardsToCart = (productos, container) => {
  container.innerHTML = "";
  productos.forEach((producto) => {
    container.innerHTML += `
    <tr class="d-flex aling-items-center productRow">
      <th class="d-flex justify-content-center aling-items-center px-3" scope="row">
        <figure class="cardProducto__figure">
          <img id="${producto.id}" class="cardProducto__img" src=${
      producto.img
    } />
        </figure>
      </th>
      <td class="d-flex flex-grow-1 justify-content-center px-3">
        <div class="d-flex flex-column justify-content-center container__info">
          <h4 class="cardProducto__nombre m-0 mb-3 align-self-start">${
            producto.nombre
          }</h4>
          <h5 class="productSeller mb-1">Sold By: <span class="productSeller--span">Fresho</span></h5>
          <h5 class="productQuantity">Quantity: <span class="productQuantity--info">${
            producto.informacion
          }</span></h5>
        </div>
      </td>
      <td class="flex-grow-1 d-flex flex-column px-3">
        <h4 class="titles pt-3 mb-3">Price</h4>
        <h3 class="cardProducto__precio m-0 text-success align-self-start" name="${
          producto.id
        }">$ ${producto.precio.toLocaleString()}</h3>
      </td>
      <td class="flex-grow-1 px-3 esconderAdmin">
        <h4 class="titles pt-3 mb-3">Qty</h4>
        <div
        class="d-flex flex-row justify-content-between align-items-center btn-add-cart"
        >
          <span
          class="material-symbols-outlined cardProducto__span remove"
          name="${producto.id}"
          >remove</span
          >
          <button class="btn d-flex aling-items-center" name="${
            producto.id
          }">0</button>
          <span
          class="material-symbols-outlined cardProducto__span add"
          name="${producto.id}"
          >add</span
          >
        </div>
      </td>
      <td class="flex-grow-1 px-3 esconderAdmin">
        <h5 class="titles pt-3 mb-3">Total</h5>
        <h5 class="totalPrice" name="${producto.id}"></h5>
      </td>
      <td class="flex-grow-1 d-flex flex-column px-3">
        <h5 class="titles pt-3 mb-3">Action</h5>
        <p class="saveCart mb-0">Save for later</p>
        <p class="removeCart" name="${producto.id}">Remove</p>
      </td>
    </tr>
        `;
  });
};

// Creo una función que me permita pintar los botones del nav en el contenedor que le indique.
export const printNavButtons = (botones, container) => {
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
export const searchProduct = async (inputSearch, url) => {
  const valueSearch = inputSearch.value;
  const arrayProductos = await getAllProducts(url);

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

// Se crea una función para calcular el valor total por producto en la págnia de cart.
export const totalPriceToCart = (arrayProductsToCart) => {
  let suma = 0;
  arrayProductsToCart.forEach((producto) => {
    const priceForUnit = producto.precio;
    const quantity = parseFloat(
      document.getElementsByName(producto.id)[2].innerText
    );

    const total = priceForUnit * quantity;
    document.getElementsByName(
      producto.id
    )[4].innerHTML = `$ ${total.toLocaleString()}`;
    suma += total;
  });
  document.getElementsByClassName(
    "subtotalCart"
  )[0].innerHTML = `$ ${suma.toLocaleString()}`;

  const shipping = parseFloat(
    document.getElementsByClassName("shipping")[0].innerText.substring(2)
  );

  const totalPay = suma + shipping;
  document.getElementsByClassName(
    "main__totalPay"
  )[0].innerHTML = `$ ${totalPay.toLocaleString()}`;
};

// Se crea una función para getUser.
export const getUser = async (urlEndPoint, user, password) => {
  try {
    const url = `${urlEndPoint}?user=${user}&password=${password}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Se crea una función para pintar las compras que se han realizado.
export const printCompras = async (infoCompras, container, container2) => {
  container.innerHTML = "";
  container2.innerHTML = "";
  infoCompras.forEach((compra) => {
    compra.productsToBuy.forEach((producto) => {
      container.innerHTML += `
      <tr class="d-flex aling-items-center productRow">
        <th class="d-flex justify-content-center aling-items-center px-3" scope="row">
          <figure class="cardProducto__figure">
            <img id="${producto.id}" class="cardProducto__img" src=${
        producto.img
      } />
          </figure>
        </th>
        <td class="d-flex flex-grow-1 justify-content-center px-3">
          <div class="d-flex flex-column justify-content-center container__info">
            <h4 class="cardProducto__nombre m-0 mb-3 align-self-start">${
              producto.nombre
            }</h4>
            <h5 class="productSeller mb-1">Buy By: <span class="productSeller--span">${
              compra.name
            }</span></h5>
            <h5 class="productQuantity">Cantidad: <span class="productQuantity--info">${
              producto.cantidad
            }</span></h5>
          </div>
        </td>
        <td class="flex-grow-1 d-flex flex-column px-3">
          <h4 class="titles pt-3 mb-3">Price</h4>
          <h3 class="cardProducto__precio m-0 text-success align-self-start" name="${
            producto.id
          }">$ ${producto.precio.toLocaleString()}</h3>
        </td>
        <td class="flex-grow-1 px-3 esconderAdmin">
          <h4 class="titles pt-3 mb-3">Qty</h4>
          <div
          class="d-flex flex-row justify-content-between align-items-center btn-add-cart"
          >
            <span
            class="material-symbols-outlined cardProducto__span remove"
            name="${producto.id}"
            >remove</span
            >
            <button class="btn d-flex aling-items-center" name="${
              producto.id
            }">0</button>
            <span
            class="material-symbols-outlined cardProducto__span add"
            name="${producto.id}"
            >add</span
            >
          </div>
        </td>
        <td class="flex-grow-1 px-3 esconderAdmin">
          <h5 class="titles pt-3 mb-3">Total</h5>
          <h5 class="totalPrice" name="${producto.id}"></h5>
        </td>
        <td class="flex-grow-1 d-flex flex-column px-3">
          <h5 class="titles pt-3 mb-3">Action</h5>
          <p class="saveCart mb-0">Save for later</p>
          <p class="removeCart" name="${producto.id}">Remove</p>
        </td>
      </tr>
          `;
    });
    container2.innerHTML += `
      <div class="container d-flex flex-column my-4 py-2 container__infoPago">
        <h5 class="informacionPago">El subtotal a pagar por ${compra.name} es: <span class="cantidadPagar">${compra.subtotal}.</span></h5>
        <h5 class="informacionPago">El shipping a pagar por ${compra.name} es: <span class="cantidadPagar">${compra.shipping}.</span></h5>
        <h5 class="informacionPago">El total a pagar por ${compra.name} es: <span class="cantidadPagar">${compra.totalPay}.</span></h5>
        <h5 class="informacionPago">La dirección de cobro de ${compra.name} es: ${compra.address} y el teléfono de contacto es ${compra.phone}</h5>
      </div>`;
  });
};

// Creo una función que me permita pintar las cards del array de los productos en el carrito en el contenedor que le indique que sale cuando se pasa el mouse por encima del icono del carrito.
export const printCardsToCartIcono = (productos, container) => {
  container.innerHTML = "";
  productos.forEach((producto) => {
    container.innerHTML += `
    <tr class="d-flex aling-items-center productRow dropdown-content-active">
      <th class="d-flex justify-content-center aling-items-center px-3 dropdown-content-active" scope="row">
        <figure class="cardProductoCart__figure dropdown-content-active">
          <img id="${
            producto.id
          }" class="cardProductoCart__img dropdown-content-active" src=${
      producto.img
    } />
        </figure>
      </th>
      <td class="d-flex flex-grow-1 justify-content-between px-3 dropdown-content-active">
        <div class="d-flex flex-column justify-content-center container__info dropdown-content-active">
          <h4 class="cardProductoCart__nombre m-0 mb-1 align-self-start dropdown-content-active">${
            producto.nombre
          }</h4>
          <h5 class="productQuantityCart dropdown-content-active">${
            producto.cantidad
          } x ${producto.precio.toLocaleString()}</h5>
        </div>
      </td>
    </tr>
    `;
  });
};

// Se crea una función para calcular el valor total por producto en la págnia de cart.
export const totalPriceIndexToCart = (arrayProductsToCart) => {
  let suma = 0;
  arrayProductsToCart.forEach((producto) => {
    const priceForUnit = producto.precio;
    const quantity = parseFloat(producto.cantidad);

    const total = priceForUnit * quantity;
    suma += total;
  });
  return suma;
};
