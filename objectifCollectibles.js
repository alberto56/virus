function objectifCollectibles(niveau) {
  var objet = Object.create(objectifAbstrait(niveau));

  objet.activer = function() {
    console.log("J'active l'objectif collectibes mais je ne sais comment.");
  }

  return objet;
}
