function niveau2() {
  var objet = Object.create(niveau1());

  objet.getNom = function() {
    return "Niveau 2";
  };
  objet.asymptomatique = function() {
    return 30;
  };
  objet.niveauSuivant = function() {
    return false;
  };
  objet.niveauPrecedent = function() {
    return niveau1();
  };

  return objet;
}
