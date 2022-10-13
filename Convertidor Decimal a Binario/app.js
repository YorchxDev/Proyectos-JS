
// Variables

const entrada = document.getElementById('entrada');
const salida = document.getElementById('salida');
const btn = document.getElementById('btn');

let numDec, div, resultadoBin, cociente, residuo;

// Event Listener
btn.addEventListener('click', () => {
    validarEntrada();
    resultadoBin = convertirDecABin();
    salida.value = invertirCadena(resultadoBin);
})

// Funciones

const validarEntrada = function() {
    if(entrada.value === ""){
        alert("Ingrese Datos")
    }
    else {
        console.log("Todo bien")
    }
}

const convertirDecABin = function() {
    numDec = entrada.value;
    div = 2;
    let numeroSalida = "";

    while (numDec >= div) {
        cociente = Math.trunc(numDec/div);
        residuo = numDec % div;
        numeroSalida += residuo.toString();
        numDec = cociente;
    }

    let a = numDec.toString();
    numeroSalida += a;

    return numeroSalida;

}

const invertirCadena = function(str) {
    return str.split("").reverse().join("")
}

