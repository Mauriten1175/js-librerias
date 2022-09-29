const contenedor = document.querySelector('.productos');
const carritoVer = document.querySelector('.carrito');
const precioTotal = document.getElementById('total');
const botonVaciar = document.getElementById('vaciarCarrito');


let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


botonVaciar.addEventListener('click', ()=>{

    Swal.fire({
        title: '¿Esta seguro de vaciar el Carrito?',
        text: "Esta accion no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d42d71',
        cancelButtonColor: '#c8c8c8',
        confirmButtonText: 'Si, Vaciar!'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0
            armarCarrito();
            Swal.fire(
            'Items Borrados',
            'Carrito Vacio!',
            )
            carrito.length = 0
            armarCarrito();
        }
    })
})




const productos = [ 
    {id: 1, name: "Skinbioma shower gel", description: "Limpia la piel de todo el cuerpo, mantiene el equilibrio de la flora bacteriana y protege la salud de la microbiota.", price: 3500, img: "./img/producto1.jpg", stock: 10},
    {id: 2, name: "Labial Mimika", description: "Labial con aceite de coco que otorga brillo y poder humectante. Ralentiza el envejecimiento cutáneo ya que es rico en Vitamina E", price: 2800, img:"./img/mimika10.jpg", stock: 15},
    {id: 3, name: "Body Foam Espuma", description: "Gel jabonoso para la higiene corporal. Mejora la celulitis y la flacidez y otorga suavidad a la piel.", price: 3300, img:"./img/producto3.jpg", stock: 20},
    {id: 4, name: "Dherma food lidherma", description: "Crema de textura suave y aireada que combina la sensación de frescura y suavidad con un agradable aroma frutal.", price: 4400, img:"./img/producto4.jpg" , stock: 5}
]

function creaCards() {
    productos.forEach(el => {
        let card = document.createElement('card');
        // card.className = 'cards'
        card.innerHTML += `<div class="card  p-2 " style="width: 18rem;">
        <h2 class= "text-center">${el.name}</h2>
        <div class="card-body">
            <p>${el.description}</p>
        </div>
        <img class="card-img-top" src="${el.img}" alt="">
        <p class="card-text text-center pt-1 fw-bold">$${el.price}</p>
        <button class="btnCarrito" id="btn-agregar${el.id}" >Agregar</button>
        </div>
        `
        contenedor.append(card);
    })
    botonComprar();
    
}

function botonComprar(){
    productos.forEach(producto => {
    document.querySelector(`#btn-agregar${producto.id}`).addEventListener('click',()=>{
        
        Toastify({
            text: "Item agregado",
            duration: 1500,
            //destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #d42d71 ,#fbe4ed)",
            },
            onClick: function(){} // Callback after click
        }).showToast();
        agregarAlCarrito(producto)
    })
    })
    
}


function agregarAlCarrito(producto){ 
    
    let existe =carrito.some(prod=>prod.id === producto.id);
    if(existe===false){
    producto.cantidad = 1;
    carrito.push(producto);
    }
    else{
    let prodFind = carrito.find(prod=>prod.id === producto.id)
    prodFind.cantidad++;
    }
    console.log(carrito);
    
    armarCarrito();
    totalCarrito();
    
    
}

function armarCarrito(){
    carritoVer.innerHTML='';
        carrito.forEach(prod=>{
            carritoVer.innerHTML += `<div class="d-flex flex-row vw-100 p-2" >
            <div style="width: 100%">
            <h4>${prod.name}</h4>
            </div>
            <div style="width: 100%">
            <p class= colorprice>PRECIO $${prod.price}</p>
            </div>
            <div style="width: 100%">
            <h5>Cantidad: ${prod.cantidad}</h5>
            
            </div>
            <div style="width: 100%">
            <button class="btnMenos" id="btn-restar${prod.id}" >-</button>
            <button class="btnCarrito" id="btn-quitar${prod.id}" >Quitar</button>
            
            </div>
            </div>
            
            `
        })
        localStorage.setItem('carrito',JSON.stringify(carrito));
        console.log(carritoVer);
        
        quitarProducto();
        totalCarrito();

}

function restarProducto() {
}

function quitarProducto() {
    carrito.forEach(producto => {
        document.querySelector(`#btn-quitar${producto.id}`).addEventListener('click',()=>{
            console.log('click');
            let indice = carrito.findIndex(e=>e.id===producto.id);
            carrito.splice(indice,1);

            Toastify({
                text: "Item eliminado",
                duration: 1500,
                //destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: false,
                gravity: "top", // `top` or `bottom`
                position: "left", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #d42d71, #fbe4ed)",
                },
                onClick: function(){} // Callback after click
            }).showToast();

            armarCarrito();
        })
    
})
}



function totalCarrito(){

    precioTotal.innerText = carrito.reduce((acc,prod) => acc + prod.price*prod.cantidad,0);

}    

creaCards();
armarCarrito();


{/* <div class="card  p-3 mb-5  rounded" style="width: 18rem;">
            <img src="./img/producto1.jpg" class="card-img-top" alt="skinbioma shower gel">
            <div class="card-body">
                <p class="card-text">Limpia la piel de todo el cuerpo, mantiene el equilibrio de la flora bacteriana y protege la salud de la microbiota. Contiene activos limpiadores, emolientes y humectantes.</p>
            </div>
        </div> */}
