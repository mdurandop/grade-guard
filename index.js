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
const modalResultado = document.querySelector('.modal-resultado')

botonCalcularNota.addEventListener('click', () => {
    const listaNotas = [];
    const listaPorcentajes = [];
    const promediosParciales = [];
    let porcentajeRestante = 0;
    
    const filaNota = document.querySelectorAll('.grade-guard-row');
    filaNota.forEach(fila => {
        let nota = fila.querySelector('.js-nota-input');
        let porcentaje = fila.querySelector('.js-porcentaje-input');

        listaNotas.push(nota.value);
        listaPorcentajes.push(porcentaje.value)
        promediosParciales.push(nota.value * (porcentaje.value / 100))
    })

    let promedioParcial = 0;
    let porcentajesObtenitos = 0;

    listaPorcentajes.forEach(porcentaje => {
        porcentajesObtenitos += Number(porcentaje);
        porcentajeRestante = 100 - porcentajesObtenitos;
    })

    promediosParciales.forEach((notas) => {
        promedioParcial += notas
    })

    let notaNecesaria = ((notaMinimaAprobar - promedioParcial) / (porcentajeRestante / 100)).toFixed(2);


    modalResultado.style.display = 'block';

    const resultadoText = modalResultado.querySelector('.modal-content');

    if (notaNecesaria <= 2 && notaNecesaria > 0) {
        resultadoText.innerHTML += 
        `
            <h1 class="titulo-resultado">¡Relajate!</h1>
            <p class="mensaje-resultado">Solo necesitas un ${notaNecesaria} en tu próximo examen para pasar la materia. Estás en buen camino, ¡sigue así!</p>
        `
    } else if (notaNecesaria <= 3 && notaNecesaria > 2) {
        resultadoText.innerHTML += 
        `
            <h1 class="titulo-resultado">¡Ya casi!</h1>
            <p class="mensaje-resultado">Necesitas un ${notaNecesaria} en tu próximo examen para pasar la materia. Con un poco de esfuerzo y preparación, seguro lo lograrás. ¡No te rindas!</p>
        `
    } else if (notaNecesaria <= 4 && notaNecesaria > 3) {
        resultadoText.innerHTML += 
        `
            <h1 class="titulo-resultado">¡Dale duro!</h1>
            <p class="mensaje-resultado"> Necesitas un ${notaNecesaria} en tu próximo examen para pasar la materia. Dedica tiempo a estudiar y prepárate bien. ¡Tú puedes hacerlo!</p>
        `  
    } else if (notaNecesaria > 5) {
        resultadoText.innerHTML += 
        `
            <h1 class="titulo-resultado">Te tenemos malas noticias</h1>
            <p class="mensaje-resultado">Aunque has hecho un buen esfuerzo, la calificación necesaria para aprobar ${notaNecesaria}. No te desanimes; utiliza esta experiencia como una oportunidad para aprender y mejorar. ¡La próxima vez estarás mejor preparado!</p>
        `  
    } else {
        resultadoText.innerHTML += 
        `
            <h1 class="titulo-resultado">¡Felicidades!</h1>
            <p class="mensaje-resultado">Ya has pasado la materia con éxito. Todo tu esfuerzo ha valido la pena. ¡Sigue así y disfruta de tu logro!</p>
        `  
    }

    const botonCerrarModal = document.querySelector('.modal-content .close-resultados');
    botonCerrarModal.addEventListener('click', () => {
        resultadoText.innerHTML = `<span class="close-resultados">&times;</span>`;
        modalResultado.style.display = 'none';
    });
})
