// var particle;
var attractor;
var particles = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  // particle = new Particle(600, 100, 1);
  attractor = new Attractor();
}

function mousePressed() {
  particles.push(new Particle(mouseX, mouseY, random(.75, 1.25), [random(255), random(255), random(255)] ))
}

function draw() {
  background(51);

  // var force = attractor.calculateAttraction(particle);
  // particle.applyForce(force);

  // particle.update();
  // particle.display();
  particles.forEach(p => {
    p.applyForce(attractor.calculateAttraction(p));
    p.update();
    p.display();
  })

  attractor.display();

}
