class Reward {
    // The constructor takes one parameter. This parameter refers to the parent DOM node.
    // We will be adding a DOM element to this parent DOM node.
    constructor(root, spotX, spotY) {
      // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
      // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
      // the leftmost x position of the image.
      this.x = spotX * REWARD_WIDTH;
  
      // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
      // hamburger. The y position is the distance from the top margin of the browsing area.
      this.y = spotY * REWARD_HEIGHT;

      this.root = root;

      const rewardYSpots = GAME_HEIGHT / REWARD_HEIGHT;
      this.price = Math.abs((spotY - rewardYSpots) * 10);
      // console.log("rewardYSpots", rewardYSpots);
      // console.log("spotY", spotY);
      // console.log("price", this.price);
  
      // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
      // DOM node in a property.
      this.domElement = document.createElement('img');
      this.domElement.src = "https://images-na.ssl-images-amazon.com/images/I/515LBEVfUQL.png";
      this.domElement.style.position = 'absolute';
      this.domElement.style.left = `${this.x}px`;
      this.domElement.style.top = ` ${this.y}px`;
      this.domElement.style.height = ` ${REWARD_HEIGHT}px`;
      this.domElement.style.width = ` ${REWARD_WIDTH}px`;
      this.domElement.style.zIndex = '10';
      this.root.appendChild(this.domElement);

    //  this.priceText = new Text(this.root,`${(this.x + REWARD_WIDTH/4)}px`,` ${this.y + + REWARD_HEIGHT/4}px`);
     this.priceText = new Text(this.root,`${this.x }px`,` ${this.y }px`)
     this.priceText.update("+" + this.price.toString());
     this.priceText.domElement.style.color = "gold";
     this.priceText.domElement.style.fontSize = "18px";
     this.priceText.domElement.style.textShadow = "2px 2px purple";
    }

    remove = ()=>{
      this.root.removeChild(this.domElement);
      this.priceText.remove();
    }
}  