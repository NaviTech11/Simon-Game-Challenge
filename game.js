const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = []; 

let started = false;
let level = 0;

$("body").keypress(function(){
    if(!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){
    
    let userChosenColor =  $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
 });

 
function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        console.log("success")
   
        if(gamePattern.length === userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
        }
    
    } else {

        console.log("wrong");
        
        playSound("wrong");
        
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
       
       $("#level-title").text("Game Over, Press any Key to Restart");
        
       startOver();
    }
}


function nextSequence(){
    
    userClickedPattern = [];
    level += 1;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}


function playSound(name){
    
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}


function animatePress(currentColor){
     $("#" + currentColor).addClass("pressed");
     setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
     }, 100);
 }

 
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
