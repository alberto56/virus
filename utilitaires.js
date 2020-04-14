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

    trouverVoisins: function(top, left, rayon) {
    return  $('.point[data-infecte=non]').filter(function() {
        return $(this).position().top <= top + rayon &&
          $(this).position().top >= top - rayon &&
          $(this).position().left <= left + rayon &&
          $(this).position().left >= left - rayon;
      });
    },

    getNombreVies: function() {
      return $('.infos .nombre-de-vies').html();
    },

    setNombreVies: function(vies) {
      return $('.infos .nombre-de-vies').html(vies);
    }
  }
}

// Required for unit tests.
if (typeof module !== "undefined") {
  module.exports = {
    utilitaires: utilitaires
  }
}
