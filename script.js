/* exported setup, draw */

let seed = 0;
let seed_noise = 0;
let seed_leaves = 0;


var startX = 300;
var startY = 200;
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
    seed_leaves++;
    flag_func_background = false;
    flag_reroll = false;
    flag_func_leaves = false;
    reflection_size = random(10, 20);
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





function draw() {

  //draw circle with mouse interaction
  if (flag_reroll == false) {
    set_color_background();
    draw_bubble();
    draw_eclipse();
    draw_leaves();
    // flag_reroll = true;
  }


  function draw_leaves() {
    if (flag_func_leaves == false) {
      for (var i = 0; i < 10; i++) {
        randomSeed(i + seed_leaves);
        x = randomGaussian(550, 300);
        y = randomGaussian(500, 30);
        draw_aLeaf(x, y);
      }

      for (var i = 0; i < 2; i++) {
        randomSeed(i + seed_leaves + 10);
        x = randomGaussian(550, 300);
        y = randomGaussian(500, 30);
        draw_threeLeaves(x, y);
      }





    }
    //flag_func_leaves = true;
  }







  function draw_bubble() {

    noFill();
    stroke(400);
    ellipse(startX , startY , circle_size);

  }

  function draw_eclipse() {

    let reflection_angle = atan2(mouseY - height / 2, mouseX - width / 2);

    for (let i = 0; i < 100; i++) {
      seed_noise += 0.5;
      var x = startX + radius * reflection_size / 15 * cos(reflection_angle + PI + noise(seed_noise));
      var y = startY + radius * reflection_size / 15 * sin(reflection_angle + PI + noise(seed_noise));

      //circle_size = mouseY/2;
      fill('#ffffff');
      stroke(255);
      ellipse(x, y, reflection_size);
    }
  }



  function draw_aLeaf(x, y) {
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





  function draw_threeLeaves(x, y) {


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



}

