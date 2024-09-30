/* 
    Assigmnet 2 - Simon Says Game
    Sabin Ghet
    22499834

    Windows - Chrome
    
*/

document.addEventListener('DOMContentLoaded', () => {

        /*
        ---------------------------------------------------------------------------
                                      Constructors
        ---------------------------------------------------------------------------
        */

     class SimonGame {
        constructor() {
            this.sequence = [];
            this.userClicks = [];
            this.colors = ['red', 'green', 'blue', 'yellow'];
            this.level = 0;
            this.gameStarted = false;
            this.gameOver = false;
            this.lightStatus = 'red';
            this.gameSpeed = 500;
        }

        /*
        ---------------------------------------------------------------------------
                                Starting Game Funtion
        ---------------------------------------------------------------------------
            - When the game starts the 'game-status' turns green.
            - Once the start button is clicked a 3 seconds timer
            delays the start of the game.
            - Once the 'gameOver' function is called this resets the game.
        */

        startGame() {
            if (!this.gameStarted || this.gameOver) {
                this.resetGame();
                this.lightStatus = 'green';
                setTimeout(() => {
                    this.generateSignal();
                }, 3000);
                this.gameStarted = true;
                this.gameOver = false;
            }
        }

        /*
        ---------------------------------------------------------------------------
                                  Signal Funtion
        ---------------------------------------------------------------------------
            - This function creaetes a copy of the previos sequence(if applicable)
            then it randomly flashes one of the 4 colours.
            - It then checks if the randomly created colour is the same as last one
            if it is, then genrate a new colour.
            - It adds the random colour to sequence, then repeats.
        */
  
        generateSignal() {
            const previousSequence = [...this.sequence];
            const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
            if (previousSequence[previousSequence.length - 1] === randomColor) {
                this.generateSignal();
                return;
            }
            this.sequence.push(randomColor);
            previousSequence.forEach((color, index) => {
                setTimeout(() => {
                    this.flashSignal(color);
                }, (index + 1) * this.gameSpeed);
            });
            setTimeout(() => {
                this.flashSignal(randomColor);
            }, (previousSequence.length + 1) * this.gameSpeed);
        }

        /*
        ---------------------------------------------------------------------------
                                  Flash Funtion
        ---------------------------------------------------------------------------
            - Find the button element corresponding to the color.
            - Add the 'active' class to make it appear as flashing.
            - After a delay, remove the 'active' class to stop flashing.
            - Check if the end of the level is reached after flashing.
        */
  
        flashSignal(color) {
            const button = document.querySelector(`.${color}-button`);
            button.classList.add('active');
            setTimeout(() => {
                button.classList.remove('active');
                this.checkEndOfLevel();
            }, this.gameOver ? 300 : this.gameSpeed/2);
        }

         /*
        ---------------------------------------------------------------------------
                                  Click Mangaging
        ---------------------------------------------------------------------------
            - Check if the game is not over.
            - If not over, push the clicked color to userClicks array.
            - Check user input to see if it matches the sequence.
        */
  
        handleUserClick(color) {
            if (!this.gameOver) {
                this.userClicks.push(color);
                this.checkUserInput();
            }
        }

         /*
        ---------------------------------------------------------------------------
                                  User Input Managment
        ---------------------------------------------------------------------------
            - Iterate through userClicks and sequence arrays.
            - If there's a mismatch, set gameOver to true and end the game.
            - If the user has completed the current level without any mismatches:
                 - Increment the level.
                 - Reset userClicks array.
                 - Update score.
                 - Adjust game speed based on score milestones.
                 - Generate the next signal after a delay.
        */        
  
        checkUserInput() {
            for (let i = 0; i < this.userClicks.length; i++) {
                if (this.userClicks[i] !== this.sequence[i]) {
                    this.gameOver = true;
                    this.endGame();
                    break;
                }
            }
            if (this.userClicks.length === this.sequence.length && !this.gameOver) {
                this.level++;
                this.userClicks = [];
                this.updateScore();
                if (this.score == 5 || this.score == 9 || this.score == 13) 
                  gameSpeed -= 150;
                setTimeout(() => {
                    this.generateSignal();
                }, 1000);
            }
        }

         /*
        ---------------------------------------------------------------------------
                                  Score Mangemant
        ---------------------------------------------------------------------------
            - Get the current high score and current score.
            - Increment the current score.
            - Update the current score displayed.
            - If the current score surpasses the high score, update the high 
              score displayed.
        */    
  
        updateScore() {
          var highScore = document.getElementById("high-score").innerHTML;
          var currentScore = document.getElementById("current-score").innerHTML;
  
          currentScore++;
          document.getElementById("current-score").innerHTML = currentScore;
  
          if (currentScore > highScore) {
            document.getElementById("high-score").innerHTML = currentScore;
          }
        }

        /*
        ---------------------------------------------------------------------------
                                  End Level Check
        ---------------------------------------------------------------------------
            - If the length of userClicks array matches the length of the
              sequence array and the game is not over:
                    - Increment the level.
                    - Reset userClicks array.
                    - Generate the next signal after a delay.
        */ 
  
        checkEndOfLevel() {
            if (this.userClicks.length === this.sequence.length && !this.gameOver) {
                this.level++;
                this.userClicks = [];
                setTimeout(() => {
                    this.generateSignal();
                }, 1000);
            }
        }

        /*
        ---------------------------------------------------------------------------
                                End Game Sequence
        ---------------------------------------------------------------------------
            - Determine the duration for flashing based on whether
               the game is over or not.
            - Set an interval to flash all colors twice the flash duration.
            - After flashing, clear the interval, turn off game status indicator
               and reset the game after a delay.
        */ 
  
        endGame() {
            const flashDuration = this.gameOver ? 300 : this.gameSpeed/2;
            const flashInterval = setInterval(() => {
                this.colors.forEach(color => {
                    const button = document.querySelector(`.${color}-button`);
                    button.classList.add('active');
                    setTimeout(() => {
                        button.classList.remove('active');
                    }, flashDuration);
                });
            }, flashDuration * 2);
  
            setTimeout(() => {
                clearInterval(flashInterval);
                gameStatus.turnOff();
                this.resetGame();
            }, 3000);
        }

                /*
        ---------------------------------------------------------------------------
                                  Reset Game Function
        ---------------------------------------------------------------------------
            - Reset all game properties to their initial values.
            - Set the current score displayed to 0.
        */ 
  
        resetGame() {
            this.sequence = [];
            this.userClicks = [];
            this.level = 1;
            this.gameStarted = false;
            this.gameOver = false;
            this.lightStatus = 'red';
            document.getElementById("current-score").innerHTML = 0;
            this.gameSpeed = 500;
        }
    }

        /*
        ---------------------------------------------------------------------------
                                  Game Status Indicator
        ---------------------------------------------------------------------------
            - If the 'tunrOn' function is called the 'game-status' gains the 
              attributes from the 'game-status-on' function.
            - If the 'turnOff' function is caleld it gets rid of 'game-status
              on attributes. 
        */ 

    class GameStatus {
        constructor(elementSelector) {
            this.element = document.querySelector(elementSelector);
        }
  
        turnOn() {
            this.element.classList.add('game-status-on');
        }
  
        turnOff() {
            this.element.classList.remove('game-status-on');
        }
    }    
    
    /*
    ---------------------------------------------------------------------------
                        Button Functionality and Game create
    ---------------------------------------------------------------------------
        -It creates a new Simon Says game
        -This section of functions add event listeners to the button to 
         allow functionality.
    */ 

    const simon = new SimonGame();
    const gameStatus = new GameStatus('.game-status');
  
    document.querySelector('.start-button').addEventListener('click', () => {
        gameStatus.turnOn();
        simon.startGame();
    });
  
    document.querySelector('.red-button').addEventListener('click', () => {
        simon.handleUserClick('red');
    });
  
    document.querySelector('.green-button').addEventListener('click', () => {
        simon.handleUserClick('green');
    });
  
    document.querySelector('.blue-button').addEventListener('click', () => {
        simon.handleUserClick('blue');
    });
  
    document.querySelector('.yellow-button').addEventListener('click', () => {
        simon.handleUserClick('yellow');
    });
  });
  