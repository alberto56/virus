function niveauTutoriel5() {
  var objet = Object.create(niveauTutoriel3());

  objet.getNom = function() {
    return "Niveau Tutoriel 5";
  };
  objet.nombredePoints = function() {
    return 0;
  };
  objet.instructions = function() {
    return "Vous aurez besoin, parfois, de collecter des objets qui vous permettront de compléter le niveau.";
  };
  objet.niveauSuivant = function() {
    return niveauBienvenue();
  };
  objet.niveauPrecedent = function() {
    return niveauTutoriel4();
  };
  objet.preparer = function(jeu) {
    creerCollectibleAvancerTemps(jeu, this);
    creerCollectibleAvancerTemps(jeu, this);
    creerCollectibleAvancerTemps(jeu, this);
    creerCollectibleAvancerTemps(jeu, this);
    creerCollectibleAvancerTemps(jeu, this);
    creerCollectibleAvancerTemps(jeu, this);

    var c = creerCollectibleAvancerTemps(jeu, this);
    c.reapparaitre(3000, 3000)
  };

  return objet;
}
