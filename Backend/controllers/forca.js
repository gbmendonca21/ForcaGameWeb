class Forca {
    constructor(resposta){
        this.resposta = resposta;
        this.vidas = 6;
        this.palavra = resposta.replace(/./g, "_").split('');
        this.letrasChutadas = [];
        this.erro = ""
    }
  
    chutar(letra) {
        if (this.validaChute(letra)) {
            let letraLower = letra.toLowerCase();
      
            if (this.resposta.includes(letraLower)) {
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
            if (this.palavra.join('') == this.resposta){
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
        for (var i = 0; i < this.resposta.length; i++) {
            if (this.resposta[i] == letra){
                this.palavra[i] = letra
            }
        }
    }

    reiniciar(resposta) {
        this.resposta = resposta;
        this.vidas = 6;
        this.palavra = resposta.replace(/./g, "_").split('');
        this.letrasChutadas = [];
        this.erro = ""
    }
}

module.exports = Forca