function Game () {
  this.cars = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ].
  map(function () {
    return new Car();
  })
  .map(function (c, i) {
    if (i === 0) {
      return c;
    }
    c.x = Math.cos(i/3) * 120 + 300;
    c.y = Math.sin(i/3) * 80 + 150;
    //c.angle = Math.random() * Math.PI * 2;
    return c;
  });
}
Game.prototype = {

  update: function (dt, keys, tick) {
    this.cars.forEach(function (c1, i) {
      c1.update(dt, i === 0 ? keys : {}, tick);
      c1.isPlayer = i === 0;
      this.cars.forEach(function (c2, j) {
        if (c2 === c1) { return; }
        // Check coll...
        var dx = c1.x - c2.x;
        var dy = c1.y - c2.y;
        if (dy * dy + dx * dx < 800) {
          this.check(c1, c2);
        }
      }, this);
    }, this);

    if (Math.random() < 0.01) {
    //  this.cars[Math.random() * this.cars.length | 0].acc = 2;
    }
  },

  render: function (c) {
    c.clearRect(0, 0, c.w, c.h);
    this.cars.forEach(function (car) {
      car.render(c);
    });
  },

  check: function (c1, c2) {
    // Check all parts
    for (var i = 0; i < 6; i++) {
      var b1 = c1.body[i];
      if (!b1[2]) continue;

      for (var j = 0; j < 6; j++) {
        var b2 = c2.body[j];
        if (!b2[2]) continue;

        var dx = b1[0] - b2[0];
        var dy = b1[1] - b2[1];
        if (Math.sqrt(dx * dx + dy * dy) < 4) {
          //if (!c2.isPlayer) return;
          // HIT!
          //b1[2] -=1;
          //b2[2] -=1;
          c2.acc = Math.random() * 20 - 10;
          c2.angAcc += (Math.random() - 0.5) * 0.5;
          c2.angle += Math.PI * 2;
        }
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
