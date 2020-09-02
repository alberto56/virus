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
     * Positionner le point gauche mais seulement si c'est possible.
     *
     * Par exemple, s'il n'y a pas d'obstacle entre le depart et la
     * destination, nous positionnerons l'item à la destination.
     *
     * S'il existe un obstacle entre le départ et la destination, le point
     * avancera jusqu'à l'obstacle. Ceci veut dire que:
     *
     * * Si la destination est supérieure au départ: la gauche du point sera
     *   équivalent de la gauche de l'obstacle moins la largeur du point.
     * * Si la destination est inférieure au départ: la gauche du point sera
     *   équivalent de la droite de l'obstacle.
     * * Si la destination est égale au départ: rien n'est fait.
     *
     * Cette fonction ne retourne pas de valeur.
     *
     * @param destination_left
     *   Là où le point veut aller. Il ne s'y rendra pas nécessairement, par
     *   exemple s'il y a un obstacle dans son chemin.
     * @param dep_left
     *   La où le point commence (sa position actuelle).
     * @param top
     *   La position verticale du point, ou le haut du point, tant à son départ
     *   qu'à son arrivée, puisque cette fonction est conçue pour des
     *   déplacements en ligne droite seulement.
     */
    setLeftIfPossible: function(destination_left, dep_left, top) {
      if (destination_left == dep_left) {
        return;
      }

      console.log('Nous allons tenter de bouger horizontalement si possible');

      var destination_left_reelle = destination_left;

      console.log('Nous sommes à ' + dep_left + ', ' + top);
      console.log('Nous voulons aller à ' + destination_left + ', ' + top + ", mais il se peut qu'il y ait un obstacle!");

      var that = this;
      this.jeu.getObstacles().each(function () {
        var largeur_de_lobstacle = $(this).width();
        var hauteur_de_lobstacle = $(this).height();
        var largeur_du_joueur = that.objet.width();
        var hauteur_du_joueur = that.objet.height();

        var b = $(this).position().top;
        var gauche_de_lobstacle = $(this).position().left;
        var d = ($(this).position().left + largeur_de_lobstacle);
        var t = ($(this).position().top + hauteur_du_joueur);

        console.log("Le left de l'obstacle est à " + gauche_de_lobstacle);
        console.log("La largeur du joueur est " + largeur_du_joueur);


        console.log("Nous vérifions si l'obstacle à top: " + t + ", droite: " + d + ", bottom: " + b + ", gauche: " + gauche_de_lobstacle + " est dans notre chemin");

        bloque = utilitaires().obstacleBloqueChemin(dep_left + largeur_du_joueur, top, destination_left_reelle, top, t, b, gauche_de_lobstacle, d);

        console.log("En voulant aller de " + dep_left + ", " + top + " à " + destination_left_reelle + ", " + top + "; " + "nous constatons que l'obstacle " + (bloque ? "bloque notre chemin" : "ne bloque pas notre chemin"));

        var destination_left_reelle_candidat = destination_left_reelle;

        if(bloque && destination_left_reelle > dep_left){
          destination_left_reelle_candidat = gauche_de_lobstacle - largeur_du_joueur
          console.log("On est bloque! notre destination (candidat) devient " + destination_left_reelle_candidat);
        }
        else if(bloque && destination_left_reelle < dep_left){
          destination_left_reelle_candidat = d
        }

        if(utilitaires().chiffreEntreDeuxChiffres(dep_left, destination_left_reelle, destination_left_reelle_candidat)){
          destination_left_reelle = destination_left_reelle_candidat
        }

      });

      console.log('En tenant compte des obstacles, notre destination est ' +  + destination_left_reelle + ', ' + top);

      this.setLeft(destination_left_reelle);
    },

    setTopIfPossible: function(destination_top) {
      this.setTop(destination_top);
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
        this.objet.css('background-color', 'transparent');
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

    devenirInvincible: function(temps) {
      if (temps > 0) {
        if (this.objet.attr('data-invincible') == 'non') {
          this.objet.attr('data-invincible', 'oui');
          this.clignoter();
        }
        var that = this;
        setTimeout(function() {
          that.devenirInvincible(utilitaires().getEnPause() ? temps : (temps - 100));
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
              ControlleurFactory.instance().gameOver();
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
      this.utiliserBalise($('.point.modele').clone().removeClass('modele').attr('data-vitesse', this.niveau.vitesse()).css('height', parseInt(8 + Math.random() * 5) + 'px').css('width', parseInt(8 + Math.random() * 5) + 'px'));
    },

    enTrainDavancer: {
      right: false,
      left: false,
      up: false,
      down: false,
    },

    doitAvancer: function(dir){
      if (!this.enTrainDavancer[dir]) {
        return false;
      }
      switch (dir) {
        case 'left':
          return !this.enTrainDavancer.right;
        case 'right':
          return !this.enTrainDavancer.left;
        case 'up':
          return !this.enTrainDavancer.down;
        case 'down':
          return !this.enTrainDavancer.up;
        default:
          return false;
      }
    },

    joueurContinuerAvancer: function(dir) {
      if (!this.doitAvancer(dir)) {
        return;
      }

      if(dir == 'right'){
        var left_a = this.objet.position().left;
        var left_b = left_a + this.niveau.vitessejoueur();
        this.setLeftIfPossible(left_b, left_a, this.objet.position().top);
      }
      if(dir == 'left'){
        var left_a = this.objet.position().left;
        var left_b = left_a - this.niveau.vitessejoueur();
        this.setLeftIfPossible(left_b, left_a, this.objet.position().top);
      }
      if(dir == 'up'){
        var top_a = this.objet.position().top;
        var top_b = top_a - this.niveau.vitessejoueur();
        this.setTopIfPossible(top_b);
      }
      if(dir == 'down'){
        var top_a = this.objet.position().top;
        var top_b = top_a + this.niveau.vitessejoueur();
        this.setTopIfPossible(top_b);
      }
      var that = this;
      setTimeout(function() {
        that.joueurContinuerAvancer(dir);
      }, this.niveau.endurancejoueur());

    },

    DevenirControlable: function() {
      var that = this;
      $('body').keydown(function(e){
        if (utilitaires().getEnPause()) {
          return;
        }
        var dir = utilitaires().mapKeycodeDir(e.keyCode);

        that.enTrainDavancer[dir] = true;
        that.joueurContinuerAvancer(dir);
      });
      $('body').keyup(function(e){
        that.enTrainDavancer[utilitaires().mapKeycodeDir(e.keyCode)] = false;
      });
    }

  };
}
