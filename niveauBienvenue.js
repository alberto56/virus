function niveauBienvenue() {
  var objet = Object.create(niveau1());

  objet.niveauSuivant = function() {
    return false;
  };

  return objet;
}
