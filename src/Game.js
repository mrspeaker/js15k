function Game () {
  this.cars = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ].
  map(function () {
    return new Car();
  })
  .map(function (c, i) {
    if (i === 0) {
      c.x = 500 + 400;
      c.y=200 + 400;
      c.angle = -Math.PI /2;
      return c;
    }
    c.x = Math.cos(i/3) * 120 + 300 + 400;
    c.y = Math.sin(i/3) * 80 + 150 + 400;
    //c.angle = Math.random() * Math.PI * 2;
    return c;
  });

  this.splode = [];
}
Game.prototype = {

  update: function (dt, keys, tick) {
    this.cars.forEach(function (c1, i) {
      c1.update(dt, i === 0 ? keys : {}, tick);
      c1.isPlayer = i === 0;
      // TODO: checks both ways.
      this.cars.forEach(function (c2) {
        if (c2 === c1) { return; }
        // Check coll...
        var dx = c1.x - c2.x;
        var dy = c1.y - c2.y;
        if (dy * dy + dx * dx < 800) {
          this.check(c1, c2);
        }
      }, this);
    }, this);

    this.splode = this.splode.filter(function (s) {
      return s.update(dt);
    });

    if (Math.random() < 0.01) {
    //  this.cars[Math.random() * this.cars.length | 0].acc = 2;
    }
  },

  render: function (c, p) {
    c.globalCompositeOperation = "source-over";
    c.clearRect(0, 0, c.w, c.h);

    /*
    p.fillStyle = "hsl(19,50%,50%)";
    //p.globalCompositeOperation = "destination-in";
    p.fillRect(0, 0, p.w, p.h);
    p.fillStyle = "hsl(19, 50%, 20%)";
    for (var i = 0; i < p.w / 10 | 0; i++) {
      for (var j = 0; j < p.h / 10 | 0; j++) {
        p.fillRect(i * p.w / 10 | 0, j * p.h / 10 | 0, 10, 10);
      }
    }*/

    //p.globalCompositeOperation = "lighter";
    var center = [-this.cars[0].x + 320, -this.cars[0].y + 150];
    //center[0] = Math.max(0, center[0]);
    //center[1] = Math.max(0, center[1]);
    c.drawImage(p.canvas, Math.max(0, this.cars[0].x - 320), Math.max(0, this.cars[0].y - 150), c.w, c.h, 0, 0, c.w, c.h);
    c.save();
    //c.scale(2, 2);
    c.translate(center[0], center[1]);
    //p.translate(-this.cars[0].x + 320, -this.cars[0].y + 150);
    p.fillStyle = "hsla(" + ((Math.random() * 30 | 0) + 200) + ", 10%, 20%, 0.5)";
    this.cars.forEach(function (car) {
      car.render(c);

      if (Math.abs(car.angVel) > 0 && (Math.abs(car.velX) > 0 && Math.abs(car.velY) > 0)) {
        var s = Math.random() *
          (Math.min(10, Math.abs(car.angVel) * 20)) *
          (((Math.abs(car.velX) + Math.abs(car.velY)) / 2) * 1.5);
        p.beginPath();
        p.arc(car.x, car.y, s, 0, Math.PI * 2, false);
        p.fill();
      }
    });
    c.globalCompositeOperation = "lighter";

    this.splode.forEach(function (s) {
      s.render(c);
    });
    c.restore();

  },

  check: function (c1, c2) {
    var hits1 = [];
    var hits2 = [];

    // Check all parts
    for (var i = 0; i < 6; i++) {
      var b1 = c1.body[i];
      //if (!b1[2]) continue;

      for (var j = 0; j < 6; j++) {
        var b2 = c2.body[j];
        //if (!b2[2]) continue;

        var dx = b1[0] - b2[0];
        var dy = b1[1] - b2[1];
        if (Math.sqrt(dx * dx + dy * dy) < 4) {
          hits1.push(i);
          hits2.push(j);
          this.splode.push(
            new Particle(c1.x, c1.y, Math.random() * 10 | 0, Math.random() * 50)
          );
        }
      }
    }
    if (hits1.length) {

      var now = Date.now();
      if (now - c2.hitAt < 300) {
        return;
      }
      //console.log(hits1, hits2);
      c2.hitAt = now;

      // nope...
      b2[hits2[0]] -=10;
      c2.acc = ((c1.velX + c1.velY) / 2) * 2;
      c2.angAcc += (Math.random() - 0.5) * 1;
      c2.angle += Math.PI * 2;

      if (j % 2 | 0 === 2 && b2[2] <= 0) {
        // explody.
        c2.explode();
      }
    }
  },

  press: function (e) {
    this.cars.forEach(function (c) {
      const dist = 16;
      if (Math.abs(e.clientX - c.x) < dist && Math.abs(e.clientY - c.y) < dist) {
        c.press();
      }
    });
  }
};
