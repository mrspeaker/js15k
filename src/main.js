var main = {
  init: function () {
    this.game = new Game();
    var c = document.querySelectorAll("canvas");
    var ctx = this.ctx = c[1].getContext("2d");
    ctx.w = c[0].width;
    ctx.h = c[0].height;

    var pc = document.createElement("canvas");
    var p = this.pc = pc.getContext("2d");
    pc.width = p.w = 3000;
    pc.height = p.h = 2000;

    //var p = this.pc = c[0].getContext("2d");
    //p.w = c[1].width;
    //p.h = c[1].height;
    //p.globalAlpha = 0.1;
    //p.globalCompositeOperation = "lighter";

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
    this.game.render(this.ctx, this.pc);
    requestAnimationFrame(this.run);
  }
};
main.init();
