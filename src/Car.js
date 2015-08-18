var oneBlock = 4;
var halfBlock = oneBlock / 2;


function Car () {
  this.x = 0;
  this.y = 0;
  this.w = 30;
  this.h = 50;
  this.angle = Math.PI;
  this.vel = 0;
  this.acc = 0;
  this.angVel = 0;
  this.angAcc = 0;
  this.isPlayer = false;
  this.active = true;
  this.hitAt = Date.now();

  var max = 10;
  this.body = [
    [0, 0, max], [0, 0, max],
    [0, 0, max], [0, 0, max],
    [0, 0, max], [0, 0, max]
  ];
  this.calcBody();
}
Car.prototype = {
  calcBody: function (tick) {
    if (this.tick === tick) {
      return;
    }
    this.tick = tick;
    // Calc pos of all parts.
    var a = this.angle;
    var c = [this.x - oneBlock, this.y - oneBlock];

    [
      [-halfBlock, -halfBlock], [+halfBlock, -halfBlock],
      [-halfBlock, +halfBlock], [+halfBlock, +halfBlock],
      [-halfBlock, +halfBlock + oneBlock], [+halfBlock, +halfBlock + oneBlock],
    ].map(function (bo, i) {
      var bx = bo[0];
      var by = bo[1];

      var rx = bx * Math.cos(a) - by * Math.sin(a);
      var ry = bx * Math.sin(a) + by * Math.cos(a);

      var b = this.body[i];
      b[0] = c[0] + rx + halfBlock;
      b[1] = c[1] + ry + halfBlock;
    }, this);

  },
  update: function (dt, keys, tick) {

    var accThrust = 0.5;
    var angAccThrust = 0.009;
    var drag = 0.99;
    var angDrag = 0.88;

    if (this.active) {
      if (keys[38]) { this.acc += accThrust; }
      if (keys[40]) { this.acc -= accThrust; }
      if (keys[37]) {
        this.angAcc -= angAccThrust; // * (this.vel / 8);
      }
      if (keys[39]) {
        this.angAcc += angAccThrust; // * (this.vel / 8);
      }
    }

    var velo = this.vel + this.acc;
    this.vel = velo > 0 ? Math.min(velo, 3) : Math.max(velo, -3);
    this.acc = 0;
    this.vel *= drag;

    this.angVel += this.angAcc;
    this.angAcc = 0;
    this.angVel *= angDrag;
    this.angle += this.angVel;

    this.x += Math.cos(this.angle - Math.PI / 2) * this.vel;
    this.y += Math.sin(this.angle - Math.PI / 2) * this.vel;
    this.calcBody(tick);

    return;
    if (this.x < 0) {
      this.x += 5;
      //this.angle -= Math.PI;
      this.vel = -this.vel;
    }
    if (this.y < 0) {
      this.y += 5;
      //this.angle -= Math.PI;
      this.vel = -this.vel;
    }
    if (this.x > 640) {
      this.y -= 5;
      //this.angle -= Math.PI;
      this.vel = -this.vel;
    }
    if (this.y > 300) {
      this.y -= 5;
      //this.angle -= Math.PI;
      this.vel = -this.vel;
    }

  },
  explode: function () {
    this.active = false;
  },

  render: function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    /*
    if (this.isPlayer) {
      ctx.strokeStyle = this.isPlayer ? "#7f7" : "#888";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 12 + (Math.sin(Date.now() / 100)), 0, Math.PI * 2, false);
      ctx.stroke();
    }*/

    ctx.fillStyle = "#000";
    ctx.fillRect(-oneBlock - 1, -oneBlock - 1, oneBlock * 2 + 2, oneBlock * 3 + 2);
    ctx.fillStyle = "#111";
    ctx.fillRect(-oneBlock, -oneBlock - 2, oneBlock * 2, 2);
    ctx.restore();

    this.active && this.body.forEach(function (p, i) {
      var row = i / 2 | 0;
      var col = i % 2;
      var op = row === 0 ? 60 : row === 2 ? 50 : 30;
      ctx.fillStyle = this.isPlayer ? "hsl(150,50%," + op + "%)" : "hsl(20,50%," + op + "%)";
      ctx.fillRect(this.body[i][0], this.body[i][1], oneBlock, oneBlock);

    }, this);

  },
  press: function () {
    if (this.vel > 0.1) {
      this.angle += (Math.PI);
    } else {
      this.acc = 3;
    }

  }
};
