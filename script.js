$(document).ready(function () {
  accepterBarreEspacement();
  var jeu = creerNouveauJeu('.jeu');
  for (i = 0; i < 100; i++) {
    var point = creerNouveauPoint(jeu);
    point.placerAleatoire();
    point.choisirDestination();
    point.infecter(2/100);
    point.bouger();
  }
});

function accepterBarreEspacement() {
  $('body').keyup(function(e){
     if(e.keyCode == 32){
       // user has pressed space
       if ($('.point').attr('data-vitesse') == "0") {
         $('.point').attr('data-vitesse', 5);
         alert("Votre jeu n'est plus en pause");
       }
       else {
         $('.point').attr('data-vitesse', 0);
         alert('Votre jeu est en pause');
       }
     }
  });
}

function creerNouveauJeu(selecteur) {
  return {
    objet: $('.jeu.modele').clone().removeClass('modele').appendTo('body'),

    pointVerticalAleatoire: function() {
      return parseInt(Math.random() * this.objet.height());
    },

    pointHorizontalAleatoire: function() {
      return parseInt(Math.random() * this.objet.width());
    }
  }
}

function creerNouveauPoint(jeu) {
  return {
    attente: 1,

    rayon_infection: 20,

    // objet: $('.point.modele').clone().removeClass('modele').css('background-color', Math.floor(Math.random()*16777215).toString(16)),

    objet: $('.point.modele').clone().removeClass('modele').attr('data-vitesse', 5),

    jeu: jeu,

    placerAleatoire: function(point) {
      this.objet.appendTo(this.jeu.objet);
      this.objet.css('top', this.jeu.pointVerticalAleatoire());
      this.objet.css('left', this.jeu.pointHorizontalAleatoire());
    },

    choisirDestination: function() {
      this.objet.attr('data-dest-v', this.jeu.pointVerticalAleatoire());
      this.objet.attr('data-dest-h', this.jeu.pointHorizontalAleatoire());
    },

    infecter: function(chance) {
      if (Math.random() < chance) {
        this.objet.css('background-color', 'red');
        this.objet.attr('data-infecte', 'oui');
      }
    },

    infecterVoisins: function() {
      var top = this.objet.position().top;
      var left = this.objet.position().left;

      if (this.objet.attr('data-infecte') == 'oui') {
        utilitaires().trouverVoisins(top, left, this.rayon_infection).css('background-color', 'red').attr('data-infecte', 'oui');
      }
    },

    bouger: function() {
      var top_a = this.objet.position().top;
      var left_a = this.objet.position().left;
      var top_b = this.objet.attr('data-dest-v');
      var left_b = this.objet.attr('data-dest-h');

      if (top_a == top_b && left_a == left_b) {
        this.choisirDestination();
        this.bouger();
        return;
      }

      this.objet.css('top', utilitaires().bougerVers(top_a, top_b, this.objet.attr('data-vitesse')) + 'px');
      this.objet.css('left', utilitaires().bougerVers(left_a, left_b, this.objet.attr('data-vitesse')) + 'px');

      this.infecterVoisins();

      var that = this;
      setTimeout(function() {
        that.bouger();
      }, this.attente);
    },

  };
}
