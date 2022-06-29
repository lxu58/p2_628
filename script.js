/* exported setup, draw */

let seed = 0;
let seed_noise = 0;
let circle_size = 0;

var startX = 300;
var startY = 300;	
var angle = 0;	 
var radius = 50;  


let color_background;

let flag_func_background = false;
let flag_circle = false;

function setup() {
  createCanvas(600, 600);
  createButton("reroll").mousePressed(() => {
    seed++;
    flag_func_background = false;
    flag_circle = false;
    console.log("rerolled");
  });

}

function set_color_background() {

  //color won't change unless click reroll
  if (flag_func_background == false) {
  const r = random(255);
  const g = random(100, 200);
  const b = random(100);
  color_background = color(r, g, b);
  flag_func_background = true;
  }

  background(color_background);
}



function draw() {

  //draw circle with mouse interaction
  if (flag_circle == false) {
    set_color_background();
    draw_eclipse();
   // flag_circle = true;
  }
  
  function draw_eclipse() {
    for (let i = 0; i < 1; i++) {
      let theta = random(0, TWO_PI);
      //let h = randomGaussian(3.3);
      seed_noise += 0.01;
  

      angle = 4 * PI * noise(seed_noise); //experiment with different means

      //var x = startX + radius * cos(angle);
      //var y = startY + radius * sin(angle);


      var x = mouseX + radius * cos(angle);
      var y = mouseY + radius * sin(angle);

      //circle_size = mouseY/2;
      noFill();
      stroke(255);
      ellipse(x, y, 8);
    }
    /*
    noFill();
    stroke(255);
    strokeWeight(mouseX / 10);
    ellipse(300, 300, mouseY, mouseY);

    */
  }






}
/*
let seed = 12345;

const grassColor = "#e1ac4a";
const skyColor = "#cdd8e6";
const hillColor = "#1e273f";
const treeColor = "#3d1803";
const leaveColor = "#233610";
const sunColor = [254,254,254,80]; // with opacity

function preload() {
    // runs before setup 
    // use if you want to load any large files and want to make sure they load before setup()
}

function setup() {
  createCanvas(800, 400);
  createButton("reroll").mousePressed(() => seed++);
}

function draw() {
  randomSeed(seed);

  background(100);

  noStroke();

  fill(skyColor);
  rect(0, 0, width, height / 2);

  // An example of making something respond to the mouse
  fill(...sunColor);
  ellipse(mouseX,0,30,30);
  ellipse(mouseX,0,50,50);
  ellipse(mouseX,0,100,100);
  ellipse(mouseX,0,200,200);

  fill(grassColor);
  rect(0, height / 2, width, height / 2);

  // An example of drawing an irregular polygon
  fill(hillColor);
  beginShape();
  vertex(0, height / 2);
  const steps = 10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - (random() * random() * random() * height) / 8 - height / 50;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);

  const trees = 5*random();
  for (let i = 0; i < trees; i++) {
    drawLtree();
  }

  // An example of recursively drawing an L-tree 
  function drawLtree() {
    let x = width * random();
    let y = height/2 + height/8 * random();
    let s = width/200 + (y - height/2)/2;
    let jitter = (mouseX - width/2) / width * 2 * Math.PI / 180;
    drawLtreeBranch(x, y, s, (-90 * Math.PI / 180) + jitter, 0, 5); // this angle points north (0 is east)
  }  

  function drawLtreeBranch(x, y, s, angle, max_limit, branch_weight) { // s is length of a segment
    stroke(treeColor);
    strokeWeight(branch_weight);
    let v = p5.Vector.fromAngle(angle, s);
    let vx = v.x;
    let vy = v.y; 
    let x1 = x;
    let y1 = y; 
    let x2 = x1 + vx;
    let y2 = y1 + vy;
    line(x1, y1, x2, y2);

    let new_s = s * 0.7;
    let new_max = max_limit + random();
    let new_branch_weight = branch_weight - 1;
    new_branch_weight = max(new_branch_weight, 1);

    if (max_limit < 3) {
        if (random() < 1/3) {
            drawLtreeBranch(x2, y2, new_s, (-35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        } else if (random() > 1/3) {
            drawLtreeBranch(x2, y2, new_s, (35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        } else {
            drawLtreeBranch(x2, y2, new_s, (-35 * Math.PI / 180) + angle, new_max, new_branch_weight);
            drawLtreeBranch(x2, y2, new_s, (35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        }
        drawLtreeBranch(x2, y2, new_s, angle, new_max, new_branch_weight);
    }
    else {
        if (random() < 1/3) {
            drawLeave(x2, y2, new_s, (-35 * Math.PI / 180) + angle);
        } else if (random() > 1/3) {
            drawLeave(x2, y2, new_s, (35 * Math.PI / 180) + angle);
        } else {
            drawLeave(x2, y2, new_s, (-35 * Math.PI / 180) + angle);
            drawLeave(x2, y2, new_s, (35 * Math.PI / 180) + angle);
        }
    }

  }

  function drawLeave(x, y, s, angle) {
    fill(leaveColor);
    noStroke();
    let v = p5.Vector.fromAngle(angle, s);
    let vx = v.x;
    let vy = v.y; 
    let x1 = x;
    let y1 = y; 
    let x2 = x1 + vx;
    let y2 = y1 + vy;
    line(x1, y1, x2, y2);
    circle(x2, y2, 3);

  }
}

*/