Swal.fire({
	title: '¡Te estabamos esperando!',
	text:'¿Cómo nos conociste?',
	icon: 'question',
	confirmButtonText: 'seleccionar',
	footer:  'Gracias por contestar!!' ,
	 input:'select',
	inputPlaceholder:'Elije una opción',
	inputValue: '',
	inputOptions: {
        Facebook: 'Facebook',
        twitter: 'Twitter',
        Instagram: 'Instagram',
    } 
});


// Versión con uso de Storage
class Menu {
	constructor(menu, cantidad) {
		this.id = menu.id;
		this.combo = menu.combo;
		this.precio = menu.precio;
		this.cantidad = cantidad;
		this.precioTotal = menu.precio;
	}

	agregarUnidad() {
		this.cantidad++;
	}

	quitarUnidad() {
		this.cantidad--;
	}

	actualizarPrecioTotal() {
		this.precioTotal = this.precio * this.cantidad;
	}
}
// texto desplegable
const muestra = ()=>{
    let elemento= document.getElementById('adicional');
    elemento.className= 'visible';

    let ocultar =document.getElementById('ocultar');
    ocultar.className= 'visible';

    let enlace = document.getElementById('enlace');
    enlace.className= 'oculto';
}
const oculta = ()=>{

    document.getElementById('adicional').className= 'oculto';
    document.getElementById('ocultar').className= 'oculto';
    document.getElementById('enlace').className= 'visible';
   
}


// Constantes y variables
const milanesas = [
	{
		id: 0,
		combo: "Clasico",
		descripcion: "Milanesa con papa fritas o puré",
		precio: 1000,
		img: "../image/milanesaclasica.jpeg",
	},
	{
		id: 1,
		combo: "Milanesa Napolitana",
		descripcion: "Milanesa con salsa y queso con papas fritas",
		precio: 1250,
		img: "../image/milanapo.jpeg",
	},
	{
		id: 2,
		combo: "Milanesa de Molleja",
		descripcion: "Milanesa de molleja con papas fritas",
		precio: 1395,
		img: "../image/milamolle.jpeg",
	},
	{
		id: 3,
		combo: "Milanesa a caballo",
		descripcion: "Milanesa con huevos y papas fritas",
		precio: 1400,
		img: "../image/milanesacaballo.jpeg",
	},
	{
		id: 4,
		combo: "Milanesa Veggie",
		descripcion: "Milanesa de berenjena con ensalada",
		precio: 990,
		img: "../image/milaveggie.png",
	},
	{
		id: 5,
		combo: "Milanesa de Pollo",
		descripcion: "Milanesa de Pollo con papas fritas",
		precio: 1185,
		img: "../image/milapollo.jpeg",
	},
];

let carrito = [];

// ----- Declaración de funciones ----- //
function obtenerPrecioTotal(array) {
	return array.reduce((total, elemento) => total + elemento.precioTotal, 0);
}

function agregarAlCarrito(idProducto) {
	let milanesaEnCarrito = carrito.find((elemento) => elemento.id === idProducto);

	if (milanesaEnCarrito) {
		let index = carrito.findIndex((elemento) => elemento.id === milanesaEnCarrito.id);

		carrito[index].agregarUnidad();
		carrito[index].actualizarPrecioTotal();
	} else {

		carrito.push(new Menu(milanesas[idProducto], 1));
	}

	swal("Producto agregado!", `Menu ${milanesas[idProducto].combo}`, "success");

	localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
	imprimirTabla(carrito);
}

function eliminarDelCarrito(id) {
	let milanesas = carrito.find((milanesas) => milanesas.id === id);

	let index = carrito.findIndex((element) => element.id === milanesas.id);
    //  SE APLICA OPERADOR TERNARIO (CODIGO ANTERIOR)
	//if (milanesas.cantidad > 1) {
	//	carrito[index].quitarUnidad();
	//	carrito[index].actualizarPrecioTotal();
	//} else {
	//	carrito.splice(index, 1);
	//}
	
	milanesas.cantidad ? (	carrito[index].quitarUnidad(),
	carrito[index].actualizarPrecioTotal()):(carrito.splice(index, 1))

	swal("Producto eliminado con éxito", "", "success");

	localStorage.setItem("carritoEnStorage", JSON.stringify(carrito));
	imprimirTabla(carrito);
}

function eliminarCarrito() {
	carrito = [];
	localStorage.removeItem("carritoEnStorage");

	document.getElementById("carrito").innerHTML = "";
	document.getElementById("acciones-carrito").innerHTML = "";
}

function imprimirProductosEnHTML(array) {
	//  div que contendrá nuestras cards
	let contenedor = document.getElementById("contenedor");
	contenedor.innerHTML = "";

	// Recorremos el array y por cada item imprimimos una card
	for (const milanesas of array) {
		// Creamos el contendor individual para cada card
		let card = document.createElement("div");

		// Agregamos el contenido a la card

		card.innerHTML = `
        <div class="card text-center" style="width: 18rem;">
            <div class="card-body">
                <img src="${milanesas.img}"  class="card-img-top img-fluid" alt="">
                <h2 class="card-title">${milanesas.combo}</h2>
                <h5 class="card-subtitle  text-muted">${milanesas.descripcion}</h5>
                <p class="card-text">$${milanesas.precio}</p>
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button id="agregar${milanesas.id}" type="button" class="btn btn-primary "> Agregar <i class="bi bi-cart4"> </i></button>
                </div>
            </div>
        </div>      
        `;

		contenedor.appendChild(card);

		// Agregamos el evento al botón
		let boton = document.getElementById(`agregar${milanesas.id}`);

		boton.addEventListener("click", () => agregarAlCarrito(milanesas.id));

	}
}

// Recibe el contenido del carrito y lo imprime en el html
// en una tabla
function imprimirTabla(array) {
	let contenedor = document.getElementById("carrito");
	contenedor.innerHTML = "";

	let precioTotal = obtenerPrecioTotal(array);

	// Creamos el div que contendrá la tabla
	let tabla = document.createElement("div");

	// A ese div le agregaremos todos los datos de la tabla
	tabla.innerHTML = ` <br/><br/>
        <table id="tablaCarrito" class="table table-striped table-hover">
            <thead>         
                <tr>
                    <th>Pedido</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Accion</th>
                </tr>
            </thead>

            <tbody id="bodyTabla">
            </tbody>
        </table>`;

	contenedor.appendChild(tabla);


	let bodyTabla = document.getElementById("bodyTabla");

	for (let milanesas of array) {
		let datos = document.createElement("tr");
		datos.innerHTML = `
                <td>${milanesas.combo}</td>
                <td>${milanesas.cantidad}</td>
                <td>$${milanesas.precioTotal}</td>
                <td><button id="eliminar${milanesas.id}" class="btn btn-danger">Eliminar <i class="bi bi-cart-x"></i></button></td>
      `;

		bodyTabla.appendChild(datos);

		let botonEliminar = document.getElementById(`eliminar${milanesas.id}`);
		botonEliminar.addEventListener("click", () => eliminarDelCarrito(milanesas.id));
	}

	let accionesCarrito = document.getElementById("acciones-carrito");
	accionesCarrito.innerHTML = `
		<h5 class="bg-warning display-5">Total: $${precioTotal}</h5></br>
		<button id="vaciarCarrito" onclick="eliminarCarrito()" class="btn btn-dark btn-lg">Vaciar Carrito <i class="bi bi-trash3"></i></button>
	`;
}

function chequearCarritoEnStorage() {
	let contenidoEnStorage = JSON.parse(localStorage.getItem("carritoEnStorage"));

	if (contenidoEnStorage) {
		for (const objeto of contenidoEnStorage) {
			let milanesas = new Menu (objeto, objeto.cantidad);
			milanesas.actualizarPrecioTotal();
			carrito.push(milanesas);
		}
		imprimirTabla(carrito);
 }
}


 
let nombre = document.getElementById('nombre');
let telefono = document.getElementById('telefono');
let enviar = document.getElementById('enviar');
let resultado = document.getElementById('resultado');

enviar.onclick=() => {
   let datos = {
	   nombre: nombre.value,
	   telefono: telefono.value,
	   carrito: carrito,
	   userId: 2,
   };

   const options = {
	   method: 'POST',
	   body: JSON.stringify(datos),
	   headers: {
		   'Content-type': 'application/json; charset=UTF-8',
	   }}
   fetch('https://jsonplaceholder.typicode.com/posts', options)
	   .then((response) => response.json())
	   .then((data) => {
		   resultado.innerHTML = `Tu pedido fue enviado, gracias por tu compra!!`;
	   })
	   .catch( error => {
		   resultado.innerHTML = `Hubo un error: ${error}`;
	   })
	   eliminarCarrito();
	   console.log(carrito); 
}
// --- Invocación de funciones ---
imprimirProductosEnHTML(milanesas);

// Consulta al Storage para saber si hay información almacenada
// Si hay datos, se imprimen en el HTML al refrescar la página
chequearCarritoEnStorage();




