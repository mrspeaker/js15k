function Particles () {

}
Particles.prototype = {
  update: function () {

  },
  render: function (c) {

  }
};

function Particle (x, y, size, col) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.col = col;
  this.life = 20;
}
Particle.prototype = {
  update: function () {
    this.x += Math.random() * 2;
    this.y += Math.random() * 2;
    this.size -= 0.08;
    return this.life-- > 0;
  },
  render: function (c) {
    c.fillStyle = "hsl(" + this.col + ",50%, 50%)";
    c.fillRect(this.x - this.size / 2, this.y - this.size/2, this.size, this.size);
  }
};
