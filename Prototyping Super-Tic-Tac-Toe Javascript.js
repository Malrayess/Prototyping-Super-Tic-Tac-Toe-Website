//GLOBAL
let gameStop = false;
let filled = false;
let lastPressed = "O";
let fieldCells = "";
let boardCells = "";
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
var cellD = l/FcellD;
var BoardCellD = l/BcellD;

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

  var Brow1 = [" ", " ", " "];
  var Brow2 = [" ", " ", " "];
  var Brow3 = [" ", " ", " "];
  var board = [Brow1, Brow2, Brow3];

  var Frow1 = [" ", " ", " "];
  var Frow2 = [" ", " ", " "];
  var Frow3 = [" ", " ", " "];
  var field = [Frow1, Frow2, Frow3];

  createBoard();

  function createBoard() {
    for (let r = 0; r < BequalD; r++) {
      var Brow = board[r];
      for (let c = 0; c < BequalD; c++) {
        Brow[c] = "";
        createField();
      }
    }
  }

  function createField() {
    for (let r = 0; r < FequalD; r++) {
      var Frow = field[r];
      for (let c = 0; c < FequalD;c++) {
        Frow[c] = "";
      }
    }
  }

  document.onmousemove = function(evt) { // event listener for mouse
    //call function here
    mousePos = getMousePosition(evt); // gets mouse position by calling function, x y
  }
  function getMousePosition(evt) { // function that calculates mouse position
    var rect = Canvas2.getBoundingClientRect(); // gets coords based off of the canvas 2
      x = Math.round(evt.clientX - rect.left);
      y = Math.round(evt.clientY - rect.top);
  }

  document.onmousedown = function() { //event listener for if mouse is pressed
  //call function here
  allPlacingCode(x, y); // function of all placing, 2 player AND AI
}

function allPlacingCode() {
  var c, r, Bc, Br;
//add board c,r defined, helps with placing code or drawing
  c = Math.floor((x/cellD) % FequalD);
  r = Math.floor((y/cellD) % FequalD);
  Bc = Math.floor(x/BcellD);
  Br = Math.floor(y/BcellD);

  console.log("Field C: " + c + " Field R: "+ r + " Board C: " + Bc + " Board R: " + Br);
  var Frow = field[r];
  var Brow = board[Br];
  if (c >= 0 && c < FcellD && r >= 0 && r < FcellD && Frow[c] == "" && gameStop == false) {
    if (lastPressed == "X") {
      Frow[c] = "O";
      placing(c, r, "O");
      console.log("O");
      lastPressed = "O";

      nextMoveCboard = Math.floor((x/cellD) % FequalD);
      nextMoveRboard = Math.floor((y/cellD) % FequalD);

      console.log("Next C Move on Board: " + nextMoveCboard + " Next R Move on Board: " + nextMoveRboard);
      /*
      if (!gameStop) {
      check3inRow();
    }
      */
    } else {
      Frow[c] = "X";
      placing(c, r, "X");
      console.log("X");
      lastPressed = "X";

      nextMoveCboard = Bc;
      nextMoveRboard = Br;

      console.log("Next C Move on Board: " + nextMoveCboard + " Next R Move on Board: " + nextMoveRboard);

      /*
      if (!gameStop) {
      check3inRow();
    }
      */
    }
  }
}


function placing(c, r, symbol) {
  ctx2.fillStyle = "#FFFFFF";
  ctx2.font = "20px Arial";
  ctx2.fillText(symbol, c*cellD + cellD/4, (r+1)*cellD - cellD/4);
  count += 1;

//  ThreeinRow();
}
