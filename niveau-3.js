function niveau3() {
  var objet = Object.create(niveau2());

  objet.getNom = function() {
    return "Niveau 3";
  };
  objet.niveauSuivant = function() {
    return niveau4();
  };
  objet.niveauPrecedent = function() {
    return niveau2();
  };
  objet.nombredePoints = function(){
    return 80;
  };

  return objet;
}
