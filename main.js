let c = document.getElementById("my-canvas");
let ctx = c. getContext("2d");

let LoadImage = (src, callback) => {
let img = document.createElement("img");

img.onload = () => callback(img);

img.src = src;
};

let imagePath = (frameNumber, animation) => {
   return "C:/Users/Sheetal/Desktop/martial arts/images/"  + animation + "/" + frameNumber + ".png";
}

let frames = {
   idle: [1, 2, 3, 4, 5, 6, 7, 8],
   kick: [1, 2, 3, 4, 5, 6, 7], 
   punch: [1, 2, 3, 4, 5, 6, 7],
   forward:[1, 2, 3, 4, 5, 6],
   backward:[1, 2, 3, 4, 5, 6],
   block:[1, 2, 3, 4, 5, 6, 7, 8, 9],
};

let LoadImages = (callback) => {
   let images = {idle: [], kick: [], punch: [], forward: [], backward: [], block: [] };
   let imagesToLoad = 0;

   //calls back with an array of loaded images
   ["idle", "kick", "punch", "forward", "backward", "block"].forEach((animation) => {
     let animationFrames = frames[animation]; 
     imagesToLoad = imagesToLoad + animationFrames . length;
 
     animationFrames.forEach((frameNumber) => {
      let path = imagePath(frameNumber, animation);

      LoadImage(path, (image) => {
         images[animation][frameNumber -1] = image;
         imagesToLoad = imagesToLoad - 1;

         if (imagesToLoad === 0) {
            callback(images);
         }
         // do something with that image
      });
   });
});
     };
     

let animate = (ctx, images, animation, callback) => {
   images[animation].forEach((image, index) => {
      setTimeout(() => {
         ctx.clearRect(0, 0, 500, 500);
         ctx.drawImage(image , 0, 0, 500, 500);
      }, index * 100); 
   });
   setTimeout(callback, images[animation].length * 100);
};

LoadImages((images) =>  {
let queuedAnimations = [];

let aux = () => {
   let selectedAnimation;
   if (queuedAnimations.length === 0) {
      selectedAnimation = "idle"
   } else {
      selectedAnimation = queuedAnimations.shift();
   }
   animate(ctx, images, selectedAnimation, aux)
};

  aux();

  document.getElementById("kick").onclick = () => {
     queuedAnimations.push("kick");
  };

  document.getElementById("punch").onclick = () => {
   queuedAnimations.push("punch");
};

document.getElementById("forward").onclick = () => {
   queuedAnimations.push("forward");
};

document.getElementById("backward").onclick = () => {
   queuedAnimations.push("backward");
};

document.getElementById("block").onclick = () => {
   queuedAnimations.push("block");
};

document.addEventListener('keyup', (event) => {
   const key = event.key; 

   if (key === "ArrowLeft") {
      queuedAnimations.push("kick");
 } else if (key === "ArrowRight") {
   queuedAnimations.push("punch");
 } else if (key === "ArrowUp") {
   queuedAnimations.push("forward");
 } else if (key === "ArrowDown") {
   queuedAnimations.push("backward");
 } else if (key === " ") {
   queuedAnimations.push("block");
 }
});
   });


