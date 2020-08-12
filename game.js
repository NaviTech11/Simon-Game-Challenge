// -------------Create a New Pattern ---------
const buttonColors = ["red", "blue", "green", "yellow"];

const gamePattern = [];
const userClickedPattern = []; 


let level = 0;

//Detect when keyboard key has been pressed to start Game
//used "one" method to make sure it just responds to the first key press
$("body").one("keypress",function(){
    
    nextSequence();

    $("h1").text("Level " + level);
});

 // DETECT WHEN BUTTONS ARE CLICKED AND TRIGGER HANDLER FUNCTION
 $(".btn").click(function(){
    
    // store the id of the button that got clicked.
    let userChosenColor =  $(this).attr("id");
    
    // Add contents of variable to user Array
    userClickedPattern.push(userChosenColor);

    //Made sure it worked
    //console.log(userClickedPattern );
    
    //play sound that corresponds to user click
    playSound(userChosenColor);

    //calling function for animation when button is clicked
    animatePress(userChosenColor);

    //calling function to check for Users answer with computer pattern
    checkAnswer(userClickedPattern.length -1);

 });

  //Check for Sequence's Answer
  function checkAnswer(currentLevel){
    
    //Check if user answer is same as pattern
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success")
   
        //if user is right, check they've finished their sequence
     if(userClickedPattern.length === gamePattern.length){
        
        //Call nextSequence() after 1 second delay
        setTimeout(function(){
            nextSequence();
        }, 1000);
    
    }else{
        
        console.log("wrong");
    }
 }
}


function nextSequence(){
    
    //Reset userClicked Pattern to an empty array once nextSequence() is triggered
    userClickedPattern = [];
    
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // --------Show sequence with Animations and Sounds------
    // select button with same id name as the randomChosenColor
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // PLay sound for button selected
    playSound(randomChosenColor);

    level += 1;

    $("#level-title").text("Level " + level);

}

//  Refactor playing audio into one function to use in both instances
function playSound(name){
    
    let sound= new Audio("sounds/" + name + ".mp3");
    sound.play();
 }

 //Create function to give a slight animation when button is clicked
 function animatePress(currentColor){
     $("#" + currentColor).addClass("pressed");
     setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");

     }, 100)
 }

