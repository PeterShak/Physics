let colorlist = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];

let movers = [];
let magnets = []; // Array to store the magnetic balls
let G = 0.1;  
let wind = 0.1; 
let magnetStrength = 20;  

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 10; i++) {
    movers.push(
      new Mover(random(width), random(height), random(-1, 1), random(-1, 1), 20, random(colorlist))
    );
  }

  ellipseMode(RADIUS);
}

function draw() {
  background(220);

  for (let magnet of magnets) {
    for (let mover of movers) {
      applyMagneticForce(magnet.x, magnet.y, mover);
    }
  }

  for (let mover of movers) {
    mover.update();
  }

  for (let magnet of magnets) {
    magnet.display();
  }
}

// Create a magnet ball at the mouse position when clicked
function mousePressed() {
  magnets.push(new Mover(mouseX, mouseY, 0, 0, 30, color(0, 0, 255))); 
}

// Apply magnetic force to a moving ball from a stationary magnet
function applyMagneticForce(mx, my, mover) {
  let dx = mx - mover.x; 
  let dy = my - mover.y; 
  let distance = Math.sqrt(dx * dx + dy * dy); 

  if (distance > 0) {
    
    let force = magnetStrength / distance;

    let angle = Math.atan2(dy, dx); 
    mover.dx += force * Math.cos(angle); 
    mover.dy += force * Math.sin(angle); 
  }
}
