class Mover {
  constructor(x, y, dx, dy, r, c) {
    this.position = createVector(x, y);
    this.velocity = createVector(dx, dy);
    this.acceleration = createVector(0, 0); 
    this.r = r;
    this.isMagnet = false; 
    this.frictionCoefficient = 0.01;
    this.c = c;
  }

  applyFriction() {
    if (this.velocity.mag() > 0.01) { 
      let friction = this.velocity.copy(); 
      friction.normalize();              
      friction.mult(-1);                
      friction.mult(this.frictionCoefficient); 
      this.applyForce(friction);        
    }
  }

  applyForce(force) {
    this.acceleration.add(force); 
  }

  update() {
    if (!this.isMagnet) {
      this.applyForce(createVector(0, G));
      this.applyForce(createVector(wind, 0));
      this.applyFriction();
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }

    this.containWithinWindow();
    this.draw();
  }

  draw() {
    fill(this.c);
    circle(this.position.x, this.position.y, this.r);

    if (this.isMagnet) {
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(12);
      text(this.charge > 0 ? "+" : "-", this.position.x, this.position.y);
    }
  }

  containWithinWindow() {
    if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    }
    if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.velocity.x *= -1;
    }
    if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }
    if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.velocity.y *= -1;
    }
  }

  display() {
    this.draw();
  }
}
