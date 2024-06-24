const filaNotas = document.querySelector('.rows-notas');
const botonAgregarNotaExtra = document.querySelector('.agregar-nota-btn');

let listaNotas = [];
let listaPorcentajes = [];
let notaId = 1;

function crearNuevaFilaNotas() {
    const nuevaFilaNotas = document.createElement('div');
    nuevaFilaNotas.classList.add('grade-guard-row');

    nuevaFilaNotas.innerHTML = 
    `
        <input type="number" placeholder="Nota" id="nota" min="0" class="js-nota-input">
        <input type="number" placeholder="Porcentaje" id="porcentaje" min="0">
        <img src="images/delete.svg" alt="eliminar" class="js-delete-row">
    `;

    return nuevaFilaNotas;
}

filaNotas.addEventListener('click', (event) => {
    // event.target selecciona el elemento en donde se realiza el event
    // classList.contains busca si el elemento contiene una clase especifica
    if (event.target.classList.contains('js-delete-row')) {
        // closest busca el elemento con la clase especificada más cercana
        // .remove elimina el elemento del DOM
        event.target.closest('.grade-guard-row').remove();
    }
})

botonAgregarNotaExtra.addEventListener('click', () => {
    const nuevaFilaNotas = crearNuevaFilaNotas();
    filaNotas.appendChild(nuevaFilaNotas);
});

const botonCalcularNota = document.getElementById('calcular-nota-btn');
const resultadoText = document.querySelector('.resultado');

botonCalcularNota.addEventListener('click', () => {
    
})
