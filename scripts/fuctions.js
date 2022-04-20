async function cargarProductos(){
    let promesa = await fetch('../productos.json')
    let productosJSON = await promesa.json()
    return productosJSON    
}
let cargarHTML = (arrayTipo) => {
    divProductos.innerHTML = "";
    arrayTipo.forEach((p) => {s
        divProductos.innerHTML += `
            <div id="producto${p.id}" class="card card-producto mt-2 col-md-3" >
                    <img src="${p.imagen}" class="card-img-top mt-2"  alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${p.nombre}</h5>
                        <p class="card-text">Precio: $${p.precio}</p>
                        <button id="btn_${p.id}" href="#" class="btn btn-primary btn-agregar">Añadir al carrito</button>
                    </div>
            </div>`;
         

    });
    const buttons = document.getElementsByClassName("btn-agregar");
    for (const btn of buttons) {
        btn.onclick = () => sumarProducto(btn.id.split('_')[1]);
    }
}

function filtrado(boton,productos) {
    boton.onclick= () => {
        cargarHTML(productos.filter(producto => { return producto.tipo == boton.id }))
    }
}

const calcularTotal = function (precio, cantidad) {
    let total = precio * cantidad;
    return total;
}

function sumarProducto(indice) { 
    compras[--indice].cantidad++; 
    localStorage.setItem('Compra', JSON.stringify(compras))
    Toastify({
        text: "Producto cargado",
        className: "info",
        duration: 1500,
        gravity: "bottom",
        style: {
          background: "white",
          color: "#c85855"
        }
      }).showToast();
};

function eliminarProductos(compras, totalCarrito) {
    compras.forEach((productoSeleccionado, indice) => {
        if (productoSeleccionado.cantidad > 0) {
            document.getElementById(`boton${indice}`).addEventListener('click', () => {
                productoSeleccionado.cantidad --;
                totalCarrito -= productoSeleccionado.precio;
                divCarrito.innerHTML = ""
                compras.forEach((productoSeleccionado, indice) => {
                    if (productoSeleccionado.cantidad != 0) {
                        divCarrito.innerHTML += ` 
                        <div class="card mb-3" id="producto${indice}" style="max-width: 540px;">
                            <div class="row g-0">    
                                <div class="col-md-4">
                                    <img src="${productoSeleccionado.img}" class="img-fluid rounded-start" alt="...">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <p>Producto: ${productoSeleccionado.nombre} </p>
                                        <p>Cantidad: ${productoSeleccionado.cantidad}</p>
                                        <p>Precio: ${calcularTotal(productoSeleccionado.precio, productoSeleccionado.cantidad)}</p>
                                        <button id="boton${indice}" class="btn btn-danger">Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>`
                    }

                })

                localStorage.setItem('Compra', JSON.stringify(compras));
                totalCarrito > 0 ? divCarrito.innerHTML += `<p> El precio total es: ${totalCarrito}</p>` :  divCarrito.innerHTML="Su carro está vacío";
                eliminarProductos(compras, totalCarrito);
            })
        }

    })
}

function finalizarCompra(totalCarrito) {
    if (totalCarrito>0) {
        compras.forEach((productoSeleccionado) => {
            productoSeleccionado.cantidad=0;
        })
        divCarrito.innerHTML="Su carro está vacío";
        localStorage.setItem('Compra', JSON.stringify(compras));
        Swal.fire({
            title: 'Info!',
            text: 'Su compra fue realizada con éxito',
            icon: 'success',
            confirmButtonText: 'Entendido'
        })
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Su carro está vacío',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })
    }    
}