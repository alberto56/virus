var ControlleurFactory = (function () {
  var instance;

  function createInstance() {
    return {
      niveauActuel: niveau1(),

      commencerJeu: function() {
        this.montrerPanneau('ecran-de-bienvenue');
        accepterBarreEspacement();

        var jeuDeBienvenue = creerNouveauJeu('.jeu', {
          getNom: function() {
            return 'Bienvenue';
          }
        }, '.ecran-de-bienvenue');

        $('.ecran-de-bienvenue .jeu .infos').remove();
        $('.ecran-de-bienvenue .jeu').css('background', 'none');

        var that = this;
        $('.bouton-prochain-niveau').off().click(function() {
          $('.ecran-de-bienvenue .jeu').remove();
          that.commencerNiveau(niveau1());
        });
        $('.bouton-niveau-tutoriel').off().click(function() {
          $('.ecran-de-bienvenue .jeu').remove();
          that.commencerNiveau(niveauTutoriel1());
        });
        $('.bouton-selection-niveau').off().click(function() {
          $('.ecran-de-bienvenue .jeu').remove();
          that.montrerPanneau('selection-niveau');
        });
        $('.bouton-niveau-1').off().click(function() {
          $('.selection-niveau .jeu').remove();
          that.commencerNiveau(niveau1());
        });
        $('.bouton-niveau-2').off().click(function() {
          $('.selection-niveau .jeu').remove();
          that.commencerNiveau(niveau2());
        });
        $('.bouton-niveau-3').off().click(function() {
          $('.selection-niveau .jeu').remove();
          that.commencerNiveau(niveau3());
        });
        $('.bouton-niveau-4').off().click(function() {
          $('.selection-niveau .jeu').remove();
          that.commencerNiveau(niveau4());
        });
        $('.bouton-niveau-5').off().click(function() {
          $('.selection-niveau .jeu').remove();
          that.commencerNiveau(niveau5());
        });


        for (i = 0; i < 10; ++i) {
          var point = creerPoint(jeuDeBienvenue, niveauBienvenue());
          point.creerNouveau();
          point.objet.css('height', '52px');
          point.objet.css('width', '52px');
          point.objet.css('background', 'none');
          point.objet.css('background-image', 'url(images/virus-rose.png)');
          point.objet.attr('data-vitesse', 1);
          point.placerAleatoire();
          point.choisirDestination();
          point.bouger($('.ecran-de-bienvenue'));
        }
      },

      montrerPanneau: function(panneau) {
        $('.panneau-jeu .jeu').remove();
        $('.panneau').hide();
        $('.' + panneau).show();
      },

      gameOver: function() {
        this.montrerPanneau('game-over');

        var that = this;
        setTimeout(function() {
          var that2 = that;

          var label = 'Recommencez au '+ that2.niveauActuel.getNom();

          $('.game-over .bouton-prochain-niveau').html(label).show().off().click(function() {
            that2.commencerNiveau(that2.niveauActuel);
            $('.cache-pour-une-seconde').hide();
          });
        }, 1050);
      },

      jeu: false,

      creerObstaclesrebords: function(niveau, thickness){
        // (jeu, this, left, width, top, height)
        creerObstacle(this.jeu, niveau, 0, thickness, 0, this.jeu.getBottom());
        creerObstacle(this.jeu, niveau, thickness, this.jeu.getRight() - thickness*2, 0,  thickness);
        creerObstacle(this.jeu, niveau, this.jeu.getRight() - thickness, thickness, 0, this.jeu.getBottom());
        creerObstacle(this.jeu, niveau, thickness, this.jeu.getRight() - thickness*2, this.jeu.getBottom() - thickness,  thickness);},

      commencerNiveau: function(niveau) {
        this.niveauActuel = niveau;

        if (niveau.niveauPanneau()) {
          this.montrerPanneau(niveau.getPanneau());
          return;
        }

        this.montrerPanneau('panneau-jeu');
        $('.panneau-jeu .jeu').remove();
        this.jeu = creerNouveauJeu('.jeu', niveau);

        $('.panneau-jeu .instructions .texte').html(niveau.instructions());
        $('.panneau-jeu .nombre-de-vies').html(niveau.vies());
        if (niveau.tutoriel()) {
          $('.panneau-jeu .niveau-non-tutoriel').remove();
          var that = this;
          $('.retour-bienvenue').off().click(function() {
            $('.panneau-jeu .jeu').remove();
            that.montrerPanneau('ecran-de-bienvenue');
          });
          if (niveau.niveauPrecedent()) {
            var that = this;
            $('.panneau-jeu .tutoriel-precedent').off().click(function() {
              $('.panneau-jeu .jeu').remove();
              that.commencerNiveau(niveau.niveauPrecedent());
            });
          }
          else {
            $('.panneau-jeu .tutoriel-precedent').remove();
          }
          if (niveau.niveauSuivant()) {
            var that = this;
            $('.panneau-jeu .tutoriel-suivant').off().click(function() {
              $('.panneau-jeu .jeu').remove();
              that.commencerNiveau(niveau.niveauSuivant());
            });
          }
          else {
            $('.panneau-jeu .tutoriel-suivant').remove();
          }
        }
        else {
          $('.panneau-jeu .instructions').remove();
        }

        var joueur = creerPoint(this.jeu, niveau);
        joueur.creerNouveau();
        niveau.placerJoueur(joueur);
        joueur.devenirJoueur();

        for (i = 0; i < niveau.nombredePoints(); ++i) {
          var point = creerPoint(this.jeu, niveau);
          point.creerNouveau();
          point.placerAleatoire();
          if (i < niveau.infectes()) {
            point.infecter(100/100);
          }
          else if (i < niveau.asymptomatique()) {
            point.devenirAsymptomatique(100/100);
          }
          point.choisirDestination();
          point.bouger($('.panneau-jeu'));
        }

        // if (!niveau.tutoriel()) {
        //   utilitaires().setInfo('temps-restant', niveau.duree());
        //   this.continuerDecompte(1);
        // }

        niveau.preparer(this.jeu);
        niveau.activerObjectifs();
      }
    };
  }

  return {
    instance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

function controlleur() {
  return ControlleurFactory.instance();
}
