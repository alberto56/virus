function niveauAbstrait() {
  return {
    objectifs: [],

    activerObjectifs: function() {
      $('.espace-objectif').html('');
      this.objectifs.forEach(function (e) {
        e.activer();
      });
    },

    setStatutAccessible: function(valeur) {
      this.statutAccessible = valeur;
      controlleur().associerBoutons();
    },

    statutAccessible: false,

    isAccessible: function(){
      return this.statutAccessible;
    },

    boutonAssocier: function(bouton, controlleur){
      var that = this;
      bouton.off().click(function() {
        $('.selection-niveau .jeu').remove();
        controlleur.commencerNiveau(that);
      });
      if (that.isAccessible()) {
        bouton.removeAttr("disabled");
        bouton.html(that.getNom());
      }
      else {
        this.boutonDesactiver(bouton);
      }
    },

    getMusique: function() {},

    audio: null,

    commencerMusique: function(){
      var musique = this.getMusique();
      if (musique) {
        this.audio = new Audio(musique);
        this.audio.play();
      }
    },

    stopMusique: function(){
      if (this.audio) {
        this.audio.stop();
      }
    },

    boutonDesactiver: function(bouton) {
      if (utilitaires().isDev()){
        bouton.html(this.getNom() + " (desactive)");
      }
      else {
        bouton.attr("disabled", "disabled");
      }
    },

    collectibleretire: function() {

    }
  }
}
