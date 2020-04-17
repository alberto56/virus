function creerNouveauJeu(selecteur) {
  return {
    objet: $('.jeu.modele').clone().removeClass('modele').appendTo('body'),

    jeuInterne: function() {
      return this.objet.find('.jeu-interne');
    },

    getTop: function() {
      return 0;
    },

    getLeft: function() {
      return 0;
    },

    getBottom: function() {
      return this.objet.height();
    },

    getRight: function() {
      return this.objet.width();
    },

    pointVerticalAleatoire: function(height_du_point) {
      return parseInt(Math.random() * (this.objet.height() - height_du_point));
    },

    pointHorizontalAleatoire: function(width_du_point) {
      return parseInt(Math.random() * (this.objet.width() - width_du_point));
    }
  }
}
