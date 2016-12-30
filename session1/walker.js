var walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  walkers.push(new Walker(this.mouseX, this.mouseY));
}

function draw() {
  background(51);
  for (var i = 0; i < walkers.length; i++) {
    walkers[i].display();
    walkers[i].update();
  }
}

function Walker(x, y) {
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);

  // store position history to create trails
  this.posHistory = [];

  this.update = function() {
    // var mouse = createVector(mouseX, mouseY);
    // this.acc = p5.Vector.sub(mouse, this.pos);
    // this.acc.normalize();
    // this.acc.mult(.001);

    this.acc = createVector(random(-1, 1), random(-1, 1));
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // add previous position to history
    var v = createVector(this.pos.x, this.pos.y);
    this.posHistory.push(v);

    // limit length of history
    if (this.posHistory.length >= 50) {
      this.posHistory.shift();
    }

  }


  this.display = function() {
    noStroke();
    var a = 255;
    fill(color(255, 204, 0, 255));
    var sizeX = 25;
    var sizeY = 25;
    ellipse(this.pos.x, this.pos.y, sizeX, sizeY);

    // display position history/trails
    for (var i = 0; i < this.posHistory.length; i++) {
      var pos = this.posHistory[i];
      fill(255, 204, 0, 255 - (i * 5));
      ellipse(pos.x, pos.y, i, i);
    }
  }
}

////////////////////////////////
