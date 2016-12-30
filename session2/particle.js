function Particle(x, y, mass, rgb = [255, 255, 255]) {
  this.pos = createVector(x, y);
  this.vel = createVector(1, 0);
  this.acc = createVector(0, 0);
  this.mass = mass;
  this.c = color(rgb[0], rgb[1], rgb[2]);

  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass)
    this.acc.add(f);
  }

  this.posHistory = [];

  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    var v = createVector(this.pos.x, this.pos.y);
    this.posHistory.push(v);
    if (this.posHistory.length >= 25) {
      this.posHistory.shift();
    }
  }

  this.display = function() {
    fill(this.c);
    strokeWeight(0);
    ellipse(this.pos.x, this.pos.y, this.mass * 10, this.mass * 10);

    for (var i = 0; i < this.posHistory.length; i++) {
      var pos = this.posHistory[i];
      fill(rgb[0], rgb[1], rgb[2], i * 10);
      ellipse(pos.x, pos.y, this.mass * 10, this.mass * 10);
      // ellipse(pos.x, pos.y, i / 2, i / 2);
    }
  }

  this.edges = function() {
    if (this.pos.y >= height) {
      this.pos.y = height;
      this.vel.y *= -1;
    }
    if (this.pos.x <= 0) {
      this.pos.x = 0;
      this.vel.x *= -1
    }
    if (this.pos.x >= width) {
      this.pos.x = width;
      this.vel.x *= -1;
    }
  }
}
