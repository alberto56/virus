function niveauTutoriel3() {
  var objet = Object.create(niveauTutoriel1());

  objet.getNom = function() {
    return "Niveau Tutoriel 3";
  };
  objet.nombredePoints = function() {
    return 50;
  };
  objet.infectes = function() {
    return 1;
  };
  objet.instructions = function() {
    return "Les points verts sont inoffensifs mais peuvent se faire infecter en passant à proximité des points rouges et vont à leur tour devenir contagieux.";
  };
  objet.tutoriel = function() {
    return true;
  };
  objet.invincibleDebut = function() {
    return 0;
  };
  objet.niveauSuivant = function() {
    return niveauTutoriel4();
  };
  objet.niveauPrecedent = function() {
    return niveauTutoriel2();
  };

  return objet;
}
