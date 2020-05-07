function niveau1() {
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
  objet.niveauPrecedent = function(){
    return false;
  };
  objet.preparer = function(jeu) {
    // Ne rien faire, d'autres niveaux peuvent, par exemple, ajouter des
    // nouvelles fonctionalités comme des collectibles ou autres...
    creerCollectibleAvancerTemps(jeu, this);
  };
  objet.nombredePoints = function(){
    return 66;
  };
  objet.vies = function(){
    return 300;
  };
  objet.instructions = function(){
    return "";
  };
  objet.duree = function() {
    return 800;
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
  }

  objet.objectifs = [objectifTemps(objet)];

  return objet;
}
