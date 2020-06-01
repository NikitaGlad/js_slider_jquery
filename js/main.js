

var carousel = $(".carousel")
var slides = $(".slide");
var indicators = $(".indicator");
var btnPlayPause = $("#pause");
var btnNext = $("#next");
var btnPrev = $("#prev");
var indicatorContainer = $(".indicators");

var left = "ArrowLeft"
var right = "ArrowRight";
var space = " ";

var slideInterval = setInterval(roll, 2000);
var currentSlide = 0;
var isplaying = true;
var swipeStartX = null;
var swipeEndX = null;





function roll (n){
    if(n === undefined){
        n = currentSlide + 1;
    }
    slides.eq(currentSlide).toggleClass("active");
    indicators.eq(currentSlide).toggleClass("active");
    currentSlide = (n + slides.length) % slides.length;
    slides.eq(currentSlide).toggleClass("active");
    indicators.eq(currentSlide).toggleClass("active");
}



function next(){
    roll(currentSlide + 1);
}
function prev(){
    roll(currentSlide - 1);
}



function playPause(){
    console.log(isplaying)
    if(isplaying){
        pause();
    }else{
        play();
    }
}

function pause(){
    btnPlayPause.html("Play");
    clearInterval(slideInterval);
    isplaying = false;
    
}

function play (){
    btnPlayPause.html("Pause");
    slideInterval = setInterval(roll, 2000);
    isplaying = true;
}

function clickNext(){
    pause();
    next();
}
function clickPrev(){
    pause();
    prev();
}

function indicatorTo(e) {
    var target = $(e.target);
    
    if(target.hasClass("indicator")){
        pause();
        roll(+target.attr("data-slide-to"));
    }
    target.blur()

}

function pressKey(e){
    if(e.key === right) clickNext();
    if(e.key === left) clickPrev();
    if(e.key === space) playPause();
}

function swipeStart(e){
  
    swipeStartX = e.changedTouches[0].pageX;
}

function swipeEnd(e){
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX < -30) clickPrev();
    if (swipeStartX - swipeEndX > 30) clickNext();
}


btnPlayPause.click((e) => {
    playPause()
    btnPlayPause.blur()
});
btnNext.click(() => {
    clickNext()
    btnNext.blur()
});
btnPrev.click(() => {
    clickPrev()
    btnPrev.blur()
});
indicatorContainer.click((e) => {
    indicatorTo(e)
});
$(document).keydown(pressKey);
carousel.on("touchstart", swipeStart);
carousel.on("touchend", swipeEnd);
