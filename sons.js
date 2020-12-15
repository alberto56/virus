function sons(){
  return {
    // fichier: un string qui correspond au fichier de musique ou son, par
    // exemple: 'audio/blazer.wav'
    play: function(fichier) {
      var audio = new Audio(fichier);

      this.prePlay(audio);

      audio.play();
    },

    // objet audio,
    // exemple: new Audio('audio/blazer.wav')
    prePlay: function(audio) {
      // Ne rien faire.
    }
  }
}
