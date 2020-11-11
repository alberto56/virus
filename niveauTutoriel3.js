var NiveauTutoriel3Factory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(niveauTutoriel1(true));

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
    objet.niveauSuivant = function() {
      return niveauTutoriel4();
    };
    objet.niveauPrecedent = function() {
      return niveauTutoriel2();
    };

    return objet;

  }

  return {
    instance: function (create_new) {
      if (!instance || create_new) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

function niveauTutoriel3(create_new = false) {
  return NiveauTutoriel3Factory.instance(create_new);
}
