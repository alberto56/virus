function objectifAbstrait(niveau) {
  return {
    niveau: niveau,

    continuerJeu: function() {
      controlleur().montrerPanneau('prochain-niveau');
      var that = this;
      $('.bouton-niveau-suivant').off().click(function() {
        controlleur().commencerNiveau(that.niveau.niveauSuivant());
      });
    },

    activer: function() {
    }
  }
}
