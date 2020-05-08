function niveauAbstrait() {
  return {
    objectifs: [],

    activerObjectifs: function() {
      this.objectifs.forEach(function (e) {
        e.activer();
      });
    },

    collectibleretire: function() {

    }
  }
}
