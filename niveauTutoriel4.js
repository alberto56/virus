function niveauTutoriel4() {
  var objet = Object.create(niveauTutoriel3());

  objet.getNom = function() {
    return "Niveau Tutoriel 4";
  };
  objet.asymptomatique = function() {
    return 49;
  };
  objet.instructions = function() {
    return "Les points jaunes agissent de la même manière que les points verts mais ne changeront pas de couleurs lorsqu'ils seront infectés.";
  };
  objet.tutoriel = function() {
    return true;
  };
  objet.invincibleDebut = function() {
    return 0;
  };
  objet.niveauSuivant = function() {
    return false;
  };
  objet.niveauPrecedent = function() {
    return niveauTutoriel3();
  };

  return objet;
}
