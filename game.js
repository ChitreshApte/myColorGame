var numSquares=6;
var colors=[];
var pickedColor;

var squares=document.getElementsByClassName("square");
var colorDisplay=document.getElementById("colorDisplay");
var messageDisplay=document.querySelector("#message");
var h1=document.querySelector("h1");
var resetColors=document.querySelector("#resetColors");
var modes=document.querySelectorAll(".mode");

init();//This function is the starting point

function init(){
    setModeButtons();
    setSquares();
    //This is important
    resetUsual();
}

function setModeButtons(){
    for(var i=0;i<modes.length;i++){
        modes[i].addEventListener("click", function(){
            modes[0].classList.remove("selected");
            modes[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent==="Easy"?numSquares=3:numSquares=6;
            resetUsual();
        });
    }
}

function setSquares(){
    for(var i=0;i<squares.length;i++){
        squares[i].addEventListener("click", function(){
           //what is the color of this square
            var clickedColor=this.style.backgroundColor;
            //compare this color with the picked color
            if(clickedColor===pickedColor){
                messageDisplay.textContent="Correct!";
                changeColors(clickedColor);
                h1.style.backgroundColor=clickedColor;
                resetColors.textContent="Play Again?"
            } else {
                this.style.backgroundColor="#232323";
                messageDisplay.textContent="Try Again";
            } 
        });
    }
}

function resetUsual(){
    //we have picked up 6 or 3 new colors
    colors=generateRandomColors(numSquares);
    //we have to change the pickedColor
    pickedColor=pickColor();
    //change the color in display on top 
    colorDisplay.textContent=pickedColor;
    //reset the message
    messageDisplay.textContent="";
    //reset back to NEW GAME
    resetColors.textContent="New Colors";
    //change the square colors
    for(var i=0;i<squares.length;i++){
        if(colors[i]){
            squares[i].style.display="block";
            squares[i].style.backgroundColor=colors[i];
        }else{
            squares[i].style.display="none";
        }
    }
    h1.style.backgroundColor="steelblue";
}

//this is when user selects NEW GAME
resetColors.addEventListener("click", function(){
    resetUsual();
});

//when user clicks on the CORRECT color
function changeColors(colorTochange){
    //loop through all the colors and change their color to the correct one
    for(var j=0;j<squares.length;j++){
        squares[j].style.backgroundColor=colorTochange;
    }
}

function pickColor(){
    var random=Math.floor(Math.random()*colors.length);
    return colors[random];
}

function generateRandomColors(num){

    var arr=[];
    for(var i=0;i<num;i++){
        arr.push(randomColor());
    }
    return arr; 
}

function randomColor(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}