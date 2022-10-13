// Variables

const carrito = document.querySelector("#carrito");
const listaCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");

let carritoCompras = [];

// le pone un event listener a todos los cursos, que cuanado das click, corre la funcion agregar curso.
cargarEventListeners();
function cargarEventListeners() {
     listaCursos.addEventListener('click', agregarCurso);

     // Elimina cursos del carrito
     carrito.addEventListener('click', eliminarCurso)

     // Vaciar carrito
     vaciarCarrito.addEventListener('click', () => {

        carritoCompras = []; // Resetea el arreglo, o la lista de articulos en el carrito
        limpiarHTML(); // Elimina el HTML
     })
}

// Funciones

// Verifica que des click en el boton de agregar al carrito
function agregarCurso( e ) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(cursoSeleccionado);
    }
}

// Elimina el curso del carrito
function eliminarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')) {
        // Obtiene el ID del curso que quieres borrar al hacar click en la X
         const cursoID = e.target.getAttribute('data-id');

         // Elimina del arreglo con fliter, !== es como un "todos menos este"
         carritoCompras = carritoCompras.filter( curso => curso.id !== cursoID );

         carritoHTML(); // Lee el carrito despues de eliminar el curso del array y muestra su HTML
    }


}

// Lee el contenido del HTML del curso que le das click

function leerDatos(curso) {
//    console.log(curso)

// Crea un objeto con la info del curso

    const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
    }

// Revisa si un curso ya esta agregado

const existe = carritoCompras.some( curso => curso.id === infoCurso.id);
if(existe){
    //Si el curso ya esta, actualiza la cantidad
    const cursos = carritoCompras.map( curso => {
        if(curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso; // Retorna el objeto actualizado
        } else {
            return curso; // Retorna los objetos que no son duplicados
        }
    });
    carritoCompras = [...cursos];
} else {
    // Si no existe, se agrega al carrito
    // Agrega elementos al arreglo de carrito

    carritoCompras = [...carritoCompras, infoCurso]
}

    carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {
    // Como se duplica el HTML en la lista del carrito tenemos que limpiar el HTML previo antes de agregar un nuevo curso
    limpiarHTML();


    // Recorre el carrito y genera el HTML
    carritoCompras.forEach( curso => {
        // Con esto se optimiza un poco el codigo, asi le quitas el curso. y queda solo img titulo etc.
        const { imagen, titulo, precio, cantidad, id } = curso; 
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
             <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;

        // Agrega el HTML del carrito en el tbody
        listaCarrito.appendChild(row);
    });
}

// Elimina los cursos del tbody

function limpiarHTML() {
    // Esta es una forma pero es mas lenta
    //listaCarrito.innerHTML = '';

    // Mientras la lista tenga un elemento, se borra el HTML anterior
    while(listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild)
    }
}



