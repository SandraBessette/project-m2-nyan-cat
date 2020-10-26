// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = 3 * PLAYER_WIDTH;

    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    this.y = GAME_HEIGHT - PLAYER_HEIGHT;

    this.boomText = new Text(root,`${this.x}px`,` ${this.y }px`);
    this.boomText.domElement.style.fontSize  = "65px";
    this.price = "100";

      /*this.priceText = new Text(root,`${this.x }px`,` ${this.y }px`)
     //this.priceText.update("-" + this.price);
     this.priceText.domElement.style.color = "gold";
     this.priceText.domElement.style.fontSize = "36px";
     this.priceText.domElement.style.textShadow = "3px 3px purple";
     this.priceText.domElement.style.zIndex = "3000";*/

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = document.createElement('img');
    this.domElement.src = 'images/mouse1a.png';//'images/mouse.png';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = '10';
    this.domElement.style.height = ` ${PLAYER_HEIGHT}px`;
    this.domElement.style.width = ` ${PLAYER_WIDTH}px`;
    this.domElement.style.zIndex = '10';
    root.appendChild(this.domElement);
  }

  // This method will be called when the user presses the left key. See in Engine.js
  // how we relate the key presses to this method
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
    this.boomText.domElement.style.left = `${this.x}px`;
  }

  // We do the same thing for the right key. See Engine.js to see when this happens.
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
    }
    this.domElement.style.left = `${this.x}px`;    
    this.boomText.domElement.style.left = `${this.x}px`;
  }

  moveUp() {
    if (this.y - PLAYER_HEIGHT >= 0) {
      this.y = this.y - PLAYER_HEIGHT;
    }
   
    this.domElement.style.top = `${this.y}px`;
    this.boomText.domElement.style.top = `${this.y}px`;
  }

  moveDown() {
    if (this.y + 2 * PLAYER_HEIGHT <= GAME_HEIGHT) {
      this.y = this.y + PLAYER_HEIGHT;
    }  

    this.domElement.style.top = `${this.y}px`;
    this.boomText.domElement.style.top = `${this.y}px`;
  }

  xSpot() {
    console.log("PlayerXSpot", this.x/PLAYER_WIDTH);
    return this.x/PLAYER_WIDTH;
  }

  ySpot() {
    console.log("PlayerYSpot", this.y/PLAYER_HEIGHT);
    return this.y/PLAYER_HEIGHT;
  }

  reset() {
    this.x = 3 * PLAYER_WIDTH;
    this.y = GAME_HEIGHT - PLAYER_HEIGHT;
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.boomText.domElement.style.top = `${this.y}px`;
    this.boomText.domElement.style.left = `${this.x}px`;
    this.boomText.update("");
    this.domElement.src = 'images/mouse1a.png';
  }
}
