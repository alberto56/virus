function creerPoint(jeu, niveau) {
  return {
    attente: 50,

    largeur: function() {
      return this.objet.width();
    },

    hauteur: function() {
      return this.objet.height();
    },

    niveau: niveau,

    rayon_infection: 20,

    // objet: $('.point.modele').clone().removeClass('modele').css('background-color', Math.floor(Math.random()*16777215).toString(16)),

    objet: false,

    jeu: jeu,

    utiliserBalise: function(balise) {
      this.objet = balise;
    },

    placerAleatoire: function() {
      this.objet.appendTo(this.jeu.jeuInterne());
      this.setTop(this.pointVerticalAleatoire());
      this.setLeft(this.pointHorizontalAleatoire());
    },

    placerCentre: function() {
      this.objet.appendTo(this.jeu.jeuInterne());
      this.setTop(this.pointVerticalCentre());
      this.setLeft(this.pointHorizontalCentre());
    },

    devenirJoueur: function() {
      this.objet.css('background-color', 'white');
      this.objet.attr('data-joueur', 'oui');
      this.DevenirControlable() ;
      this.devenirInvincible(niveau.invincibleDebut());
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
      this.objet.attr('data-dest-v', this.pointVerticalAleatoire());
      this.objet.attr('data-dest-h', this.pointHorizontalAleatoire());
    },

    pointVerticalAleatoire: function() {
      return this.jeu.pointVerticalAleatoire(this.hauteur());
    },

    pointHorizontalAleatoire: function() {
      return this.jeu.pointHorizontalAleatoire(this.largeur());
    },

    pointVerticalCentre: function() {
      return this.jeu.pointVerticalCentre(this.hauteur());
    },

    pointHorizontalCentre: function() {
      return this.jeu.pointHorizontalCentre(this.largeur());
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

    devenirInvincible: function(temps, clignoter = true) {
      if (temps > 0) {
        this.objet.attr('data-invincible', 'oui');
        if (clignoter) {
          this.clignoter();
        }
        var that = this;
        setTimeout(function() {
          that.devenirInvincible(utilitaires().getEnPause() ? temps : (temps - 100), false);
        }, 100);
      }
      else {
        this.objet.attr('data-invincible', 'non');
      }
    },

    devenirAsymptomatique: function(chance) {
      if (Math.random() < chance) {
        this.objet.attr('data-asymptomatique', 'oui');
        this.objet.css('background-color', 'yellow');
      }
    },

    infecter: function(chance) {
      if (Math.random() < chance) {
        if (this.objet.attr('data-joueur') == 'oui') {
          if (this.objet.attr('data-invincible') == 'non') {
            this.devenirInvincible(3000);
            nombredevies=utilitaires().getInfo('nombre-de-vies');
            utilitaires().setInfo('nombre-de-vies', --nombredevies)
            if (nombredevies==0)  {
              $('.point').attr('data-vitesse', 0);
              controlleur().gameOver();
            }
          }
        }
        else {
          if (this.objet.attr('data-asymptomatique') != 'oui') {
            this.objet.css('background-color', 'red');
          }
          this.objet.attr('data-infecte', 'oui');
          return true;
        }
      }
      return false;
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

    bouger: function(contexte) {

      if (!utilitaires().getEnPause()) {
        var top_a = this.objet.position().top;
        var left_a = this.objet.position().left;
        var top_b = this.objet.attr('data-dest-v');
        var left_b = this.objet.attr('data-dest-h');

        if (top_a == top_b && left_a == left_b) {
          this.choisirDestination();
          this.bouger(contexte);
          return;
        }

        this.setTop(utilitaires().bougerVers(top_a, top_b, this.objet.attr('data-vitesse')));
        this.setLeft(utilitaires().bougerVers(left_a, left_b, this.objet.attr('data-vitesse')));

        this.infecterVoisins();
      }
      if (contexte.is(":visible")) {
        var that = this;
        setTimeout(function() {
          that.bouger(contexte);
        }, this.attente);
      }
    },

    creerNouveau: function() {
      this.utiliserBalise($('.point.modele').clone().removeClass('modele').attr('data-vitesse', 5).css('height', parseInt(8 + Math.random() * 5) + 'px').css('width', parseInt(8 + Math.random() * 5) + 'px'));
    },

    DevenirControlable: function() {
          var that = this;
          $('body').keyup(function(e){
            if (utilitaires().getEnPause()) {
              return;
            }
            if(e.keyCode == 39){
              // user has pressed right arrow
              var left_a = that.objet.position().left;
              var left_b = left_a + 10;
              that.setLeft(left_b);
            }
            if(e.keyCode == 37){
              // user has pressed left arrow
              var left_a = that.objet.position().left;
              var left_b = left_a - 10;
              that.setLeft(left_b);
            }
            if(e.keyCode == 38){
              // user has pressed up arrow
              var top_a = that.objet.position().top;
              var top_b = top_a - 10;
              that.setTop(top_b);
            }
            if(e.keyCode == 40){
              // user has pressed down arrow
              var top_a = that.objet.position().top;
              var top_b = top_a + 10;
              that.setTop(top_b);
            }
          });
    }

  };
}
