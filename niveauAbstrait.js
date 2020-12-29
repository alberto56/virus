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
      bouton.click(function() {
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
      musique().play(this.getMusique())
    },

    stopMusique: function(){
      // if (this.audio) {
      //   this.audio.pause();
      // }
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
