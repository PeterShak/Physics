let colorlist = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6',
  '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3',
  '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
];

let movers = [];
let magnets = [];
let G = 0.1;   
let wind = 0.1;    
let magnetStrength = 200;

let currentMagnetCharge = 1; // + attracts, - repels

function setup() {
  createCanvas(400, 400);
  ellipseMode(RADIUS);
  textFont('Arial');

  for (let i = 0; i < 10; i++) {
    let m = new Mover(
      random(width),
      random(height),
      random(-1, 1),
      random(-1, 1),
      20,
      color(random(colorlist))
    );
    movers.push(m);
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

  // Update and display all movers
  for (let mover of movers) {
    mover.update();
  }

  //  Draw magnets
  for (let magnet of magnets) {
    magnet.display();
  }
}

// Create a new magnet where the mouse is
function mousePressed() {
  let m = new Mover(mouseX, mouseY, 0, 0, 30, null);
  m.isMagnet = true;
  m.charge = currentMagnetCharge;
  m.c = currentMagnetCharge === 1 ? color(255, 0, 0) : color(0, 0, 255);
  magnets.push(m);
}

function applyMagneticForce(magnet, mover) {
  if (mover.isMagnet) return;

  let force = p5.Vector.sub(magnet.position, mover.position);
  let distance = constrain(force.mag(), 5, 100);
  let strength = (magnetStrength / (distance * distance));

  force.setMag(strength);

  // + charge attracts, - charge repels
  if (magnet.charge < 0) {
    force.mult(-1);
  }

  mover.applyForce(force);
}

function keyPressed() {
  if (key === 'c') {
    currentMagnetCharge *= -1;
    console.log("Next magnet will be: " + (currentMagnetCharge === 1 ? "Attractor (+)" : "Repeller (-)"));
  } else if (key === 't') {
    for (let magnet of magnets) {
      magnet.charge *= -1;
      magnet.c = magnet.charge === 1 ? color(255, 0, 0) : color(0, 0, 255);
    }
    console.log("Toggled all magnet charges");
  }
}
