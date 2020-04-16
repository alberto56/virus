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

    largeur: function() {
      return this.objet.width();
    },

    hauteur: function() {
      return this.objet.height();
    },

    rayon_infection: 20,

    // objet: $('.point.modele').clone().removeClass('modele').css('background-color', Math.floor(Math.random()*16777215).toString(16)),

    objet: false,

    jeu: jeu,

    utiliserBalise: function(balise) {
      this.objet = balise;
    },

    placerAleatoire: function() {
      this.objet.appendTo(this.jeu.jeuInterne());
      this.setTop(this.jeu.pointVerticalAleatoire());
      this.setLeft(this.jeu.pointHorizontalAleatoire());
    },

    devenirJoueur: function() {
      this.objet.css('background-color', 'white');
      this.objet.attr('data-joueur', 'oui');
      DevenirControlable( this  ) ;



    },

    /**
     * destination_left est un chiffre, par exemple 800, -2000.
     */
    setLeft: function(destination_left) {
      min_largeur = this.jeu.getLeft(); // ex. 0
      max_largeur = this.jeu.getRight() - this.largeur(); // ex. 400

      destination_left = Math.max(destination_left, min_largeur);
      destination_left = Math.min(destination_left, max_largeur);

      this.objet.css('left', destination_left + 'px');
    },

    setTop: function(destination_top) {
      min_hauteur = this.jeu.getTop(); // ex. 0
      max_hauteur = this.jeu.getBottom() - this.hauteur(); // ex. 400

      destination_top = Math.max(destination_top, min_hauteur);
      destination_top = Math.min(destination_top, max_hauteur);

      this.objet.css('top', destination_top + 'px');
    },

    choisirDestination: function() {
      this.objet.attr('data-dest-v', this.jeu.pointVerticalAleatoire());
      this.objet.attr('data-dest-h', this.jeu.pointHorizontalAleatoire());
    },

    clignoter: function() {
      if (this.objet.attr('data-invincible') == 'non') {
        this.objet.css('background-color', 'white');
        return;
      }

      // à ce stade nous sommes invincible.

      if (this.objet.attr('data-clignotement') == 'visible') {
        this.objet.css('background-color', 'black');
        this.objet.attr('data-clignotement', 'invisible');
      }
      else {
        this.objet.css('background-color', 'white');
        this.objet.attr('data-clignotement', 'visible');
      }

      var that = this;
      setTimeout(function() {
        that.clignoter();
      }, 50);
    },

    devenirInvincible: function(devenir) {
      if (devenir) {
        this.objet.attr('data-invincible', 'oui');
        this.clignoter();
      }
      else {
        this.objet.attr('data-invincible', 'non');
      }
    },

    infecter: function(chance) {
      if (Math.random() < chance) {
        if (this.objet.attr('data-joueur') == 'oui') {
          if (this.objet.attr('data-invincible') == 'non') {
            this.devenirInvincible(true);
            var that = this;
            setTimeout(function() {
              that.devenirInvincible(false);
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

      this.setTop(utilitaires().bougerVers(top_a, top_b, this.objet.attr('data-vitesse')));
      this.setLeft(utilitaires().bougerVers(left_a, left_b, this.objet.attr('data-vitesse')));

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
          joueur.setLeft(left_b);
        }
        if(e.keyCode == 37){
          // user has pressed left arrow
          var left_a = joueur.objet.position().left;
          var left_b = left_a - 10;
          joueur.setLeft(left_b);
        }
        if(e.keyCode == 38){
          // user has pressed up arrow
          var top_a = joueur.objet.position().top;
          var top_b = top_a - 10;
          joueur.setTop(top_b);
        }
        if(e.keyCode == 40){
          // user has pressed down arrow
          var top_a = joueur.objet.position().top;
          var top_b = top_a + 10;
          joueur.setTop(top_b);
        }
      });
}
