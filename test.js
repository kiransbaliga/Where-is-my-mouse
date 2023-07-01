// inject a button at random position on the page
//button can =t go outside the page

var button = document.createElement("button");
button.innerHTML = "I am here";
button.style.position = "absolute";
//button cant go outside the page
button.style.left = Math.random() * 100 + "%";
button.style.top = Math.random() * 100 + "%";
if (button.style.left > 100) {
  button.style.left = 95;
}
if (button.style.top > 100) {
  button.style.top = 95;
}

//function to add random number <10 number of images that moves same way as mouse

function addImages() {
  var numImages = Math.floor(Math.random() * 10);
  for (var i = 0; i < numImages; i++) {
    var img = document.createElement("img");
    img.src = "./images/main.png";
    img.style.left = Math.random() * 100 + "%";
    img.style.top = Math.random() * 100 + "%";
    img.style.zIndex = 100;
    img.style.width = "20px";
    img.style.height = "24px";
    img.style.position = "absolute";
    document.body.appendChild(img);
  }
}



//shuffle position of all images
function shuffleImages(){
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
        var image = images[i];
        image.style.left = Math.random() * 100 + "%";
        image.style.top = Math.random() * 100 + "%";
    }
}

document.body.appendChild(button);
button.addEventListener("click", function () {
  //move button to random position
  button.style.left = Math.random() * 100 + "%";
  button.style.top = Math.random() * 100 + "%";
  //change background color
 
  document.body.style.backgroundColor =
    "rgb(" +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    ")";
  //change font color
  document.body.style.color =
    "rgb(" +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    "," +
    Math.random() * 255 +
    ")";
  //change font size

  addImages();
  // shuffleImages();
});
//current mouse position


const images = document.getElementsByTagName('img');
let lastMouseX = null;
let lastMouseY = null;

// Start fresh if mouse leaves screen
document.addEventListener('mouseleave', () => {
  lastMouseX = null;
  lastMouseY = null;
});

document.addEventListener('mousemove', (ev) => {
  // Do nothing if this is the first event
  if (lastMouseX !== null) {
    const deltaX = ev.x - lastMouseX;
    const deltaY = ev.y - lastMouseY;
    for (const img of images) {
      let newLeft = img.offsetLeft + deltaX;
      let newTop = img.offsetTop + deltaY;
      // Keep in bounds
      // const minLeft = 0;
      // const minTop = 0;
      // const maxLeft = img.parentElement.clientWidth - img.clientWidth;
      // const maxTop = img.parentElement.clientHeight - img.clientHeight;
      // newLeft = Math.max(minLeft, newLeft);
      // newLeft = Math.min(maxLeft, newLeft);
      // newTop = Math.max(minTop, newTop);
      // newTop = Math.min(maxTop, newTop);
      // update
      img.style.left = newLeft + 'px';
      img.style.top = newTop + 'px';
    }
  }
  lastMouseX = ev.x;
  lastMouseY = ev.y;
});




