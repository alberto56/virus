function utilitaires() {
  return {
    bougerVers: function(start, dest, vitesse) {
      if (dest > start) {
        return start + Math.min(vitesse, dest - start);
      }
      else if (dest < start) {
        return start + Math.max(vitesse * -1, dest - start);
      }
      else {
        return start;
      }
    },

    trouverVoisins: function(top, left, rayon, identifiant = '.point[data-infecte=non]') {
      return $('.panneau-jeu ' + identifiant).filter(function() {
        return $(this).position().top <= top + rayon &&
          $(this).position().top >= top - rayon &&
          $(this).position().left <= left + rayon &&
          $(this).position().left >= left - rayon;
      });
    },

    getEnPause: function() {
      return $('body').attr('data-en-pause') == 'oui' ? true : false;
    },

    setEnPause: function(pause) {
      $('body').attr('data-en-pause', pause ? 'oui' : 'non');
    },

    getInfo: function(parametre) {
      return $('.infos .' + parametre).html();
    },

    setInfo: function(parametre, valeur) {
      return $('.infos .' + parametre).html(valeur);
    }
  }
}

// Required for unit tests.
if (typeof module !== "undefined") {
  module.exports = {
    utilitaires: utilitaires
  }
}
