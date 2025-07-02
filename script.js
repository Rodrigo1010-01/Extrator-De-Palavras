import { PALAVRAS_RUINS } from "./palavrasRuins.js";

const botaoMostraPalavras = document.querySelector('#botao-palavrachave');

// Add a check to ensure the button exists before adding the event listener
if (botaoMostraPalavras) {
    botaoMostraPalavras.addEventListener('click', mostraPalavrasChave);
} else {
    console.error("Button with ID 'botao-palavrachave' not found.");
}

function mostraPalavrasChave() {
    const texto = document.querySelector('#entrada-de-texto')?.value; // Use optional chaining for robustness
    const campoResultado = document.querySelector('#resultado-palavrachave');

    if (!texto || !campoResultado) {
        console.warn("Input text field or result field not found or text is empty.");
        return;
    }

    const palavrasChave = processaTexto(texto);
    campoResultado.textContent = palavrasChave.join(", ");
}

function processaTexto(texto) {
    // Use a more robust regex for splitting words that handles various Unicode characters
    let palavras = texto.split(/[\s\p{P}]+/u).filter(Boolean); // Filter out empty strings from split

    for (let i in palavras) {
        palavras[i] = palavras[i].toLowerCase();
    }

    palavras = tiraPalavrasRuins(palavras);

    const frequencias = contaFrequencias(palavras);
    let ordenadas = Object.keys(frequencias).sort(ordenaPalavra);

    function ordenaPalavra(p1, p2) {
        return frequencias[p2] - frequencias[p1];
    }

    return ordenadas.slice(0, 10);
}

function contaFrequencias(palavras) {
    let frequencias = {};
    for (let palavra of palavras) {
        // Increment count for existing words, or initialize to 1 for new words
        frequencias[palavra] = (frequencias[palavra] || 0) + 1;
    }
    return frequencias;
}

function tiraPalavrasRuins(palavras) {
    const palavrasBoas = [];
    for (let palavra of palavras) {
        // Ensure the word is not in the bad words set and has a length greater than 2
        if (!PALAVRAS_RUINS.has(palavra) && palavra.length > 2) {
            palavrasBoas.push(palavra);
        }
    }
    return palavrasBoas;
}