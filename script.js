
let cursor = document.createElement("img");
$(cursor).attr("src","img/52732.png")
         .css({
            "height" : "10rem",
            "position" : "absolute",
          })
          .appendTo($("body"));
          
$(document).mousemove(moveCursor);
 
function moveCursor(e) {
  e.preventDefault();
  $(cursor).css({
    "top": (e.clientY+10) + "px",
    "left": (e.clientX+10) + "px",
  })
}

let windowBorder = document.querySelector(".windowBorder");
$(windowBorder).css({
                  "position": "fixed",
                  "top" : "0",
                  "left" : "0",
                  "height" : document.documentElement.clientHeight,
                  "width"  : document.documentElement.clientWidth,
                  // "background" : "cyan",// //синий экран потом убирается//
                  "owerflow" : "hidden",// вместо синего экрана
                }) 
let virusInterval = setInterval(createVirus, 500);
let virusKilled = 0;

function createVirus() {
 if($(windowBorder).children().length >= 10) {
   return;
 } 
 let virus = document.createElement("img");
 $(virus).attr("src", "img/virus.png")
         .css({
          "height" : "100px",
          "width"  : "100px",
          "position" : "absolute",
          "top" : "-150", 
          "left" : Math.floor(Math.random() * ($(windowBorder).width() - 100)) ,
        })
        .appendTo($(windowBorder));
  let maxHeight = document.documentElement.clientHeight + 150;      
  let virusDropInterval = setInterval(() => {
    let virusTop = parseInt($(virus).css("top"));
    if (virusTop < maxHeight) {
      $(virus).css("top", virusTop + 1 + "px");
    } else { 
      virus.remove();
      clearInterval(virusDropInterval);
    }
  }, 3 + Math.floor(Math.random()*17)); //      
  virus.onclick = () => { 
    let virusCoords = virus.getBoundingClientRect();
    let virusTop = virusCoords.y;
    let virusLeft = virusCoords.x;
    virus.remove();
    let pop = document.createElement("img");
    $(pop).attr("src", "img/pop.gif")
          .css({
            "height" : "300px",
            "width"  : "300px",
            "position" : "absolute",
            "top" : virusTop + "px", 
            "left" : virusLeft + "px", 
          }) 
          .appendTo($(windowBorder)); // взрыв
    let popTimeout = setTimeout(() => {pop.remove()}, 1200)// время взрыва 900 милисек 
    killVirus();
  } 
} 

function killVirus() {
 virusKilled++;
 $(".virusKilled").html(virusKilled);//сколько вирусов убито + строка сверху
 if (virusKilled >=10) {
   alert("Вы победили вирус !");
   virusKilled = 0;
 }
 

}
