//GLOBAL
let gameStop = false;
let filled = false;
let lastPressed = "O";
let fields = "";
let board = "";
let BequalD = 3;
let FequalD = 3;
var x, y;
var count = 0;
var xWin = 0;
var oWin = 0;
let theme = "Dark";
var main = false;
var BcellD = l/BequalD;
var FcellD = (l/Vlines)/Math.pow(BequalD, 2);
document.body.style.backgroundColor = "black";

//CANVAS 1 SCOREBOARD
var canvas = document.getElementById("Canvas1");
var ctx = canvas.getContext("2d");
var cwidth = 200;
var cheight = 100;

  ctx.fillStyle = "black"; // fills canvas in black
  ctx.fillRect(0, 0, 200, 100); // coordinates
  ctx.strokeStyle = '#FFFFFF'; // fills border in white
  ctx.strokeRect(0, 0, 200, 100); // coordinates
  ctx.lineWidth = 4; // line width
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF"; // fills in text with white
  ctx.font = "20px Arial"; // size and font
  ctx.fillText("Scoreboard", 10, 20); // text, x, y
  ctx.fillText("X: ", 10, 50); // text, x, y
  ctx.fillText("O: ", 100, 50);// text, x, y

//CANVAS 2 PLAYING BOARD
var canvas = document.getElementById("Canvas2");
var ctx = canvas.getContext("2d");
var length = l;
let l = 300;

  ctx2.fillStyle = "black"; // fills canvas in black
  ctx2.fillRect(0, 0, l, l); // coordinates
  ctx2.strokeStyle = '#FFFFFF'; // fills border in white
  ctx2.strokeRect(0, 0, l, l); // coordinates
  ctx2.lineWidth = 4; // line width
  ctx2.stroke();

  BDrawlines();

  function BDrawlines() {
    for (let Vlines = 1; Vlines < BequalD; Vlines ++) {
      ctx.strokeStyle = 'white';
      ctx.moveTo(l*Vlines/BequalD, 0);
      ctx.lineTo(l*Vlines/BequalD, l);
      ctx.lineWidth = 7;
      ctx.stroke();
    }

    for (let Hlines = 1; Hlines < BequalD; Hlines ++) {
      ctx.strokeStyle = 'white';
      ctx.moveTo(0, l*Hlines/BequalD);
      ctx.lineTo(l, l*Hlines/BequalD);
      ctx.lineWidth = 7;
      ctx.stroke();
    }
  }
