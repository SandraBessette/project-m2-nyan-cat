//This class create a audio element in the dom
class Sound {
  // The constructor takes 2 parameter. One parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node. The second parameter is the source of the sound
  constructor(root, src) {
    this.root = root;
    const div = document.createElement('audio');

    div.src = src;
    div.setAttribute("preload", "auto");
    div.setAttribute("controls", "none");
    div.style.display = "none";

    this.root.appendChild(div);    

    this.domElement = div; 
   
  }

 //Play the audio file.
  play = ()=>{
    this.domElement.cloneNode().play();
  }
  
}
