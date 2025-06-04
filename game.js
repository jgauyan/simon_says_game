var userClickedPattern = [];
var gamePattern = [];
var started = false; 
var level = 0; 
var buttonColours = ["red","blue","green","yellow"];

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level); 
        nextSequence();
        started = true; 

    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

    });





function checkAnswer (currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout (function () {
                nextSequence();
        }, 1000);
    }

    } else {

        var wrongSound = new Audio ("sounds/wrong.mp3");
        wrongSound.play();
        
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart"); 

        setTimeout (function () {
        $("body").removeClass("game-over");
        } , 200); 

        startOver();
    } 
}

function nextSequence () {
    userClickedPattern = [];

    level ++; 
    $("#level-title").text("Level " + level);


    var randomNumber = (Math.round (Math.random()*3) );
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColour);

}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout (function() {
        $("#" + currentColor).removeClass("pressed");
     } ,100);
}

function playSound(name) {
    var playSound = new Audio ("sounds/" + name + ".mp3");
    playSound.play();
}

function startOver () {
    level = 0; 
    gamePattern = [];
    started = false; 
}

