function niveau4() {
  var objet = Object.create(niveau3());

  objet.getNom = function() {
    return "Niveau 4";
  };
  objet.niveauSuivant = function() {
    return niveauPanneau('panneau-final');
  };
  objet.niveauPrecedent = function() {
    return niveau3();
  };
  objet.nombredePoints = function(){
    return 100;
  };
  objet.infectes = function(){
    return 20;
  };

  return objet;
}
