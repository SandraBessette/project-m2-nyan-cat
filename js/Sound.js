class Sound {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
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

  play = ()=>{
    this.domElement.cloneNode().play();
  }
  
}
