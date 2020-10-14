// Game Variables
let min = 1,
    max = 10,

    // winning num generated using random method
    winningNum = Math.floor(Math.random()*(max-min+1)+min);

    // chances of guessing the correct num
    guessesLeft = 3;

// UI Variables
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assigning min and max value for user
minNum.textContent = min;
maxNum.textContent = max;

// If game is over, then listen for click on play again buttton
game.addEventListener('mousedown', (e) => {
  if(e.target.className === 'playAgain'){
    window.location.reload();
  }
});
      
// Event Listener for user input
guessBtn.addEventListener('click', () => {
  let input = parseInt(guessInput.value);
  
  // Checking if input is empty or <, > than min & max
  if(isNaN(input) || input < min || input > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }  // Check if won
  else if(input === winningNum){
    // Game over - if win, display the message 
    gameOver(true, `${winningNum} is correct, YOU WIN!`);

  } else {
    // if wrong guess then decrese the no. of guesses
    guessesLeft -= 1;

    if(guessesLeft === 0){
      // if xero chances left, then display game over message
      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
    } else {
      // if chances remain, then user get to choose another no.

      guessInput.style.borderColor = 'red';
      guessInput.value = '';

      // if wrong guess, then displayin remaining chances.
      setMessage(`${input} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;

  setMessage(msg);

  // if all the guesses are over, then change the value of submit button to "Play Again"
  guessBtn.value = 'Play Again';
  guessBtn.className += 'playAgain';
}


// Set message
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}