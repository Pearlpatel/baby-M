status="";
objects=[];
alarm_sound="";
function preload() {
    alarm_sound=loadSound("alarm_3.mp3");
}
function setup() {
    canvas=createCanvas(500,500);
    canvas.center();
    Video=createCapture(VIDEO);
    Video.hide();
    objectdect=ml5.objectDetector("cocossd",model_loaded);
    document.getElementById("status").innerHTML="Status: Object Detecting";
}
function model_loaded() {
    console.log("Model is loaded");
    status=true;
}
function draw() {
     image(Video,0,0,500,500);
     if (status != "") {
         objectdect.detect(Video,gotresults);
         for (let counter = 0; counter < objects.length; counter++) {
             if (objects[counter].label=="person") {
                 alarm_sound.stop();
                 document.getElementById("Bstatus").innerHTML="Baby has been found";
                 document.getElementById("status").innerHTML="Object has been found";
             }
             else{
                 alarm_sound.play();
                 document.getElementById("Bstatus").innerHTML="Baby has not been found";
                 document.getElementById("status").innerHTML="Object has not been found"; 
             }
         }
     }
}
function gotresults(error,results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
objects=results;
    }
}