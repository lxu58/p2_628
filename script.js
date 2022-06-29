/* exported setup, draw */

let seed = 0;
let seed_noise = 0;


var startX = 300;
var startY = 300;	
var angle = 0;	 
var radius = 120;  
var reflection_size = 15;
var circle_size = reflection_size * 20;


let color_background;

let flag_func_background = false;
let flag_func_leaves = false;
let flag_reroll = false;

function setup() {
  createCanvas(600, 600);
  createButton("reroll").mousePressed(() => {
    seed++;
    flag_func_background = false;
    flag_reroll = false;
    flag_func_leaves = false;
    reflection_size = random(10, 30);
    circle_size = reflection_size * 20;
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

function draw_leaves(){
  if(flag_func_leaves == false){

  }
}



function draw() {

  //draw circle with mouse interaction
  if (flag_reroll == false) {
    set_color_background();
    draw_bubble();
    draw_eclipse();
    draw_leaves();
   // flag_reroll = true;
  }

  function draw_bubble(){

    noFill();
    stroke(400);
    ellipse(width/2, height/2, circle_size);
    
  }
  
  function draw_eclipse() {

    let reflection_angle = atan2(mouseY - height / 2, mouseX - width / 2);

      for (let i = 0; i < 100; i++) {
      seed_noise += 0.5;
      var x = startX + radius * reflection_size/15 * cos(reflection_angle + PI + noise(seed_noise));
      var y = startY + radius * reflection_size/15 * sin(reflection_angle + PI + noise(seed_noise));

      //circle_size = mouseY/2;
      fill('#ffffff');
      stroke(255);
      ellipse(x, y, reflection_size);
    }
  }

}



/*
  
https://editor.p5js.org/mbardin/sketches/wVe_dpmLO


  //for(var i = 0 ; i <10 ; i ++){
  //  
   x = randomGaussian(300, 300);
   y = randomGaussian(500, 30);




     draw_ALeaf(x, y);
  // draw_threeLeaves (x, y);
  
  function draw_ALeaf(x, y){
    let angle = random(0, 360);
  push();
  translate(x, y);
  rotate(radians(angle));
  stroke(0, 0, 0);
  fill(0, 100, 0);
  ellipse(0, 0, 50, 100);
  line(0, 0 - 25, 0, 0 + 75);
  pop();
    
  }
  
   draw_threeLeaves (x, y);
  
  
  
  function draw_threeLeaves(x, y){
  
  
  push();
  translate(x, y);
  rotate(radians(45));
  stroke(0, 0, 0);
  fill(0, 100, 0);
  ellipse(0, 0, 50, 100);
  line(0, 0 - 25, 0, 0 + 75);
  pop();
  
  push();
  translate(x, y);
  deltaX = 50;
  deltaY = 25;
  rotate(radians(0));
  stroke(0, 0, 0);
  fill(0, 100, 0);  
  ellipse(0 - deltaX, 0 - deltaY, 50, 100);
  line(0 - deltaX, 0 - 25 - deltaY, 0 - deltaX, 0 + 75 - deltaY);
  pop();
  
  
  push();
  translate(x, y);
  deltaX = 75;
  deltaY = 70;
  rotate(radians(-45));
  stroke(0, 0, 0);
  fill(0, 100, 0);  
  ellipse(0 - deltaX, 0 - deltaY, 50, 100);
  line(0 - deltaX, 0 - 25 - deltaY, 0 - deltaX, 0 + 75 - deltaY);
  pop();

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