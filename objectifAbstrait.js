function objectifAbstrait(niveau) {
  var ran = Math.random();

  console.log("Je crée un objectif pour niveau " + niveau.getNom() + ", son identité est " + ran)

  return {
    niveau: niveau,

    ran: ran,

    continuerJeu: function() {
      controlleur().montrerPanneau('prochain-niveau');
      var that = this;
      $('.bouton-niveau-suivant').off().click(function() {
        console.log("L'objectif " + ran + " va continuer le jeu");
        console.log(that.niveau);
        console.log(that.niveau.getNom());
        console.log(that.niveau.niveauSuivant().getNom());
        controlleur().commencerNiveau(that.niveau.niveauSuivant());
      });
    },

    activer: function() {
    }
  }
}
