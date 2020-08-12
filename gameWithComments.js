
const buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = []; 

let started = false;
let level = 0;

//Detect when keyboard key has been pressed to start Game
//used started variable to make sure it just responds to the first key press
$("body").keypress(function(){
    if(!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

 // DETECT WHEN BUTTONS ARE CLICKED AND TRIGGER HANDLER FUNCTION
 $(".btn").click(function(){
    
    // store the id of the button that got clicked.
    let userChosenColor =  $(this).attr("id");
    // Add contents of variable to user Array
    userClickedPattern.push(userChosenColor);
    
    //play sound that corresponds to user click
    playSound(userChosenColor);
    //calling function for animation when button is clicked
    animatePress(userChosenColor);

    //calling function to check for Users answer with computer pattern
    checkAnswer(userClickedPattern.length - 1);
 });

  //Check for Sequence's Answer
  function checkAnswer(currentLevel){
    
    //Check if user answer is same as pattern
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        
        console.log("success")
   
        //if user is right, check they've finished their sequence
        if(gamePattern.length === userClickedPattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
        }
    
    }else{

        console.log("wrong");
        
        //Game Over sound
        playSound("wrong");
        
        //Game over animation
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
       
        //Game Over title
       $("#level-title").text("Game Over, Press any Key to Restart");
        
       //Reset Game
       startOver();
    }
}


function nextSequence(){
    
    //Reset userClicked Pattern to an empty array once nextSequence() is triggered
    userClickedPattern = [];
    level += 1;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // --------Show sequence with Animations and Sounds------
    // select button with same id name as the randomChosenColor
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    // PLay sound for button selected
    playSound(randomChosenColor);

}

//  Refactor playing audio into one function to use in both instances
function playSound(name){
    
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

 //Create function to give a slight animation when button is clicked
 function animatePress(currentColor){
     $("#" + currentColor).addClass("pressed");
     setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
     }, 100);
 }

 //Restart Game
 function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
