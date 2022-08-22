const { readFileSync } = require('fs');
const Forca = require('./forca');

function lerPalavras() {
    try {
        const contents = readFileSync('./controllers/palavras.txt', 'utf-8');
        const palavras = contents.split(/\r?\n/);
  
        return palavras;
    } catch (error) {
        console.log(error);
    }
}

const palavras = lerPalavras()

function sortearPalavra() {
    const indice = Math.floor(Math.random() * palavras.length)
    return palavras[indice]
}

const jogo = new Forca(sortearPalavra())

module.exports = {
    async index(request, response) {

        return response.json(jogo.buscarDadosDoJogo());
    },

    async update(request, response) {
        const { letra } = request.body 
        jogo.chutar(letra)

        const estado = jogo.buscarEstado()

        return response.json(estado)
    },

    async create(request, response) {
        jogo.reiniciar(sortearPalavra())

        return response.json(jogo.buscarDadosDoJogo())
    }
};
