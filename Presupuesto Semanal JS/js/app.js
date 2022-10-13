// Variables y selectores

const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Eventos

eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto );

    formulario.addEventListener('submit', agregarGasto);
}


// Clases

let presupuesto; // aqui se guardara el monto 

// Se ocupa de sacar las cuentas 
class Presupuesto {
    constructor(presupuesto) {

        // Number() convierte el string a numero
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];

    }

    nuevoGasto(gasto) {
        // console.log(gasto);

        this.gastos = [...this.gastos, gasto];
        // console.log(this.gastos);

        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0);
        // console.log(gastado);

        this.restante = this.presupuesto - gastado;
        // console.log(this.restante);
    }

    eliminarGasto(id) {
        // Filtra los elementos del array gastos
        // toma todos menos el que tiene el id que le pasas
        this.gastos = this.gastos.filter( gasto => gasto.id !== id);

        this.calcularRestante();
    }
};

// se ocupa de mostrar en HTML
class UI {
    insertarPresupuesto(cantidad) {
        // console.log(cantidad);
        // Extraemos los valores
        const { presupuesto, restante } = cantidad;

        // Agrega al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        // Crear un div
        const divMensaje = document.createElement('div');
        // Agrega clases
        divMensaje.classList.add('text-center', 'alert', 'mt-3');

        if(tipo === 'error') { // Si es un error poner rojo
            divMensaje.classList.add('alert-danger');
        }
        else { // Si no, poner verde
            divMensaje.classList.add('alert-success');
        }

        // Mensaje error
        divMensaje.textContent = mensaje;

        // Insertar en HTML
        document.querySelector('.primario').appendChild(divMensaje);

        // Limpiar HTML
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarListado(gastos) {
        //console.log(gastos);

        // Limpia HTML
        this.limpiarHTML();

        // Iterar sobre elementos
        gastos.forEach( gasto => {
           // console.log(gasto); 

           const { cantidad, nombre, id } = gasto; // Destructuring

            // Crear un LI

            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            // Agregar HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $${cantidad} </span>`;

            // Boton para quitar gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times';

            //Para borrar un gasto al hacer click en la x
            btnBorrar.onclick = () => {
                // console.log('diste click');
                eliminarGasto(id);
            };

            nuevoGasto.appendChild(btnBorrar);

            // Agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        });
    };

    limpiarHTML() {
        // Mientras el listado tenga algo
        // elimina al primer elemento hijo
        while( gastoListado.firstChild ) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    };

    actualizarRestante( restante ) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto( presupuestoObj ) {
       // console.log( presupuesto );

       const { presupuesto, restante } = presupuestoObj;

       const restanteDiv = document.querySelector('.restante');

       // Comprobar 25%
        if( (presupuesto / 4) > restante ) {
           // console.log('Se ha gastado 75% del presupuesto');
           restanteDiv.classList.remove('alert-success', 'alert-warning');
           restanteDiv.classList.add('alert-danger');
        }
        else if( (presupuesto / 2) > restante ) {
            // console.log('Se ha gastado 50% del presupuesto');
            restanteDiv.classList.remove('alert-success', 'alert-danger');
            restanteDiv.classList.add('alert-warning');
        }
        else {
            restanteDiv.classList.remove('alert-danger','alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        // Si el restante es 0 o menor
        if( restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado :C', 'error');
        }
    }

}

// Instanciar

const ui = new UI(); 


// Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');

    // console.log(presupuestoUsuario)

    // Valida si se deja vacio, se cancela o se pasan letras
    if( presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ) { 
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    // console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
    // Previene que se recargue la pagina
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //Validar
    if(nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    }
    else if( cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Introduzca un monto valido', 'error');
        return;
    }
    
    // console.log('Agregando gastos') // Verificar validacion

    // Crear gasto
    const gasto = { nombre, cantidad, id: Date.now() }; // Object Literal Enhancement (OLE)
    // console.log( gasto ) // Ver Objeto Gasto

    // Agrega gasto
    presupuesto.nuevoGasto(gasto);

    // Muestra alerta
    ui.imprimirAlerta('Gasto agregado');

    // Agregar gasto a Lista
    const { gastos, restante } = presupuesto; // Destructuring de objeto
    ui.mostrarListado( gastos );

    // Actualizar restante HTML
    ui.actualizarRestante( restante );

    // Cambia color
    ui.comprobarPresupuesto( presupuesto );

    // Reinicia el formulario
    formulario.reset();
}

function eliminarGasto(id) {
    // console.log(id);

    // Elimina un gasto de la lista
    presupuesto.eliminarGasto(id);

    // Obtiene el arr de gastos
    const { gastos, restante } = presupuesto;

    // Actualiza el HTML
    ui.mostrarListado(gastos);

    ui.actualizarRestante( restante );

    ui.comprobarPresupuesto( presupuesto );
}