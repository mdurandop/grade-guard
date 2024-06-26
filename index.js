const filaNotasContenedor = document.querySelector('.rows-notas');
const botonAgregarNotaExtra = document.querySelector('.agregar-nota-btn');

let notaMinimaAprobar = 3;
let notaMaxima = 5;

const inputNota1 = document.querySelector('.first-input');
inputNota1.setAttribute("max", `${notaMaxima}`)

const botonAjustes = document.querySelector('.js-settings-button img');
const modalAjustes = document.querySelector('.modal-ajustes')

botonAjustes.addEventListener('click', () => {
    modalAjustes.style.display = 'block';

    const notaMinPasarInput = document.querySelector('.inputs-ajustes div #nota-minima');
    const notaMaxInput = document.querySelector('.inputs-ajustes div #nota-maxima');

    const guardarCambios = document.querySelector('.modal-content button')

    guardarCambios.addEventListener('click', () => {
        inputNota1.removeAttribute("max")
        notaMinimaAprobar = notaMinPasarInput.value;
        notaMaxima = notaMaxInput.value;
        inputNota1.setAttribute("max", `${notaMaxima}`)
        modalAjustes.style.display = 'none';
    });

    const botonCerrarModal = document.querySelector('.modal-content .close-ajustes');
    botonCerrarModal.addEventListener('click', () => {
        modalAjustes.style.display = 'none';
    });
});


function crearNuevaFilaNotas() {
    const nuevaFilaNotas = document.createElement('div');
    nuevaFilaNotas.classList.add('grade-guard-row');

    nuevaFilaNotas.innerHTML = 
    `
        <input type="number" placeholder="Nota" id="nota" min="0" max="${notaMaxima}" class="js-nota-input">
        <input type="number" placeholder="Porcentaje" id="porcentaje" max="100" class="js-porcentaje-input" min="0">
        <img src="images/delete.svg" alt="eliminar" class="js-delete-row">
    `;

    return nuevaFilaNotas;
}

filaNotasContenedor.addEventListener('click', (event) => {
    if (event.target.classList.contains('js-delete-row')) {
        event.target.closest('.grade-guard-row').remove();
    }
})

botonAgregarNotaExtra.addEventListener('click', () => {
    const nuevaFilaNotas = crearNuevaFilaNotas();
    filaNotasContenedor.appendChild(nuevaFilaNotas);
});

const botonCalcularNota = document.getElementById('calcular-nota-btn');
const modalResultado = document.querySelector('.modal-resultado');

const obtenerDatosNotas = () => {
    const listaNotas = [];
    const listaPorcentajes = [];
    const promediosParciales = [];

    document.querySelectorAll('.grade-guard-row').forEach(fila => {
        const nota = parseFloat(fila.querySelector('.js-nota-input').value);
        const porcentaje = parseFloat(fila.querySelector('.js-porcentaje-input').value);


        if (isNaN(nota) || isNaN(porcentaje) || nota < 0 || nota > notaMaxima || porcentaje < 0 || porcentaje > 100) {
            alert(`Por favor ingresa valores válidos: Nota entre 0 y ${notaMaxima}, Porcentaje entre 0 y 100.`);
            throw new Error('Valores inválidos');
        }
        
        listaNotas.push(nota);
        listaPorcentajes.push(porcentaje);
        promediosParciales.push(nota * (porcentaje / 100));
    });

    return { listaNotas, listaPorcentajes, promediosParciales };
};

const calcularNotaNecesaria = (listaPorcentajes, promediosParciales, notaMinimaAprobar) => {
    const porcentajesObtenidos = listaPorcentajes.reduce((acc, porcentaje) => acc + porcentaje, 0);
    const porcentajeRestante = 100 - porcentajesObtenidos;
    const promedioParcial = promediosParciales.reduce((acc, parcial) => acc + parcial, 0);

    return ((notaMinimaAprobar - promedioParcial) / (porcentajeRestante / 100)).toFixed(2);
};

const mostrarResultado = (notaNecesaria) => {
    const resultadoText = modalResultado.querySelector('.modal-content');

    let titulo = '';
    let mensaje = '';

    if (notaNecesaria <= 2 && notaNecesaria > 0) {
        titulo = '¡Relájate!';
        mensaje = `Solo necesitas un ${notaNecesaria} en tu próximo examen para pasar la materia. Estás en buen camino, ¡sigue así!`;
    } else if (notaNecesaria <= 3 && notaNecesaria > 2) {
        titulo = '¡Ya casi!';
        mensaje = `Necesitas un ${notaNecesaria} en tu próximo examen para pasar la materia. Con un poco de esfuerzo y preparación, seguro lo lograrás. ¡No te rindas!`;
    } else if (notaNecesaria <= 4 && notaNecesaria > 3) {
        titulo = '¡Dale duro!';
        mensaje = `Necesitas un ${notaNecesaria} en tu próximo examen para pasar la materia. Dedica tiempo a estudiar y prepárate bien. ¡Tú puedes hacerlo!`;
    } else if (notaNecesaria > 5) {
        titulo = 'Te tenemos malas noticias';
        mensaje = `Aunque has hecho un buen esfuerzo, la calificación necesaria para aprobar es ${notaNecesaria}. No te desanimes; utiliza esta experiencia como una oportunidad para aprender y mejorar. ¡La próxima vez estarás mejor preparado!`;
    } else {
        titulo = '¡Felicidades!';
        mensaje = `Ya has pasado la materia con éxito. Todo tu esfuerzo ha valido la pena. ¡Sigue así y disfruta de tu logro!`;
    }

    resultadoText.innerHTML = `
        <span class="close-resultados">&times;</span>
        <h1 class="titulo-resultado">${titulo}</h1>
        <p class="mensaje-resultado">${mensaje}</p>
    `;
};

botonCalcularNota.addEventListener('click', () => {
    const { listaPorcentajes, promediosParciales } = obtenerDatosNotas();
    const notaNecesaria = calcularNotaNecesaria(listaPorcentajes, promediosParciales, notaMinimaAprobar);

    modalResultado.style.display = 'block';
    mostrarResultado(notaNecesaria);

    const botonCerrarModal = document.querySelector('.modal-content .close-resultados');
    botonCerrarModal.addEventListener('click', () => {
        modalResultado.style.display = 'none';
    });
});
