let buttonCarrito = document.getElementById('mostrarCarrito');
let divCarrito = document.getElementById('carrito');
let divProductos = document.getElementById('productos');
let btnComprar= document.getElementById ('comprar');
const shonen = document.getElementById('shonen');
const deportivo = document.getElementById('deportivo');

let compras = [];
let productos = cargarProductos();

productos.then(data => {
    cargarHTML(data);
    data.forEach((p, indice) => {   
        compras[indice] = new Compra(p.nombre, p.precio, p.imagen)
    });
   
   filtrado(shonen,data)
   filtrado(deportivo,data)
        
})
 
buttonCarrito.addEventListener('click', () => {
    let totalCarrito = 0
    divCarrito.innerHTML = "";
    compras.forEach((productoSeleccionado, indice) => {
        let { nombre, cantidad, precio, img } = productoSeleccionado;
        if (productoSeleccionado.cantidad != 0) {
            totalCarrito += calcularTotal(precio, cantidad);
            divCarrito.innerHTML += ` 
            <div class="card mb-3" id="producto${indice}" style="max-width: 540px;">
                <div class="row g-0">    
                    <div class="col-md-4">
                        <img src="${img}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <p>Producto: ${nombre} </p>
                            <p>Cantidad: ${cantidad}</p>
                            <p>Precio: ${calcularTotal(precio, cantidad)}</p>
                            <button id="boton${indice}" class="btn btn-danger">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>`

        }
    })
    totalCarrito > 0 ? divCarrito.innerHTML += `<p> El precio total es: ${totalCarrito}</p>` : divCarrito.innerHTML="Su carro está vacío";

    eliminarProductos(compras, totalCarrito);
    btnComprar.onclick = ()=>{finalizarCompra(totalCarrito);totalCarrito=0}
})