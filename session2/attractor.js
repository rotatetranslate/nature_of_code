function Attractor() {
  this.pos = createVector(width/2, height/2);
  this.mass = 15;
  this.G = 1;

  this.calculateAttraction = function(p) {
    // calculate direction of force
    var force = p5.Vector.sub(this.pos, p.pos);
    // distance between objects
    var distance = force.mag();
    // constrain values for distance to eliminate very small or large values that ruin simulation
    distance = constrain(distance, 5, 25)
    // normalize vector
    force.normalize();
    // calculate gravitational force magnitude
    var strength = (this.G * this.mass * p.mass) / (distance * distance);
    // get force vector => magnitude * direction
    force.mult(strength);
    return force;
  }

  this.display = function() {
    ellipseMode(CENTER);
    strokeWeight(4);
    stroke(0);
    fill(color(255, 255, 255));
    ellipse(this.pos.x, this.pos.y, this.mass * 2, this.mass * 2);
  }
}
