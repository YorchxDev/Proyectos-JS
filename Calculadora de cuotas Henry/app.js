// Variables

let salario = document.getElementById('salario-input');
let mens = document.getElementById('mensualidad');
let costo = document.getElementById('costo');
let cuotas = document.getElementById('cuotas');
let boton = document.getElementById('btn');

let tuSalario = 0;
let tax = 0.15;
let mensualidad;
let deuda;
let numeroCuotas;


const maxCuotas = 24;
const deudaMaxima = 4000;

// Event Listener

boton.addEventListener('click', () => {
    validarEntrada();
    calcularPrecio();
});

// Funciones

const validarEntrada = function() {
    if(salario.value === ""){
        alert("Ingresa tu salario")
    }
    // else {
    //     console.log("Todo bien")
    // }
}

function calcularPrecio() {
    
tuSalario = salario.value;
mensualidad = tuSalario * tax;
deuda = mensualidad * maxCuotas;

if (deuda >= deudaMaxima) {
    numeroCuotas = Math.ceil(deudaMaxima / mensualidad);
    deuda = deudaMaxima;

    costo.innerText = `$${deuda}`;
    cuotas.innerHTML = `${numeroCuotas} cuotas`;
}
else {
    costo.innerText = `$${deuda}`;
    cuotas.innerText = `${maxCuotas} cuotas`;
}

mens.innerText = `$${mensualidad}`;

}