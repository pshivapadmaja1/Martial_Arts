var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

ctx.fillRect(650,0,500,500);

let loadImage1 = (src, callback) =>{
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath1 = (frameNumber, animation) => {
  return "images1/" + animation + "/" + frameNumber + ".png";
};

let frames1 = {
  idle: [1,2,3,4,5,6,7,8],
  kick: [1,2,3,4,5,6,7],
  punch: [1,2,3,4,5,6,7],
};

let loadImages1 = (callback) =>{
  let images = {idle: [], kick:[], punch: []};
  let imagesToLoad = 0;

  ["idle", "kick", "punch"].forEach((animation) =>{
    let animationFrames = frames1[animation];
    imagesToLoad = imagesToLoad + animationFrames.length;

    animationFrames.forEach((frameNumber) =>{
      let path = imagePath1(frameNumber, animation);

      loadImage1(path, (image) => {
        images[animation][frameNumber - 1] = image;
        imagesToLoad = imagesToLoad - 1;

        if (imagesToLoad == 0){
          callback(images);
        }
      });
    });
    
  });
};

let animate1 = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) =>{
    setTimeout(() => {
      ctx.clearRect(650, 0, 500, 500);
      ctx.drawImage(image, 650, 0, 500, 500);
    }, index * 100);
  });
  setTimeout(callback, images[animation].length * 100);
};

loadImages1((images) => {
  let queuedAnimations = [];

  let  aux = () =>{
    let selectedAnimation;

    if(queuedAnimations.length == 0){
      selectedAnimation = "idle";
    }
    else{
      selectedAnimation = queuedAnimations.shift();
    }
    animate1(ctx, images, selectedAnimation, aux)
  }
  animate1(ctx, images, "idle", () => {
    console.log("Done!");
  });
  aux();

  document.getElementById("kick").onclick = () => {
    queuedAnimations.push("kick");
  };

  document.getElementById("punch").onclick = () => {
    queuedAnimations.push("punch");
  };

  /*
  document.addEventListener("keyup",(event)) = {
    const key = event.key;

    if(key == "ArrowLeft"){
      queuedAnimations.push("kick");
    }
    else if(key == "ArrowRight"){
      queuedAnimations.push("punch");
    }
  });
  */
});