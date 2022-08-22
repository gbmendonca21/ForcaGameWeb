const { readFileSync } = require('fs');

function lerPalavras() {
    try {
        const contents = readFileSync('./palavras.txt', 'utf-8');
        const palavras = contents.split(/\r?\n/);
  
        return palavras;
    } catch (error) {
        console.log(error);
    }
}

function sortearPalavra() {
    const palavras = lerPalavras()
    const palavraAleatoria = palavras[Math.floor(Math.random() * palavras.length)]
    return palavraAleatoria
}

// console.log(sortearPalavra())

var string = "Ça été Mičić. ÀÉÏÓÛ";
console.log(string);

var string_norm = string.normalize('NFD').replace(/\p{Diacritic}/gu, ""); // Old method: .replace(/[\u0300-\u036f]/g, "");
console.log(string_norm);