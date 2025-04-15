let colorlist = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6',
  '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3',
  '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
];

let movers = [];
let magnets = [];
let G = 0.1;   
let wind = 0.1;    
let magnetStrength = 20;

function setup() {
  createCanvas(400, 400);
  ellipseMode(RADIUS);

  
  for (let i = 0; i < 10; i++) {
    movers.push(
      new Mover(
        random(width),
        random(height),
        random(-1, 1),
        random(-1, 1),
        20,
        color(random(colorlist))
      )
    );
  }
}

function draw() {
  background(220);

  // Apply magnetic force from each magnet to each mover
  for (let magnet of magnets) {
    for (let mover of movers) {
      applyMagneticForce(magnet, mover);
    }
  }

  // Update all movers
  for (let mover of movers) {
    mover.update();
  }

  // Draw magnets
  for (let magnet of magnets) {
    magnet.display();
  }
}

// When mouse is pressed, create a new magnet at the mouse position
function mousePressed() {
  let m = new Mover(mouseX, mouseY, 0, 0, 30, color(0, 0, 255));
  m.isMagnet = true;
  magnets.push(m);
}

// Apply magnetic force from a magnet to a mover
function applyMagneticForce(magnet, mover) {
  let force = p5.Vector.sub(magnet.position, mover.position);
  let distance = force.mag();

  if (distance > 0) {
    force.setMag(magnetStrength / distance);
    mover.applyForce(force);
  }
}
