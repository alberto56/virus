function niveauTutoriel1() {
  var objet = Object.create(niveau1());

  objet.getNom = function() {
    return "Niveau Tutoriel 1";
  };
  objet.nombredePoints = function() {
    return 0;
  };
  objet.instructions = function() {
    return "Vous êtes le point blanc. Vous pouvez bouger avec les flèches.";
  };
  objet.tutoriel = function() {
    return true;
  };
  objet.invincibleDebut = function() {
    return 0;
  };
  objet.preparer = function(jeu) {
    // left, width, top, height
    creerObstacle(jeu, this, 300, 103, 503, 50);
    creerObstacle(jeu, this, 800, 53, 43, 300);
  };
  objet.niveauSuivant = function() {
    return niveauTutoriel2();
  };

  objet.statutAccessible = true;

  objet.niveauPrecedent = function() {
    return false;
  };

  return objet;
}
