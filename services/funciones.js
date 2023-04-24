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

// Creo una función que me permita pintar las cards de los productos en el contenedor que le indique.
export const printCards = (productos, container) => {
  container.innerHTML = "";
  productos.forEach((producto) => {
    container.innerHTML += `
      <aside class="cardProducto flex-grow-1 d-flex flex-column align-items-center">
        <figure class="cardProducto__figure">
          <span class="material-symbols-outlined cancel" name="${producto.id}">cancel</span>
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
                <a href="" class="notifi-wishlist iconos" tabindex="0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart iconos wishlist" id="wishlist" name="${producto.id}"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
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
