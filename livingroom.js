img = "";
objects = [];
current_status = " ";

function preload() {
    img = loadImage("tv.jpeg");
    console.log("Image Loaded");
}

function setup() {
    canvas = createCanvas(640, 480);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd", mdl);
}

function draw() {
    image(img, 0, 0, 640, 480);
    if(current_status == "set"){
        for (var i = 0; i <objects.length; i++) {
            document.getElementById("status").innerHTML = "Detected Objects";
            document.getElementById("no_objects").innerHTML = "There are 6 big objects of which cocossd has detected" + objects.length + " objects"
        
            percent = floor(objects[i].confidence * 100);

            fill("red")
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            
            noFill();
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function mdl() {
    console.log("Model Loaded");
    objectDetector.detect(img, gotResults);
    current_status = "set"
}


function gotResults(error, results) {
    if (error) {
        console.log("Error: " + error)
    }else{
        console.log(results);
        objects = results;
    }
}