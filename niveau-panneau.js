var NiveauPanneauFactory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveau1(true));

    objet.indentifiant = identifiant;
    objet.getNom = function() {
      return identifiant;
    };
    objet.niveauSuivant = function(){
      return niveau1();
    };
    objet.niveauPrecedent = function(){
      return false;
    };
    objet.nombredePoints = function(){
      return 0;
    };
    objet.vies = function(){
      return 0;
    };
    objet.invincibleDebut = function(){
      return 0;
    };
    objet.infectes = function(){
      return 0;
    };
    objet.niveauPanneau = function() {
      return true;
    };
    objet.getPanneau = function() {
      return this.indentifiant;
    };

    return objet;

  }

  return {
    instance: function (create_new) {
      if (!instance || create_new) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

function niveauPanneau(create_new = false) {
  return NiveauPanneauFactory.instance(create_new);
}
