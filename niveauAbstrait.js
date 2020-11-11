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

    boutonDesactiver: function(bouton) {
      if (utilitaires().isDev()){
        bouton.html(this.getNom() + " (désactivé)");
      }
      else {
        bouton.attr("disabled", "disabled");
      }
    },

    collectibleretire: function() {

    }
  }
}
