//This class create a div element in the dom thata will contain a text. 
class Text {
  // The constructor has three parameters the DOM roots ansd the x and y position of the text
  constructor(root, xPos, yPos) {   
    this.root = root;
    const div = document.createElement('div');

    div.style.position = 'absolute';
    div.style.left = xPos;
    div.style.top = yPos;
    div.style.color = 'white';
    div.style.font = 'bold 30px Impact';
    div.style.zIndex = 2000;

    this.root.appendChild(div);    

    this.domElement = div;
    this.text = "";
  }

  // This method is used to update the text displayed in the DOM element
  update(txt) {
    this.domElement.innerText = txt;
    this.text = this.domElement.innerText;    
  }

  //Remove the text element
  remove = ()=>{
    this.root.removeChild(this.domElement);
  }
}
