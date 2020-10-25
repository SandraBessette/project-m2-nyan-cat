// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];

    this.isGameStarted = false;

    this.startButton = startButton();    

    this.GameOverText = addGameOver(this.root);

    this.score = new Text(this.root, "10px", "10px" );
    //this.score.domElement.style.color = "red";
    //this.score.domElement.style.textShadow = "3px 3px purple"
    this.score.update(GAME_START_SCORE);

    this.rewards = [];    

    this.lives = MAX_PLAYER_LIVES;
    // We add the background image to the game
    addBackground(this.root);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }    

    if (this.rewards.length === 0) {
      let rewardSpotsArr = createRewardSpots(this.player);    
      this.rewards = rewardSpotsArr.map((spot) => {       
        return new Reward(this.root, spot[0], spot[1]);
      });  
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      //window.alert('Game over');

      if (this.lives === 3) {
        this.player.boomText.update('💥');
        this.lives = 2;
        this.player.domElement.src = 'images/mouse2.png';        
        const newScore = parseInt(this.score.text) - this.player.price;
        this.score.update(newScore.toString());
        console.log("goes inside if (this.lives === 3)  ");
        setTimeout(()=>{
          this.player.boomText.update('');
          }, 200);
      }
      else if (this.lives === 2){
        this.player.boomText.update('💥');
        this.lives = 1;
        this.player.domElement.src = 'images/mouse3.png';
        const newScore = parseInt(this.score.text) - this.player.price;
        this.score.update(newScore.toString());
        console.log("goes inside if (this.lives === 2)  ");
        setTimeout(()=>{
          this.player.boomText.update('');
          }, 200);

      }
      else {
        this.player.boomText.update('💥');
        this.isGameStarted = false;
        this.GameOverText.domElement.style.visibility = "unset";
        this.startButton.classList.remove("btn-clicked");
        this.startButton.disabled = false;
        this.lives = 0;
        console.log("goes inside else ");
        return;
      }

      
    }  

    const theReward = this.rewardCatched();
    if (theReward !== undefined) {     

      const newScore = parseInt(this.score.text) + theReward.price;
      this.score.update(newScore.toString());
      const index = this.rewards.indexOf(theReward);
      if (index > -1) {
        this.rewards.splice(index, 1);
      }
     
      theReward.scale();
      setTimeout(()=>{
      theReward.remove();
      }, 500);
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };

  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  //this method upgrade the enemies array at the same time
  isPlayerDead = () => {    
    let isDead = false;
    this.enemies = this.enemies.filter((enemy) => {
      const enemyHit = (enemy.x === this.player.x) && (enemy.y + ENEMY_HEIGHT > this.player.y && enemy.y < this.player.y + PLAYER_HEIGHT);
      if (enemyHit) {
        isDead = true;
        if (this.lives > 1) {
          enemy.remove();
          return false;
        }
      }        
      return true;    
    });
  
    return isDead;
  };

  rewardCatched = () => {    
    return this.rewards.find((reward) => {     
      return ((reward.x === this.player.x) && (reward.y + REWARD_HEIGHT > this.player.y && reward.y < this.player.y + PLAYER_HEIGHT));
    });    
  };

  reset = () => {
    this.player.reset();
    this.startButton.classList.add("btn-clicked");
    this.startButton.disabled = true; 
    this.GameOverText.domElement.style.visibility = "hidden";
    this.rewards.forEach((reward)=>{
        reward.remove();
    });
    this.rewards = [];    
    this.enemies.forEach((enemy)=>{
      enemy.remove();
    });
    this.enemies = [];
    this.score.update(GAME_START_SCORE);
    this.lives = 3;
    
  };
}
