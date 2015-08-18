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

    //p.fillStyle = "hsl(19,50%,50%)";
    //p.globalCompositeOperation = "destination-in";
    //p.fillRect(0, 0, p.w, p.h);
    //p.strokeStyle = "hsl(19, 50%, 90%)";
    p.strokeStyle = "hsla(20, 10%, 30%, 0.3)";
    p.setLineDash([15, 30]);
    p.lineWidth = 2;
    for (var i = 0; i < p.w / 10 | 0; i++) {
      p.beginPath();
      p.moveTo(i * p.w / 10 | 0 + 30, 0);
      p.lineTo(i * p.w / 10 | 0 + 30, p.h);
      p.stroke();
    }
    for (var j = 0; j < p.h / 10 | 0; j++) {
      p.beginPath();
      p.moveTo(0, j * p.h / 10 + 20 | 0);
      p.lineTo(p.w, j * p.h / 10 + 10 | 0);
      p.stroke();
    }


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
