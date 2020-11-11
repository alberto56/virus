var Niveau5Factory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveau3(true));

    objet.getNom = function() {
      return "Niveau 5";
    };
    objet.niveauSuivant = function() {
      return niveauPanneau('panneau-final');
    };
    objet.niveauPrecedent = function() {
      return niveau4();
    };
    objet.nombredePoints = function(){
      return 100;
    };
    objet.infectes = function(){
      return 20;
    };
    objet.objectifCollectibles = objectifCollectibles(objet);
    objet.preparer = function(jeu) {
      // Ne rien faire, d'autres niveaux peuvent, par exemple, ajouter des
      // nouvelles fonctionalités comme des collectibles ou autres...
      creerCollectible(jeu, this).bouger($('.panneau-jeu'));
      creerCollectible(jeu, this).bouger($('.panneau-jeu'));
      creerCollectible(jeu, this).bouger($('.panneau-jeu'));
      creerCollectible(jeu, this).bouger($('.panneau-jeu'));
      creerCollectible(jeu, this).bouger($('.panneau-jeu'));
      creerCollectible(jeu, this).bouger($('.panneau-jeu'));
      creerCollectible(jeu, this).bouger($('.panneau-jeu'));
      creerCollectible(jeu, this).bouger($('.panneau-jeu'));
      objet.objectifs = [
        objet.objectifCollectibles
      ];
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

function niveau5(create_new = false) {
  return Niveau5Factory.instance(create_new);
}
