var Niveau1Factory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveauAbstrait());

    objet.getNom = function() {
      return "Niveau 1";
    };
    objet.asymptomatique = function(){
      return 0;
    };
    objet.niveauSuivant = function(){
      return niveau2();
    };
    objet.endurancejoueur = function(){
      return 500;
    },
    objet.niveauPrecedent = function(){
      return false;
    };
    objet.preparer = function(jeu) {
      this.objectifs = [
        objectifTemps(this),
      ];
        controlleur().creerObstaclesrebords(this, 75);
    };
    objet.nombredePoints = function(){
      return 66;
    };
    objet.vies = function(){
      return 3;
    };
    objet.instructions = function(){
      return "";
    };
    objet.duree = function() {
      return 30;
    };
    objet.invincibleDebut = function(){
      return 3000;
    };
    objet.placerJoueur = function(joueur) {
      // Par exemple, joueur.placerAleatoire();
      joueur.placerCentre();
    };
    objet.tutoriel = function(){
      return false;
    };
    objet.infectes = function(){
      return 6;
    };
    objet.niveauPanneau = function() {
      return false;
    };
    objet.vitesse = function() {
      return 5;
    };
    objet.vitessejoueur = function() {
      return 10;
    };
    objet.statutAccessible = true;
    objet.collectibleretire = function() {
      // this.objectifCollectibles.recalculer(); ????
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

function niveau1(create_new = false) {
  return Niveau1Factory.instance(create_new);
}
