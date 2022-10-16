// jquery para efecto parallax

// $(document).ready(function() {
    
//     $(window).scroll(function() {
//         let bar = $(window).scrollTop();
//         let pos = bar * 0.10; // Velocidad del parallax

//         $('body').css({
//             'background-position': '0 -' + pos + 'px'
//         });
//     });
// });

//********************************************************//
/* Formulario */
const formulario = document.querySelector('#nueva-cita')

/* Inputs */
const mascotaInp = document.querySelector('#mascota');
const propietarioInp = document.querySelector('#propietario');
const telefonoInp = document.querySelector('#telefono');
const fechaInp = document.querySelector('#fecha');
const horaInp = document.querySelector('#hora');
const sintomasInp = document.querySelector('#sintomas');

/* Contenedor de las citas */
const contenedorCitas = document.querySelector('#citas');

/* Modo Editar */
let modoEdicion;

/* Event Listeners */
eventListeners();
function eventListeners() {
    mascotaInp.addEventListener('input', datosCita);
    propietarioInp.addEventListener('input', datosCita);
    telefonoInp.addEventListener('input', datosCita);
    fechaInp.addEventListener('input', datosCita);
    horaInp.addEventListener('input', datosCita);
    sintomasInp.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}

/* Objetos */

const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

/* Clases */ 

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        //console.log(this.citas);
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id);
    }

    editarCita(citaEditada) {
        this.citas = this.citas.map( cita => cita.id === citaEditada.id ? citaEditada : cita );
    }

}

class UI {

    imprimirAlerta(mensaje, tipo) {
        // Crear un div
        const divMensaje = document.createElement('div');

        // Define las clases del div
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agrega clase segun el tipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }
        else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Lo agrega al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar la alerta
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarCitas({citas}) {
        //console.log(citas);

        // Elimina los elementos duplicados
        this.limpiarHTML();

        // Itera por el arr de Citas
        citas.forEach( cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            // Creamos el div de la cita
            const divCita = document.createElement('div');

            // Agregamos clases
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            // Boton para eliminar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = `Eliminar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>`;

            btnEliminar.onclick = () => {eliminarCita(id)};

            // Boton para editar la cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-warning', 'mr-2');
            btnEditar.innerHTML = `Editar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>`;

            btnEditar.onclick = () => {editarCita(cita)};


            // Agrega los parrafos al divCitas
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEditar);
            divCita.appendChild(btnEliminar);

            // Agregar las citas al Html
            contenedorCitas.appendChild(divCita);
        });
    }

    limpiarHTML() {
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

/* Instancias */

const ui = new UI();
const AdminCitas = new Citas();

/* Funciones */ 

// Guarda los imputs en el objeto cita
function datosCita(e) {
    //console.log(e.target.name); // guardamos lo que escribe el user
    // console.log(citaObj); // Ver el objeto citas

    citaObj[e.target.name] = e.target.value;
}
// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
    // console.log('jala')
    e.preventDefault(); // Evita que se recargue la pagina

    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar cada input
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        //console.log('Todos los campos son obligatorios');
        
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(modoEdicion) {
        //console.log('Modo Edicion');

        // Mensaje de success
        ui.imprimirAlerta('Se edito correctamente');

        // Pasar el objeto de la cita a edicion
        AdminCitas.editarCita({...citaObj});//Una copia del objeto cita

        // Reinicia el boton
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //Apaga el modo edicion
        modoEdicion = false;
    }
    else{
        //console.log('Modo Normal');

        // Crear id para las citas
        citaObj.id = Date.now();

        // Creando una nueva cita
        AdminCitas.agregarCita({...citaObj});

        //Imprimir mensaje de success
        ui.imprimirAlerta('Se agrego correctamente');
    }

    // Reinicia el formulario
    formulario.reset();

    // Reinicia el objeto
    resetObj();

    // Mostrar el HTML
    ui.mostrarCitas(AdminCitas);
}
// Limpia el Objeto
function resetObj() {
    citaObj.mascota = '',
    citaObj.propietario = '',
    citaObj.telefono = '',
    citaObj.fecha = '',
    citaObj.hora = '',
    citaObj.sintomas = ''
}
// Elimina una cita
function eliminarCita(id) {
    //console.log(id)

    // Eliminar la cita
    AdminCitas.eliminarCita(id);

    // Mostrar un mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    // Refrescar las citas
    ui.mostrarCitas(AdminCitas);
}
// Habilita la edicion 
function editarCita(cita) {
    //console.log(cita);

    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar los inputs
    mascotaInp.value = mascota;
    propietarioInp.value = propietario;
    telefonoInp.value = telefono;
    fechaInp.value = fecha;
    horaInp.value = hora;
    sintomasInp.value = sintomas;

    // Pasar los valores de los imputs al objeto de citas
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Bambiar texto de boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    modoEdicion = true;
}

