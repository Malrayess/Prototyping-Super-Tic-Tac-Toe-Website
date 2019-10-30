//GLOBAL
let gameStop = false;
let filled = false;
let lastPressed = "O";
let fields = "";
let board = "";
let BequalD = 3;
let FequalD = 3;
let l = 300;
let Vlines, Hlines;
var x, y;
var count = 0;
var xWin = 0;
var oWin = 0;
let theme = "Dark";
var main = false;
var BcellD = l/BequalD;
var FcellD = Math.pow(BequalD, 2);
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
var canvas2 = document.getElementById("Canvas2");
var ctx2 = canvas2.getContext("2d");
var length = l;

  ctx2.fillStyle = "black"; // fills canvas in black
  ctx2.fillRect(0, 0, l, l); // coordinates
  ctx2.strokeStyle = '#FFFFFF'; // fills border in white
  ctx2.strokeRect(0, 0, l, l); // coordinates
  ctx2.lineWidth = 4; // line width

  FDrawlines();
  BDrawlines();

  function BDrawlines() {
    for (let Vlines = 1; Vlines < BequalD; Vlines ++) {
      ctx2.beginPath();
      ctx2.strokeStyle = 'blue';
      ctx2.moveTo(l*Vlines/BequalD, 0);
      ctx2.lineTo(l*Vlines/BequalD, l);
      ctx2.lineWidth = 5;
      ctx2.stroke();
    }

    for (let Hlines = 1; Hlines < BequalD; Hlines ++) {
      ctx2.beginPath();
      ctx2.strokeStyle = 'blue';
      ctx2.moveTo(0, l*Hlines/BequalD);
      ctx2.lineTo(l, l*Hlines/BequalD);
      ctx2.lineWidth = 5;
      ctx2.stroke();
    }
  }

  function FDrawlines() {
    for (let Vlines = 1; Vlines < FcellD; Vlines++) {
      ctx2.strokeStyle = 'white';
      ctx2.moveTo(l*Vlines/FcellD, 0);
      ctx2.lineTo(l*Vlines/FcellD, l);
      ctx2.lineWidth = 3;
      ctx2.stroke();
    }

    for (let Hlines = 1; Hlines < FcellD; Hlines++) {
      ctx2.strokeStyle = 'white';
      ctx2.moveTo(0, l*Hlines/FcellD);
      ctx2.lineTo(l, l*Hlines/FcellD);
      ctx2.lineWidth = 3;
      ctx2.stroke();
    }
  }