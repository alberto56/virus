$(document).ready(function () {
  accepterBarreEspacement();
  var jeu = creerNouveauJeu('.jeu');

  var joueur = creerNouveauPoint(jeu);
  joueur.placerAleatoire();
  joueur.devenirJoueur();

  for (i = 0; i < 66; i++) {
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

    jeuInterne: function() {
      return this.objet.find('.jeu-interne');
    },

    pointVerticalAleatoire: function() {
      return parseInt(Math.random() * this.objet.height());
    },

    pointHorizontalAleatoire: function() {
      return parseInt(Math.random() * this.objet.width());
    }
  }
}

function creerNouveauPoint(jeu) {
  point = creerPoint(jeu);
  point.utiliserBalise($('.point.modele').clone().removeClass('modele').attr('data-vitesse', 5));
  return point;
}

function creerPoint(jeu) {
  return {
    attente: 1,

    rayon_infection: 20,

    // objet: $('.point.modele').clone().removeClass('modele').css('background-color', Math.floor(Math.random()*16777215).toString(16)),

    objet: false,

    jeu: jeu,

    utiliserBalise: function(balise) {
      this.objet = balise;
    },

    placerAleatoire: function() {
      this.objet.appendTo(this.jeu.jeuInterne());
      this.objet.css('top', this.jeu.pointVerticalAleatoire());
      this.objet.css('left', this.jeu.pointHorizontalAleatoire());
    },

    devenirJoueur: function() {
      this.objet.css('background-color', 'white');
      this.objet.attr('data-joueur', 'oui');
      DevenirControlable( this  ) ;



    },

    choisirDestination: function() {
      this.objet.attr('data-dest-v', this.jeu.pointVerticalAleatoire());
      this.objet.attr('data-dest-h', this.jeu.pointHorizontalAleatoire());
    },

    infecter: function(chance) {
      if (Math.random() < chance) {
        if (this.objet.attr('data-joueur') == 'oui') {
          if (this.objet.attr('data-invincible') == 'non') {
            this.objet.attr('data-invincible', 'oui');
            this.objet.css('background-color', 'blue');
            var that = this;
            setTimeout(function() {
              that.objet.attr('data-invincible', 'non');
              that.objet.css('background-color', 'white');
            }, 3000);
            nombredevies=utilitaires().getNombreVies();
            utilitaires().setNombreVies(--nombredevies)
            if (nombredevies==0)  {
              $('.point').attr('data-vitesse', 0);
              alert('VOUS AVEZ PERDU');
              this.objet.attr('data-infecte', 'oui');
            }
          }
        }
        else {
          this.objet.css('background-color', 'red');
          this.objet.attr('data-infecte', 'oui');
        }
      }
    },

    infecterVoisins: function() {
      var top = this.objet.position().top;
      var left = this.objet.position().left;

      if (this.objet.attr('data-infecte') == 'oui') {
        utilitaires().trouverVoisins(top, left, this.rayon_infection).each(function() {
          point = creerPoint(this.jeu);
          point.utiliserBalise($( this ));
          point.infecter(100/100);
        });
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

function DevenirControlable(joueur) {
      $('body').keyup(function(e){
        if(e.keyCode == 39){
          // user has pressed right arrow
          var left_a = joueur.objet.position().left;
          var left_b = left_a + 10;
          joueur.objet.css('left', left_b + 'px');
        }
        if(e.keyCode == 37){
          // user has pressed left arrow
          var left_a = joueur.objet.position().left;
          var left_b = left_a - 10;
          joueur.objet.css('left', left_b + 'px');
        }
        if(e.keyCode == 38){
          // user has pressed up arrow
          var top_a = joueur.objet.position().top;
          var top_b = top_a - 10;
          joueur.objet.css('top', top_b + 'px');
        }
        if(e.keyCode == 40){
          // user has pressed down arrow
          var top_a = joueur.objet.position().top;
          var top_b = top_a + 10;
          joueur.objet.css('top', top_b + 'px');
        }
      });
}
