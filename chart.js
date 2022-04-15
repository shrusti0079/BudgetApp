const chart=document.querySelector(".chart");


//creating canvas element
let canvas=document.createElement("canvas");
canvas.width=50;
canvas.height=50;

//appending to chart
chart.appendChild(canvas);

//for drawing canvas, get context.
const ctx=canvas.getContext("2d");

ctx.lineWidth=8;
//circle radius
const r=20;

function drawCircle(color, ratio, anticlockwise) {
    
    ctx.strokeStyle=color;
    ctx.beginPath();
    ctx.arc( canvas.width/2, canvas.height/2, r, 0, ratio*2*Math.PI, anticlockwise);
    ctx.stroke();
}



function updateChart(income, expense) {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    let ratio=income/(income+expense);
    drawCircle("#FFA500", -ratio, false);
    drawCircle("#FFF", 1-ratio, true); 
}