// Mover.js

class Mover {
  constructor(x, y, dx, dy, r, c) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.c = c;
    this.isMagnet = false; 
  }

  update() {
    this.applyGravity();  
    this.applyWind();     
    this.move();
    this.containWithinWindow();
    this.draw();
  }

  draw() {
    fill(this.c);
    circle(this.x, this.y, this.r);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  applyGravity() {
    this.dy += G; 
  }

  applyWind() {
    this.dx += wind; 
  }

  containWithinWindow() {
    if (this.x < this.r) { 
      this.x = this.r;
      this.dx *= -1;
    }
    if (this.x > width - this.r) { 
      this.x = width - this.r;
      this.dx *= -1;
    }
    if (this.y < this.r) { 
      this.y = this.r;
      this.dy *= -1;
    }
    if (this.y > height - this.r) { 
      this.y = height - this.r;
      this.dy *= -1;
    }
  }

  display() {
    fill(0, 0, 255); 
    circle(this.x, this.y, this.r);
  }
}
