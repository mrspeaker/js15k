var main = {
  init: function () {
    this.game = new Game();
    var c = document.querySelector("#canvas");
    var ctx = this.ctx = c.getContext("2d");
    ctx.w = c.width;
    ctx.h = c.height;

    var keys = {};
    document.addEventListener("keydown", function (e) {
      keys[e.which] = true;
    }, false);
    document.addEventListener("keyup", function (e) {
      keys[e.which] = false;
    }, false);
    var self = this;
    document.addEventListener("mousedown", function (e) {
      self.game.press(e);
    }, false);
    this.keys = keys;

    this.tick = 0;
    this.run = this.run.bind(this);
    this.run();
  },
  run: function (t) {
    this.game.update(1000 / 60, this.keys, this.tick++);
    this.game.render(this.ctx);
    requestAnimationFrame(this.run);
  }
};
main.init();
