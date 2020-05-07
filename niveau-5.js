function niveau5() {
  var objet = Object.create(niveau3());

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
  objet.preparer = function(jeu){
    creerCollectibleAvancerTemps(jeu, objet);
  };

  return objet;
}
