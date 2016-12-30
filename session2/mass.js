var particle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  particle1 = new Particle(200, 100, 3, 'dodgerblue');
  particle2 = new Particle(400, 100, 5, 'salmon');
}

function draw() {
  background(51);

  var gravity1 = createVector(0, .2 * particle1.mass);
  var gravity2 = createVector(0, .2 * particle2.mass);
  particle1.applyForce(gravity1);
  particle2.applyForce(gravity2);

  var wind = createVector(-.5, 0);
  if (mouseIsPressed) {
    particle1.applyForce(wind);
    particle2.applyForce(wind);
  }

  particle1.update();
  particle1.edges();
  particle1.display();

  particle2.update();
  particle2.edges();
  particle2.display();
}
