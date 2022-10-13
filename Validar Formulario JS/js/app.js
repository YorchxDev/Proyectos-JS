///////// Variables /////////////

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// Expresion regular
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


////////// Event Listeners //////////////

eventListeners();
function eventListeners() {
    // Al cargar la pagina se ejecuta la funcion iniciarApp
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    // Resetear el formulario
    btnReset.addEventListener('click', resetearFormulario);

    // Enviar Email
    formulario.addEventListener('submit', enviarEmail);
}


//////////// Funciones ///////////////

// Pone el boton opaco
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Validar Formulario

function validarFormulario(e) {

    // Revisa cuantos caracteres tiene el campo donde hiciste click
    if (e.target.value.length > 0) {

        // Elimina los errores
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
        // Si el campo no esta vacio pone un margen verde, quita el rojo
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');
    } 

    // Si esta vacio muestra el borde rojo y quita el verde
    else {
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
    
        // Si dejas el campo vacio muestra el mensaje de error
        mostrarError('Todos los campos son obligatorios');
    }

    // Valida el email

    if (e.target.type === 'email') {

        // Verifica que sea un email valido
        if (er.test( e.target.value )) {

            // Elimina los errores
            const error = document.querySelector('p.error');
            if(error){
                error.remove();
            }

            // Si tiene al menos un caracter le quita el borde rojo y le pone un borde verde
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }

        // Si esta vacio muestra el borde rojo y quita el verde
        else {
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
    
        // Si deja el campo vacio muestra el mensaje de error
        mostrarError('El email no es valido');
        }
    }

    // Si todos los campos estan llenos, habilita el boton enviar
    if (er.test( email.value ) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje) {
    // Crea el mensaje de error con sus estilos (Tailwind)
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500','background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    // Verifica si hay mensajes de error
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
    // Y lo pone al final del HTML
    formulario.appendChild(mensajeError);
    }

}

// Enviar un email (con animacion de spiner)

function enviarEmail(e) {
    e.preventDefault();

    //Mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    // Despues de 3 seg ocultar el spinner
    setTimeout ( () => {
        spinner.style.display = 'none';

        // Mensaje de confirmacion
        const confirmacion = document.createElement('p');
        confirmacion.textContent = 'Mensaje enviado correctamente';
        confirmacion.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');

        // Inserta el mensaje antes del spinner
        formulario.insertBefore(confirmacion, spinner);

        // Elimina el mensaje de confirmacion despues de 5s 
        setTimeout( () => {
            confirmacion.remove(); 
            resetearFormulario();
        }, 5000);
        
    }, 3000 ); // 1000 = 1seg
}

// Resetear el formulario
function resetearFormulario() {
    formulario.reset();

    iniciarApp();
}