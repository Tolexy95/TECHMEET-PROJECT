const lis = document.querySelectorAll("li");
const lbs = document.querySelectorAll(".lb");
const ul = document.querySelector("ul");
const lineDash = document.querySelector(".line-dash");


var dashOrigin = -35; //pixels
var selectedLi = -35; //pixels
var speed = 500; //move this many pixels in one second.
var distance = 0;
var time = 0;

// initial animation and class for HOME
TweenLite.to(lbs[0], 0.6, {
          y: -43,
          ease: Bounce.easeOut,
          delay: 1
        });

lis[0].classList.add("active");

//push all the bottom lines down.
function pushDownLb() {
  for(let k = 0; k < lbs.length; ++k)
    TweenLite.to(lbs[k], 0.5, {
          y: 0,
          ease:  Power3.easeOut
        });
}

ul.addEventListener(
  "mouseleave",
  function(e) {
    // to avoid a bug in chrome that sometimes triggers mouseleave on click
    // and the relatedTarget comes up null
    if (e.relatedTarget) {
      distance = Math.abs(dashOrigin - selectedLi);
      time = distance / speed;
      dashOrigin = selectedLi;
      if (time) {
        // overlaping tweens would give a zero time
        TweenLite.to(lineDash, time, {
          strokeDashoffset: selectedLi,
          ease: Bounce.easeOut
        });
      } //if
    } //if
  },
  false
);

for (let i = 0; i < 4; ++i) {
  lis[i].addEventListener("mouseover", function() {
    distance = Math.abs(-250 * i - 35 - dashOrigin);
    time = distance / speed;
    dashOrigin = -250 * i - 35;
    if (time) {
      TweenLite.to(lineDash, time, {
        strokeDashoffset: -250 * i - 35,
        ease: Bounce.easeOut
      });
    } //if
  });

  lis[i].addEventListener("click", function() {
    selectedLi = -250 * i - 35;
    pushDownLb();
    let current = document.getElementsByClassName("active");
    current[0].classList.remove("active");
    lis[i].classList.add("active");
    TweenLite.to(lbs[i], 0.5, {
          y: -43,
          ease: Bounce.easeOut
        });
  });
}
// Setting up the Variables
var bars = document.getElementById("nav-action");
var nav = document.getElementById("nav");


//setting up the listener
bars.addEventListener("click", barClicked, false);


//setting up the clicked Effect
function barClicked() {
  bars.classList.toggle('active');
  nav.classList.toggle('visible');
}

function displayWordBoxes() {
    var container = document.querySelector('.writeupContainer');
    var wordBoxes = document.getElementsByClassName("hireTalent");
    var currentIndex = 0;
  
    function showNextWordBox() {
      // Hide all WordBoxes
      for (var i = 0; i < wordBoxes.length; i++) {
        wordBoxes[i].style.display = "none";
      }
  
      // Display the current WordBox
      wordBoxes[currentIndex].style.display = "block";
  
      // Increment the index to move to the next WordBox
      currentIndex = (currentIndex + 1) % wordBoxes.length;
  
      // Call the function recursively after 8 seconds (8000 milliseconds)
      setTimeout(showNextWordBox, 8000);
    }
  
    // Delay the initial call of the function by 8 seconds (8000 milliseconds)
    setTimeout(showNextWordBox, 8000);
  }
  
  // Call the function once the page has finished loading
  window.addEventListener("load", function () {
    displayWordBoxes();
  });
  
export const signUpBtn = document.querySelector(".sign-up-btn");
