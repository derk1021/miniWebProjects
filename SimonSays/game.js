let level = 0;
let buttonColours = ["red", "blue", "green", "yellow"];
// Keep track of the computer clicks
let gamePattern = [];
// Functionality for user clicks
let nextSequence = () => {
  // Picks a number between 0-3 to choose a random color in buttonColours
  let randomNum = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);

  // When a button is randomly chosen, the animation of it fades in and out
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  // Plays the corresponding audio with the corresponding button color
  let getAudio = playSound(randomChosenColour);
  let audio = new Audio(getAudio);
  audio.play();
};

// Same functionality for user clicking button in Javascript (substitute for jQuery)
// let getButton = document.querySelectorAll("div[type=button]");
// for (let i = 0; i < getButton.length; i++) {
//   getButton[i].addEventListener("click", (event) => {
//     let userChosenColor = event.target.id;
//     userClickedPattern.push(userChosenColor);

//     let getAudio = playSound(userChosenColor);
//     let audio = new Audio(getAudio);
//     audio.play();

//     // Add the .pressed styling
//     animatePress(event.target);

//     // After 1ms, then take out the .pressed styling
//     setTimeout(() => {
//       event.target.classList.remove("pressed");
//     }, 100);
//     // Checks for when the user's clicks correspond with computer pattern
//     for (let j = 0; j < userClickedPattern.length; j++) {
//       if (userClickedPattern[j] == gamePattern[j]) {
//         console.log("Correct!");
//       } else {
//         console.log("Wrong!");
//       }
//     }
//   });
// }

// Keeps track of user pattern clicks
let userClickedPattern = [];
// Using jQuery, handle the click event for the user and determine if it matches the gamePattern array
let getButton = $("div[type=button]");
for (let i = 0; i < getButton.length; i++) {
  $(getButton[i]).on("click", (event) => {
    let userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    // Checks for when the user's clicks correspond with computer pattern
    console.log("Computer: " + gamePattern);
    console.log("Player: " + userClickedPattern);
    for (let j = 0; j < userClickedPattern.length; j++) {
      if (userClickedPattern[j] === gamePattern[j]) {
        // Plays the corresponding audio with the corresponding button color
        let getAudio = playSound(userChosenColor);
        let audio = new Audio(getAudio);
        audio.play();
      } else {
        // Plays the wrong sound

        let getAudio = playSound("");
        let audio = new Audio(getAudio);
        audio.play();
        // If wrong sound is played, also apply the .game-over class selector and apply to body
        $("body").addClass("game-over");

        setTimeout(() => {
          $("body").removeClass("game-over");
        }, 200);

        // Reset the game
        $("h1").text("Game Over, Press Any Key to Restart");
        level = 0;
        gamePattern = [];
        userClickedPattern = [];
      }
    }

    // Add the .pressed styling
    animatePress(event.target);

    // After 1ms, then take out the .pressed styling
    setTimeout(() => {
      event.target.classList.remove("pressed");
    }, 100);
  });
}

// Helper function for getting the right audio based on button clicked
let playSound = (color) => {
  let path = "";
  if (color == "red") {
    path = "./sounds/red.mp3";
  } else if (color == "blue") {
    path = "./sounds/blue.mp3";
  } else if (color == "green") {
    path = "./sounds/green.mp3";
  } else if (color == "yellow") {
    path = "./sounds/yellow.mp3";
  } else {
    path = "./sounds/wrong.mp3";
  }
  return path;
};

function animatePress(currentColour) {
  currentColour.classList.add("pressed");
}

$(document).on("keypress", () => {
  level += 1;
  nextSequence();
  $("h1").text(`Level ${level}`);
  // Empty the user's clicks when pressing on a key
  userClickedPattern = [];
});

// "Game Over, Press Any Key to Restart"
