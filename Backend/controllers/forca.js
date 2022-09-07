class Forca {
    // Resolver problema dos acentos:
    // https://stackoverflow.com/questions/5700636/using-javascript-to-perform-text-matches-with-without-accented-characters
    constructor(resposta){
        this.resposta = resposta;
        this.respostaNormalizada = resposta.normalize('NFD') // Separar caracteres de acentos
                                            .replace(/\p{Diacritic}/gu, "") // Substituir acentos por texto vazio
                                            .toLowerCase();   // A maioria das palavras começa com letra maiúscula
        this.vidas = 6;
        this.palavra = resposta.replace(/./g, "_").split('');
        this.letrasChutadas = [];
        this.mensagem = "";
        this.jogoAcabou = false;
        this.letrasErradas = [];
    }

    reiniciar(resposta) {
        this.resposta = resposta;
        this.respostaNormalizada = resposta.normalize('NFD').replace(/\p{Diacritic}/gu, "").toLowerCase();
        this.vidas = 6;
        this.palavra = resposta.replace(/./g, "_").split('');
        this.letrasChutadas = [];
        this.mensagem = "";
        this.jogoAcabou = false;
        this.letrasErradas = [];
    }
  
    chutar(letra) {
        if (this.validaChute(letra)) {
            let letraLower = letra.toLowerCase();
            
            if (this.respostaNormalizada.includes(letraLower)) {
                this.escreveChute(letraLower)
                this.mensagem = ""
            }
            else{
                this.vidas--;
                this.mensagem = "A letra não existe na palavra"
                this.letrasErradas.push(letraLower)
            }
        }

        this.validarEstado()
    }
  
    validarEstado() {
        if (this.vidas > 0) {
            if (this.palavra.join('') == this.resposta) {
                this.mensagem = "Parabéns! Você não foi pra forca.";
                this.jogoAcabou = true;
            }

            // Aqui o jogo não acabou
            // Não setar a variável nesse ponto
        }
        else {
            this.mensagem = "Você morreu :( A palavra era '" + this.resposta + "'";
            this.jogoAcabou = true;
        }
    }
  
    buscarDadosDoJogo() {
        return {
            letrasErradas: this.letrasErradas, // Deve conter todas as letras chutadas erradas 
            vidas: this.vidas, // Quantidade de vidas restantes
            palavra: this.palavra, // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
            mensagem: this.mensagem,
            jogoAcabou: this.jogoAcabou
        }
    }
  
    validaChute(letra) {
        if (letra.length != 1) {
            this.mensagem = "Não é uma letra"
            return false
        }

        let letraLower = letra.toLowerCase();
        if (this.letrasChutadas.includes(letraLower)){
            this.mensagem = "Letra já chutada"
            return false
        }
        
        this.letrasChutadas.push(letraLower);

        if (this.vidas == 0){
            this.mensagem = "Você morreu :( A palavra era '" + this.resposta + "'"
            return false
        }

        return true
    }
  
    escreveChute(letra) {
        for (var i = 0; i < this.respostaNormalizada.length; i++) {
            if (this.respostaNormalizada[i] == letra){
                this.palavra[i] = this.resposta[i]
            }
        }
    }
}

module.exports = Forca