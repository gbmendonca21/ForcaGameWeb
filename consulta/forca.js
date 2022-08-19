class Forca {

  constructor(resposta){
    this.resposta = resposta;
    this.vidas = 6;
    this.palavra = resposta.replace(/./g, "_").split('');
    this.letrasChutadas = [];
  }

  chutar(letra) {
    if (this.validaChute(letra)) {
      let letraLower = letra.toLowerCase();

      if (this.resposta.includes(letraLower)) {
        this.escreveChute(letraLower)
      }
      else{
        this.vidas--;
      }
    }
  }

  buscarEstado() {
    if (this.vidas > 0){
      if (this.palavra.join('') == this.resposta){
        return "ganhou";
      }
      
      return "Aguardando chute:";
    }

    return "perdeu";
  } // Possiveis valores: "perdeu", "aguardando chute" ou "ganhou"

  buscarDadosDoJogo() {
      return {
          letrasChutadas: this.letrasChutadas, // Deve conter todas as letras chutadas
          vidas: this.vidas, // Quantidade de vidas restantes
          palavra: this.palavra // Deve ser um array com as letras que já foram acertadas ou o valor "_" para as letras não identificadas
      }
  }

  validaChute(letra) {
    if (letra.length != 1) {
      return false
    }
    
    let letraLower = letra.toLowerCase();
    if (this.letrasChutadas.includes(letraLower)){
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

}

module.exports = Forca;
