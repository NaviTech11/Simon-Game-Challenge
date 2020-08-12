
const gamePattern = [];
gamePattern.push(randomChosenColors);

const buttonColors = ["red", "blue", "green", "yellow"];
let randomChosenColors = buttonColors[nextSequence()];



function nextSequence(){
    let randomNumber = Math.floor(Math.random()*4);
    return randomNumber;
}