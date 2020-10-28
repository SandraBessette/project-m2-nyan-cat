//The reward class represents an element that gives a higher score to the player when it get it. 
class Reward {
    // The constructor takes 2 parameters. The first parameter refers to the parent DOM node.
    // We will be adding a DOM element to this parent DOM node. We must also incluse the reward spot in X and Y to retrieve its position.
    constructor(root, spotX, spotY) {     
      this.root = root;

      this.x = spotX * REWARD_WIDTH;  
  
      this.y = spotY * REWARD_HEIGHT;

      //The price is the value of the reward. The more the reward is place hight in the game the more it is risky to get it and the more value it has.
      const rewardYSpots = GAME_HEIGHT / REWARD_HEIGHT;
      this.price = Math.abs((spotY - rewardYSpots) * 10);     
  
      // We create a DOM node. 
      this.domElement = document.createElement('img');
      this.domElement.src = './images/cheese.png'; 
      this.domElement.style.position = 'absolute';
      this.domElement.style.left = `${this.x}px`;
      this.domElement.style.top = ` ${this.y}px`;
      this.domElement.style.height = ` ${REWARD_HEIGHT}px`;
      this.domElement.style.width = ` ${REWARD_WIDTH}px`;
      this.domElement.style.zIndex = '8';
      this.root.appendChild(this.domElement);

    // The price text indicates the value of the reward.
     this.priceText = new Text(this.root,`${this.x }px`,` ${this.y }px`)
     this.priceText.update("+" + this.price.toString());
     this.priceText.domElement.style.color = "gold";
     this.priceText.domElement.style.fontSize = "18px";
     this.priceText.domElement.style.textShadow = "3px 3px purple";
     this.priceText.domElement.style.zIndex = "1000";
    }

    //Scale the reward images and the price text.
    scale = ()=>{
      this.domElement.style.transform = "scale(1.2,1.2)";
      this.priceText.domElement.style.transform = "scale(1.2,1.2)";
    };
  
    //Remove the dom element.
    remove = ()=>{
      this.root.removeChild(this.domElement);
      this.priceText.remove();
    };
}  