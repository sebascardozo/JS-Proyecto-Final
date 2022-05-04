const options = {
    method: 'POST',
    body: JSON.stringify({
        title: 'Sugerencias',
        body: 'Post de prueba',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }}

fetch('https://jsonplaceholder.typicode.com/posts', options)
    .then((response) => response.json())
    .then((data) => console.log(data))

let nombre = document.getElementById('nombre');
let correo = document.getElementById('correo');
let mensaje = document.getElementById('mensaje');
let buscar = document.getElementById('buscar');
let resultado = document.getElementById('resultado');

enviar.onclick=() => {
    let datos = {
        nombre: nombre.value,
        mensaje: mensaje.value,
        correo:correo.value,
        userId: 1,
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
            resultado.innerHTML = `Tu sugerencia fue enviada, gracias!!`;
        })
        .catch( error => {
            resultado.innerHTML = `Hubo un error: ${error}`;
        })
}