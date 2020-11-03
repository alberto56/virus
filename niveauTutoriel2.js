function niveauTutoriel2() {
  var objet = Object.create(niveauTutoriel1());

  objet.getNom = function() {
    return "Niveau Tutoriel 2";
  };
  objet.nombredePoints = function() {
    return 1;
  };
  objet.infectes = function() {
    return 1;
  };
  objet.instructions = function() {
    return "Les points rouges sont contagieux. Évitez-les ou ils vont vous infecter.";
  };
  objet.niveauSuivant = function() {
    return niveauTutoriel3();
  };
  objet.niveauPrecedent = function() {
    return niveauTutoriel1();
  };

  
  return objet;
}
