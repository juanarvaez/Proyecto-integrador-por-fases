/* =========================================================================
   TIENDA DE PRODUCTOS - VERSIÓN 1: CATÁLOGO DINÁMICO
   Temas aplicados: variables y tipos de datos, arrays de objetos,
   ciclo for, condicionales, operador ternario, funciones, DOM y eventos.
   ========================================================================= */


/* =========================================================================
   1. VARIABLES Y TIPOS DE DATOS (nuestra "base de datos" simulada)
   ========================================================================= */
const manzana   = { id: 1, nombre: "manzana", categoria: "fruta",   precio: 20.5,  stock: 8,  icono: "images/manzana.jpg" };
const pina      = { id: 2, nombre: "pina",         categoria: "fruta",   precio: 15.35, stock: 5,  icono: "images/pina.jpg" };
const pera      = { id: 3, nombre: "pera",         categoria: "fruta",   precio: 5.45,  stock: 12, icono: "images/pera.jpg" };
const melon     = { id: 4, nombre: "melon",        categoria: "fruta",   precio: 6.15,  stock: 3,  icono: "images/melon.jpg" };
const zanahoria = { id: 5, nombre: "zanahoria",    categoria: "verdura", precio: 3.2,   stock: 14, icono: "images/zanahoria.jpg" };
const tomate    = { id: 6, nombre: "tomate",       categoria: "verdura", precio: 4.75,  stock: 0,  icono: "images/tomate.jpg" };
const jugo      = { id: 7, nombre: "jugo", categoria: "bebida",  precio: 12.0,  stock: 6,  icono: "images/jugo.jpg" };
const cocoAgua  = { id: 8, nombre: "aguaCoco", categoria: "bebida",  precio: 8.9,   stock: 4,  icono: "images/aguaCoco.jpg" };
const platano   = { id: 9,  nombre: "plátano",     categoria: "fruta",   precio: 18.0,  stock: 20, icono: "images/platano.jpg" };
const uva       = { id: 10, nombre: "uva",         categoria: "fruta",   precio: 35.5,  stock: 15, icono: "images/uva.jpg" };
const sandia    = { id: 11, nombre: "sandía",      categoria: "fruta",   precio: 25.0,  stock: 7,  icono: "images/sandia.jpg" };
const mango     = { id: 12, nombre: "mango",       categoria: "fruta",   precio: 22.3,  stock: 10, icono: "images/mango.jpg" };
const fresa     = { id: 13, nombre: "fresa",       categoria: "fruta",   precio: 45.0,  stock: 0,  icono: "images/fresa.jpg" };
const lechuga   = { id: 14, nombre: "lechuga",     categoria: "verdura", precio: 12.5,  stock: 18, icono: "images/lechuga.jpg" };
const cebolla   = { id: 15, nombre: "cebolla",     categoria: "verdura", precio: 9.8,   stock: 30, icono: "images/cebolla.jpg" };
const pepino    = { id: 16, nombre: "pepino",      categoria: "verdura", precio: 14.2,  stock: 2,  icono: "images/pepino.jpg" };
const brocoli   = { id: 17, nombre: "brócoli",     categoria: "verdura", precio: 19.9,  stock: 12, icono: "images/brocoli.jpg" };
const limonada  = { id: 18, nombre: "limonada",    categoria: "bebida",  precio: 15.0,  stock: 20, icono: "images/limonada.jpg" };
const teHelado  = { id: 19, nombre: "té helado",   categoria: "bebida",  precio: 18.5,  stock: 14, icono: "images/te.jpg" };
const agua      = { id: 20, nombre: "agua pura",   categoria: "bebida",  precio: 10.0,  stock: 50, icono: "images/agua.jpg" };


// Array que contiene todos los objetos del inventario
const inventarioProductos = [
    manzana, pina, pera, melon, zanahoria, tomate, jugo, cocoAgua,
    platano, uva, sandia, mango, fresa, lechuga, cebolla, pepino, 
    brocoli, limonada, teHelado, agua
];

// Reglas de negocio: valores fijos, por eso son constantes en MAYÚSCULAS.
const COSTO_ENVIO = 8;
const MINIMO_ENVIO_GRATIS = 60;
const MINIMO_CUPON_MITAD = 100;

// Estado de la aplicación: usamos 'let' porque estos valores SÍ cambian.
let carrito = [];               // Array de objetos {id, nombre, precio, icono, cantidad}
let porcentajeDescuento = 0;    // Number: 0, 0.10 o 0.50
let envioGratisPorCupon = false;// Boolean
let categoriaActual = "todos";  // String: filtro activo del catálogo
let temaOscuro = false;         // Boolean: controla la clase del <body>
let numeroPedido = 1000;        // Number: contador de pedidos confirmados
let temporizadorMensaje = null; // Guarda el setTimeout activo del mensaje



/* =========================================================================
   2. SELECCIÓN DEL DOM
   ========================================================================= */
const contenedorProductos = document.getElementById("lista-productos");

const contenedorCarrito   = document.getElementById("items-carrito");
const contadorCarrito     = document.getElementById("contador-carrito");
const textoSubtotal = document.getElementById("texto-subtotal");
const textoEnvio    = document.getElementById("texto-envio");
const textoTotal    = document.getElementById("texto-total");

const mensajeSistema = document.getElementById("mensaje-sistema");

const textoDescuento = document.getElementById("texto-descuento");
const lineaDescuento = document.getElementById("linea-descuento");
const inputDescuento  = document.getElementById("input-descuento");
const btnDescuento    = document.getElementById("btn-aplicar-descuento");
const selectCategoria = document.getElementById("filtro-categoria");

const formCompra  = document.getElementById("form-compra");
const inputNombre = document.getElementById("input-nombre");
const inputCorreo = document.getElementById("input-correo");

const panelBoleta    = document.getElementById("panel-boleta");
const avisoConexion  = document.getElementById("aviso-conexion");
const btnTema        = document.getElementById("btn-tema");



/* =========================================================================
   3. FUNCIONES AUXILIARES
   ========================================================================= */

// ---> Función flecha: convierte un número en texto de precio.
// toFixed(2) obliga a mostrar siempre dos decimales.
const formatearPrecio = (valor) => {
    return `$${valor.toFixed(2)}`;
};

// ---> Función declarativa: busca un producto por su id usando un ciclo for.
function buscarProductoPorId(idProducto) {
    for (let i = 0; i < inventarioProductos.length; i++) {
        if (inventarioProductos[i].id === idProducto) {
            return inventarioProductos[i]; // return corta el ciclo y sale
        }
    }
    return null; // null = valor vacío intencional
}




// ---> Busca una línea dentro del carrito
function buscarItemEnCarrito(idProducto) {
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === idProducto) {
            return carrito[i];
        }
    }
    return null;
}

// ---> Devuelve un carrito NUEVO sin el producto indicado.
// Así evitamos borrar elementos "a la fuerza": construimos otra lista.
const carritoSinProducto = (idProducto) => {
    const nuevoCarrito = [];
    carrito.forEach((item) => {
        if (item.id !== idProducto) {
            nuevoCarrito.push(item);
        }
    });
    return nuevoCarrito;
};

// ---> Cuenta cuántas unidades hay en total en el carrito
const contarUnidades = () => {
    let unidades = 0;
    carrito.forEach((item) => {
        unidades = unidades + item.cantidad;
    });
    return unidades;
};

// ---> Función flecha: calcula subtotal, descuento, envío y total.
// Devuelve un Objeto con los cuatro valores para no repetir cuentas.
const calcularTotales = () => {
    let subtotal = 0;

    // forEach: recorre el carrito ejecutando una acción por cada elemento
    carrito.forEach((item) => {
        subtotal = subtotal + (item.precio * item.cantidad);
    });

    const descuento = subtotal * porcentajeDescuento;

    // Condicional múltiple: el envío depende de tres reglas distintas
    let envio = COSTO_ENVIO;
    if (carrito.length === 0) {
        envio = 0;
    } else if (envioGratisPorCupon === true) {
        envio = 0;
    } else if (subtotal - descuento >= MINIMO_ENVIO_GRATIS) {
        envio = 0;
    }

    const total = subtotal - descuento + envio;

    return {
        subtotal: subtotal,
        descuento: descuento,
        envio: envio,
        total: total
    };
};





// ---> Función declarativa: escribe los totales en el panel derecho.
function renderizarResumen() {
    const totales = calcularTotales();

    textoSubtotal.textContent = formatearPrecio(totales.subtotal);
    textoTotal.textContent = formatearPrecio(totales.total);
    contadorCarrito.textContent = contarUnidades();

    // Condicional doble: la línea de descuento solo aparece si hay descuento
    if (totales.descuento > 0) {
        textoDescuento.textContent = `- ${formatearPrecio(totales.descuento)}`;
        lineaDescuento.classList.remove("oculto");
    } else {
        lineaDescuento.classList.add("oculto");
    }

    // Operador ternario para el texto del envío
    textoEnvio.textContent = (totales.envio === 0) ? "Gratis" : formatearPrecio(totales.envio);
}









/* =========================================================================
   4. DIBUJAR EL CATÁLOGO
   ========================================================================= */
function renderizarProductos() {

    // Ciclo WHILE: mientras el contenedor tenga hijos, los va eliminando.
    // Es la forma de "limpiar" la zona antes de volver a dibujarla.
    while (contenedorProductos.firstChild) {
        contenedorProductos.removeChild(contenedorProductos.firstChild);
    }

    // Ciclo FOR: recorre el inventario producto por producto
    for (let i = 0; i < inventarioProductos.length; i++) {
        const producto = inventarioProductos[i];

        // Filtro por categoría: "todos" muestra todo; si no, comparamos
        const coincideFiltro = (categoriaActual === "todos" || producto.categoria === categoriaActual);

        if (coincideFiltro) {

            // Creamos la etiqueta desde cero y le ponemos su clase CSS
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("tarjeta");

            // Condicional múltiple: tres estados posibles de inventario
            let textoStock = "";
            if (producto.stock === 0) {
                textoStock = "Agotado";
                tarjeta.classList.add("agotada");
            } else if (producto.stock <= 3) {
                textoStock = `¡Últimas ${producto.stock} unidades!`;
                tarjeta.classList.add("poco-stock");
            } else {
                textoStock = `Disponibles: ${producto.stock}`;
            }


            // NUEVO EN LA V2: avisamos cuántas unidades ya lleva el usuario
            const itemEnCarrito = buscarItemEnCarrito(producto.id);
            const textoEnCarrito = (itemEnCarrito === null) ? "" : `Ya llevas ${itemEnCarrito.cantidad} en el carrito`;



            // Plantillas literales para armar el HTML interno de la tarjeta
            tarjeta.innerHTML = 
            `
                <span class="icono-producto"><img src="${producto.icono}" alt="${producto.nombre}" style="width: 100%; height: auto;"></span>
                <h3 class="nombre-producto">${producto.nombre}</h3>
                <p class="etiqueta-categoria">${producto.categoria}</p>
                <p class="precio-producto">${formatearPrecio(producto.precio)}</p>
                <p class="estado-stock">${textoStock}</p>
                <p class="mini-dato">${textoEnCarrito}</p>
            `;

            // El botón se crea aparte para poder escucharlo con addEventListener
            const botonComprar = document.createElement("button");
            botonComprar.classList.add("boton");
            botonComprar.classList.add("boton-bloque");

            // Operador ternario para decidir el texto del botón
            //botonComprar.textContent = (producto.stock === 0) ? "Sin existencias" : "Comprar";

            if (producto.stock === 0) {
                botonComprar.textContent = "Sin existencias";
                botonComprar.disabled = true;
            } else {
                botonComprar.textContent = "Agregar al carrito";
                botonComprar.addEventListener("click", () => {
                    agregarAlCarrito(producto.id);
                });
            }

            tarjeta.appendChild(botonComprar);
            contenedorProductos.appendChild(tarjeta);
        }
    }
}


/* =========================================================================
   5. LÓGICA DE COMPRA
   ========================================================================= */

// ---> Agrega una unidad al carrito y la descuenta del inventario
const agregarAlCarrito = (idProducto) => {
    const producto = buscarProductoPorId(idProducto);

    if (producto.stock > 0) {
        const item = buscarItemEnCarrito(idProducto);

        if (item === null) {
            // Todavía no está en el carrito: creamos su línea
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                icono: producto.icono,
                cantidad: 1
            });
        } else {
            // Ya estaba: solo sumamos una unidad a esa línea
            item.cantidad++;
        }

        producto.stock--;
        mostrarMensaje(`${producto.nombre} agregado al carrito`, "exito");
        actualizarPantalla();
    } else {
        mostrarMensaje(`No queda inventario de ${producto.nombre}`, "error");
    }
};

// ---> Suma o resta una unidad de una línea. 'cambio' vale 1 o -1.
function cambiarCantidad(idProducto, cambio) {
    const item = buscarItemEnCarrito(idProducto);
    const producto = buscarProductoPorId(idProducto);

    if (cambio === 1) {
        if (producto.stock > 0) {
            item.cantidad++;
            producto.stock--;
        } else {
            mostrarMensaje(`No hay más unidades de ${producto.nombre}`, "error");
        }
    } else {
        item.cantidad--;
        producto.stock++; // la unidad regresa al inventario

        // Si la línea llegó a cero, la sacamos del carrito
        if (item.cantidad === 0) {
            carrito = carritoSinProducto(idProducto);
        }
    }

    actualizarPantalla();
}

// ---> Elimina la línea completa y devuelve todo su inventario
function quitarDelCarrito(idProducto) {
    const item = buscarItemEnCarrito(idProducto);
    const producto = buscarProductoPorId(idProducto);

    producto.stock = producto.stock + item.cantidad;
    carrito = carritoSinProducto(idProducto);

    mostrarMensaje(`${producto.nombre} se quitó del carrito`, "error");
    actualizarPantalla();
}



/* =========================================================================
   6. DIBUJAR EL CARRITO Y EL RESUMEN
   ========================================================================= */

// ---> Función expresiva: se guarda dentro de una constante
const renderizarCarrito = function () {

    // Ciclo WHILE para limpiar el panel antes de volver a dibujarlo
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

    if (carrito.length === 0) {
        const vacio = document.createElement("p");
        vacio.classList.add("carrito-vacio");
        vacio.textContent = "Tu carrito está vacío. Agrega productos del catálogo.";
        contenedorCarrito.appendChild(vacio);
        return; // salimos: no hay nada más que dibujar
    }

    carrito.forEach((item) => {
        const linea = document.createElement("div");
        linea.classList.add("linea-carrito");

        const info = document.createElement("div");
        info.innerHTML = `
            <p class="nombre-linea"> 
            <img src="images/${item.nombre}.jpg" style="width: 20%; height: 100%;"> ${item.nombre}</p>
            <p class="detalle-linea">${item.cantidad} × ${formatearPrecio(item.precio)} = ${formatearPrecio(item.precio * item.cantidad)}</p>
        `;

        const controles = document.createElement("div");
        controles.classList.add("controles-linea");

        const btnMenos = document.createElement("button");
        btnMenos.classList.add("boton-mini");
        btnMenos.textContent = "−";
        btnMenos.addEventListener("click", () => {
            cambiarCantidad(item.id, -1);
        });

        const btnMas = document.createElement("button");
        btnMas.classList.add("boton-mini");
        btnMas.textContent = "+";
        btnMas.addEventListener("click", () => {
            cambiarCantidad(item.id, 1);
        });

        const btnQuitar = document.createElement("button");
        btnQuitar.classList.add("boton-mini");
        btnQuitar.classList.add("boton-quitar");
        btnQuitar.textContent = "X";
        btnQuitar.addEventListener("click", () => {
            quitarDelCarrito(item.id);
        });

        controles.appendChild(btnMenos);
        controles.appendChild(btnMas);
        controles.appendChild(btnQuitar);

        linea.appendChild(info);
        linea.appendChild(controles);
        contenedorCarrito.appendChild(linea);
    });
};

// ---> Escribe los totales en el panel derecho
function renderizarResumen() {
    const totales = calcularTotales();

    textoSubtotal.textContent = formatearPrecio(totales.subtotal);
    textoTotal.textContent = formatearPrecio(totales.total);
    contadorCarrito.textContent = contarUnidades();

    // Operador ternario para el texto del envío
    textoEnvio.textContent = (totales.envio === 0) ? "Gratis" : formatearPrecio(totales.envio);
}

// ---> Función maestra: refresca las tres zonas de la interfaz
function actualizarPantalla() {
    renderizarProductos();
    renderizarCarrito();
    renderizarResumen();
}



/* =========================================================================
   7. MENSAJES DEL SISTEMA
   ========================================================================= */
function mostrarMensaje(texto, tipo) {
    mensajeSistema.textContent = texto;

    mensajeSistema.classList.remove("oculto");
    mensajeSistema.classList.remove("mensaje-exito");
    mensajeSistema.classList.remove("mensaje-error");

    switch (tipo) {
        case "exito":
            mensajeSistema.classList.add("mensaje-exito");
            break;
        case "error":
            mensajeSistema.classList.add("mensaje-error");
            break;
        default:
            mensajeSistema.classList.add("mensaje-exito");
    }

    clearTimeout(temporizadorMensaje);

    temporizadorMensaje = setTimeout(() => {
        mensajeSistema.classList.add("oculto");
    }, 3000);
}


/* =========================================================================
   8. INICIALIZACIÓN (Función autoejecutable - IIFE)
   ========================================================================= */
(function iniciarTienda() {
    console.log("Iniciando la tienda...");
    actualizarPantalla();
    console.log(`Tienda lista con ${inventarioProductos.length} productos.`);
})();


// ---- 8.1 Cupones: función expresiva reutilizada por el clic y por Enter ----
const aplicarCupon = function () {
    const codigo = inputDescuento.value;
    const totales = calcularTotales();

    if (carrito.length === 0) {
        mostrarMensaje("Agrega productos antes de usar un cupón", "info");
        return;
    }

    // SWITCH: comparamos el texto exacto que escribió el usuario
    switch (codigo) {
        case "DESCUENTO10":
            porcentajeDescuento = 0.10;
            envioGratisPorCupon = false;
            mostrarMensaje("Cupón aplicado: 10% de descuento", "exito");
            break;

        case "MITAD":
            // Condicional anidado: este cupón exige una compra mínima
            if (totales.subtotal >= MINIMO_CUPON_MITAD) {
                porcentajeDescuento = 0.50;
                envioGratisPorCupon = false;
                mostrarMensaje("Cupón aplicado: 50% de descuento", "exito");
            } else {
                porcentajeDescuento = 0;
                mostrarMensaje(
                    `El cupón MITAD necesita una compra mínima de ${formatearPrecio(MINIMO_CUPON_MITAD)}`,
                    "error"
                );
            }
            break;

        case "ENVIOGRATIS":
            porcentajeDescuento = 0;
            envioGratisPorCupon = true;
            mostrarMensaje("Cupón aplicado: envío gratis", "exito");
            break;

        default:
            // Cualquier otro texto cae aquí y se reinician los beneficios
            porcentajeDescuento = 0;
            envioGratisPorCupon = false;
            mostrarMensaje("Ese código no existe o ya venció", "error");
    }

    renderizarResumen();
};

// Evento de ratón + función flecha
btnDescuento.addEventListener("click", () => {
    aplicarCupon();
});

// ---- 8.2 Teclado: aplicar el cupón con Enter ----
// Función declarativa que recibe el Objeto Evento (e)
function detectarEnterCupon(e) {
    if (e.key === "Enter") {
        aplicarCupon();
    }
}
inputDescuento.addEventListener("keydown", detectarEnterCupon);


// ---- 8.3 Cambio de categoría (evento change de un selector) ----
selectCategoria.addEventListener("change", () => {
    categoriaActual = selectCategoria.value; // .value trae la opción elegida
    renderizarProductos();
});


// ---- 8.4 Cambio de tema: JavaScript solo mueve una clase ----
btnTema.addEventListener("click", () => {
    // Condicional doble sobre un Boolean
    if (temaOscuro === false) {
        document.body.classList.add("tema-oscuro");
        btnTema.textContent = "Modo claro";
        temaOscuro = true;
    } else {
        document.body.classList.remove("tema-oscuro");
        btnTema.textContent = "Modo oscuro";
        temaOscuro = false;
    }
});


// ---- 8.5 Formulario de compra: función expresiva ----
const manejarCompra = function (evento) {
    // preventDefault() cancela la recarga automática de la página
    evento.preventDefault();

    if (carrito.length === 0) {
        mostrarMensaje("Tu carrito está vacío", "error");
        return;
    }

    const nombreCliente = inputNombre.value;
    const correoCliente = inputCorreo.value;

    // Validación propia además de la que ya hace el HTML con 'required'
    if (nombreCliente.length < 3) {
        mostrarMensaje("Escribe tu nombre completo (mínimo 3 letras)", "error");
        return;
    }

    const totales = calcularTotales();
    numeroPedido++;

    dibujarBoleta(nombreCliente, correoCliente, totales);

    // Reiniciamos el estado de la compra (el stock vendido NO se devuelve)
    carrito = [];
    porcentajeDescuento = 0;
    envioGratisPorCupon = false;
    inputDescuento.value = "";
    inputNombre.value = "";
    inputCorreo.value = "";

    mostrarMensaje(`Pedido #${numeroPedido} confirmado`, "exito");
    actualizarPantalla();
};
formCompra.addEventListener("submit", manejarCompra);

// ---> Función declarativa: arma el comprobante del pedido.
function dibujarBoleta(nombreCliente, correoCliente, totales) {

    // Limpiamos la boleta anterior
    while (panelBoleta.firstChild) {
        panelBoleta.removeChild(panelBoleta.firstChild);
    }

    const titulo = document.createElement("h3");
    titulo.textContent = `Pedido #${numeroPedido} confirmado`;
    panelBoleta.appendChild(titulo);

    const datos = document.createElement("p");
    datos.textContent = `${nombreCliente} · ${correoCliente}`;
    panelBoleta.appendChild(datos);

    // Ciclo DO-WHILE: se ejecuta al menos una vez y aquí eso es correcto,
    // porque solo llegamos a esta función cuando el carrito tiene productos.
    let i = 0;
    do {
        const item = carrito[i];
        const linea = document.createElement("p");
        linea.textContent = `${item.cantidad} x ${item.nombre} = ${formatearPrecio(item.precio * item.cantidad)}`;
        panelBoleta.appendChild(linea);
        i++;
    } while (i < carrito.length);

    // Condicional simple: la línea de ahorro solo aparece si hubo descuento
    if (totales.descuento > 0) {
        const ahorro = document.createElement("p");
        ahorro.textContent = `Ahorraste ${formatearPrecio(totales.descuento)} con tu cupón`;
        panelBoleta.appendChild(ahorro);
    }

    const envio = document.createElement("p");
    envio.textContent = (totales.envio === 0)
        ? "Envío: gratis"
        : `Envío: ${formatearPrecio(totales.envio)}`;
    panelBoleta.appendChild(envio);

    const total = document.createElement("p");
    total.classList.add("boleta-total");
    total.textContent = `Total pagado: ${formatearPrecio(totales.total)}`;
    panelBoleta.appendChild(total);

    panelBoleta.classList.remove("oculto");
}






(function iniciarTienda() {
    console.log("Iniciando la tienda...");

    // Primer dibujado de la interfaz
    actualizarPantalla();

    // Eventos del navegador: avisar cuando se cae o vuelve la conexión
    window.addEventListener("offline", () => {
        avisoConexion.classList.remove("oculto");
    });

    window.addEventListener("online", () => {
        avisoConexion.classList.add("oculto");
        mostrarMensaje("Conexión restaurada", "exito");
    });

    console.log(`Tienda lista con ${inventarioProductos.length} productos.`);
})();


