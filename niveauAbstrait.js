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
      if (that.isAccessible()) {
        bouton.removeAttr("disabled");
        bouton.off().click(function() {
          $('.selection-niveau .jeu').remove();
          controlleur.commencerNiveau(that);
        });
      }
      else {
        this.boutonDesactiver(bouton);
      }
    },

    boutonDesactiver: function(bouton) {
      bouton.attr("disabled", "disabled");
    },

    collectibleretire: function() {

    }
  }
}
