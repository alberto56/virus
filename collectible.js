function creerCollectible(jeu, niveau) {
  var objet = Object.create(creerPoint(jeu, niveau));

  objet.utiliserBalise($('.collectible.modele').clone().removeClass('modele'));
  objet.placerAleatoire();

  objet.activer = function() {
  }

  objet.infecterVoisins = function() {
    if(this.objet.css("opacity") == 0){
      return;
    }

    var top = this.objet.position().top;
    var left = this.objet.position().left;
    var that=this
    utilitaires().trouverVoisins(top, left, this.rayon_infection, '.point[data-joueur=oui]').each(function() {
      that.activer()
      that.objet.remove()
      niveau.collectibleretire()
    });
  };


  objet.reapparaitre = function(apparaitre, disparaitre) {
    var attente = this.objet.css("opacity") == 1 ? disparaitre : apparaitre;
    this.placerAleatoire();

    var that = this;
    setTimeout(function() {
      that.objet.css("opacity") == 1 ? that.objet.css('opacity', '0') : that.objet.css('opacity', '1');
      that.reapparaitre(apparaitre, disparaitre)
    }, attente);

  }
  return objet;
}
