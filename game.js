
//alert("done connection!")
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];

//to presss any key from keyboard then the nextSequence() will call automatocally which contains the random color chosen

var start = false;
var level =0 ;

$(document).keypress(function(){

  if(!start){
    $("#level-title").text("Level " + level);
    nextSequence();
    start  = true;

  }
});


$(".btn").click(function(){

     var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

     playSound(userChosenColour);
   animatePress(userChosenColour);

     //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
     checkAnswer(userClickedPattern.length-1);

   console.log(userClickedPattern);
});

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
       $("#level-title").text("Game Over, Press A Key to Restart");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      startover();



    }

}

function nextSequence(){
  userClickedPattern = [];

  var randomNumber = Math.random();
  randomNumber=Math.floor(randomNumber*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);

  $("#"+ randomChosenColour).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);

};


function playSound(name){

    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
};


function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed"),200});
};

function startover(){
     level= 0;
     gamePattern = [];
     start = false;


  }
