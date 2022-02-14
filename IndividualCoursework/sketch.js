// Declare classifier
let classifier;
// Imported model
let importModel = 'ml5js-flag-detector/';

// Declare video (web camera) and label
let video;
let flippedVideo;
// To store the classification
let label = "";

// Preload model
function preload() {
    classifier = ml5.imageClassifier(importModel + 'model.json');
}

function setup() {
    createCanvas(620, 460);
    // Create the video
    video = createCapture(VIDEO);
    video.size(620, 420);
    video.hide();

    flippedVideo = ml5.flipImage(video);
    // Classify current frame using model
    classifyVideo();
}

function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
}

// Get a prediction for the current video frame
function classifyVideo() {
    flippedVideo = ml5.flipImage(video);
    classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classify again!
    classifyVideo();
}