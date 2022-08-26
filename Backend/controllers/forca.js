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
        this.erro = ""
    }

    reiniciar(resposta) {
        this.resposta = resposta;
        this.respostaNormalizada = resposta.normalize('NFD').replace(/\p{Diacritic}/gu, "").toLowerCase();
        this.vidas = 6;
        this.palavra = resposta.replace(/./g, "_").split('');
        this.letrasChutadas = [];
        this.erro = ""
    }
  
    chutar(letra) {
        if (this.validaChute(letra)) {
            let letraLower = letra.toLowerCase();
            
            if (this.respostaNormalizada.includes(letraLower)) {
                this.escreveChute(letraLower)
            }
            else{
                this.vidas--;
                this.erro = "A letra não existe na palavra"
            }
        }
    }
  
    buscarEstado() {
        if (this.vidas > 0){
            if (this.palavra.join('') == this.resposta) {
                return { mensagem : "Parabéns! Você não foi pra forca."};
            }
          
          return this.buscarDadosDoJogo();
        }

      return { mensagem : "Você morreu :( A palavra era '" + this.resposta + "'"}
    }
  
    buscarDadosDoJogo() {
        return {
            letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
            vidas: this.vidas, // Quantidade de vidas restantes
            palavra: this.palavra, // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
            erro : this.erro
        }
    }
  
    validaChute(letra) {
        if (letra.length != 1) {
            this.erro = "Não é uma letra"
            return false
        }
      
        let letraLower = letra.toLowerCase();
        if (this.letrasChutadas.includes(letraLower)){
            this.erro = "Letra já chutada"
            return false
        }
        
        this.letrasChutadas.push(letraLower);
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