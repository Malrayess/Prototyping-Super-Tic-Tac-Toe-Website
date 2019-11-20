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
var fields = 0;
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


  var F = [];

  for (let i = 0; i < FcellD; i++) {
  F.push("");
}

console.log(F);
/*
function Frowcolumn() {
  for (i = 0; i < Math.pow(BequalD, 4); i++) {
    // calculates and defines F column and F row by multiplying 3 spaces("") in each row of a field by 3, 4 times
    // first to get 9 total spaces per field
    // second to get three fields per row of board
    // third to get three of these fields each column of board
    // fourth to
    Fr = i/FcellD;
    Fc = (i*FequalD) + (i%FequalD);
  }
  console.log("Field C: " + Fc + " Field R: "+ Fr);
}

/*
int i = (r*FequalD) + c;

//When filling in that cell or placing in that cell, instead of filling Frow[c] with "X or O"
  we fill in using the new array F[] and by calling on to the index

  have this i = .. in placing function..? If so, placing function must be called before filling in array
    i = (F*FcellD) + (r*FequalD) + c;

*/
  var Brow1 = [" ", " ", " "];
  var Brow2 = [" ", " ", " "];
  var Brow3 = [" ", " ", " "];
  var board = [Brow1, Brow2, Brow3];

  var Frow1 = ["", "", ""];
  var Frow2 = ["", "", ""];
  var Frow3 = ["", "", ""];
  var field = [Frow1, Frow2, Frow3];

  createBoard();
  //createField();

  function createBoard() {
    for (let r = 0; r < BequalD; r++) {
      var Brow = board[r];
      for (let c = 0; c < BequalD; c++) {
        Brow[c] = "";
        //createField();
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

  /*
  var Frow1 = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  var Frow2 = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  var Frow3 = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  var Frow4 = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  var Frow5 = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  var Frow6 = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  var Frow7 = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  var Frow8 = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  var Frow9 = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
  var field = [Frow1, Frow2, Frow3, Frow4, Frow5, Frow6, Frow7, Frow8, Frow9];

  function createField() {
    for (let r = 0; r < FcellD; r++) {
      var Frow = field[r];
      for (let c = 0; c < FcellD; c++) {
        Frow[c] = "";
      }
    }
  }


    while (fields < FcellD) {
      createField();
      fields++;
    }
    */
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

function allPlacingCode(x, y) {
  var c, r, Bc, Br;
//add board c,r defined, helps with placing code or drawing
  c = Math.floor((x/cellD) % FequalD);
  r = Math.floor((y/cellD) % FequalD);
  Bc = Math.floor(x/BcellD);
  Br = Math.floor(y/BcellD);

  //Frowcolumn();
  console.log("Field C: " + c + " Field R: "+ r + " Board C: " + Bc + " Board R: " + Br);
  var Frow = field[r];
  var Brow = board[r];
  if (c >= 0 && c < FcellD && r >= 0 && r < FcellD && Frow[c] == "" && gameStop == false) {
    if (lastPressed == "X") {
      Frow[c] = "O";
      placing(c, r, "O", Br, Bc);
      console.log("O");
      lastPressed = "O";

      nextMoveCboard = c;
      nextMoveRboard = r;

      console.log("Next C Move on Board: " + nextMoveCboard + " Next R Move on Board: " + nextMoveRboard);
      /*
      if (!gameStop) {
      check3inRow();
    }
      */
    } else {
      Frow[c] = "X";
      placing(c, r, "X", Br, Bc);
      console.log("X");
      lastPressed = "X";

      nextMoveCboard = c;
      nextMoveRboard = r;

      console.log("Next C Move on Board: " + nextMoveCboard + " Next R Move on Board: " + nextMoveRboard);

      /*
      if (!gameStop) {
      check3inRow();
    }
      */
    }
  }
}


function placing(c, r, symbol, Br, Bc) {
  ctx2.fillStyle = "#FFFFFF";
  ctx2.font = "20px Arial";
  ctx2.fillText(symbol, c*cellD + Bc*3*cellD + cellD/4, (r+1)*cellD + Br*3*cellD - cellD/4);
  count += 1;

//  ThreeinRow();
}
