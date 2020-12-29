var MusiqueFactory = (function () {
  var instance;

  function createInstance() {
    var objet = Object.create(sons());

    objet.pause = function() {
      if(this.audio){
        this.audio.pause()
      }
    }

    objet.audio = false;

    objet.prePlay = function(audio) {
      this.pause()
      audio.loop = true
      this.audio = audio
    };

    return objet;

  }

  return {
    instance: function (create_new) {
      if (!instance) {
        instance = createInstance();
      }
      if (create_new) {
        return createInstance();
      }
      return instance;
    }
  };
})();

function musique(create_new = false) {
  return MusiqueFactory.instance(create_new);
}
