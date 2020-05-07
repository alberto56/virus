function creerCollectible(jeu, niveau) {
  var objet = Object.create(creerPoint(jeu, niveau));

  objet.utiliserBalise($('.collectible.modele').clone().removeClass('modele'));
  objet.placerAleatoire();

  objet.activer = function() {
  }

  objet.infecterVoisins = function() {
    var top = this.objet.position().top;
    var left = this.objet.position().left;
    var that=this
    utilitaires().trouverVoisins(top, left, this.rayon_infection, '.point[data-joueur=oui]').each(function() {
      console.log('ça marche!')
      that.activer()
      that.objet.remove()
    });
  };

  return objet;
}
