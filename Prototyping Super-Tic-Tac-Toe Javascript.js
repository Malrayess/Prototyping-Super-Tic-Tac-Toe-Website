//GLOBAL
let gameStop = false;
let lastPressed = "O";
let firstMove = 0;
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

  var B = [];
  var F = [];

  for (let i = 0; i < FequalD * FequalD * BequalD * BequalD; i++) { // first two multiplying is the cells in the field, the second two are the number of fields in the board
    F.push("");
  }

  for (let i = 0; i < BequalD * BequalD; i++) {
    B.push("");
  }

console.log(F);
console.log(B);

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
  if (firstMove == 0) {
    firstMove = 1;
  }
}

function getIndex(c, r, Bc, Br) {
  var i;
  i = (((Br*BequalD) + Bc)*FequalD*FequalD) + (r*FequalD) + c; // the field number * #of cells each field + row inside field(which is 3)*#of cells in field + field column
  return i;
}

function getBindex(c, r, Bc, Br) {
  var Bi;
  Bi = ((r*FequalD) + c);
  return Bi;
}

function allPlacingCode(x, y) {
  var c, r, Bc, Br;
//add board c,r defined, helps with placing code or drawing
  c = Math.floor((x/cellD) % FequalD);
  r = Math.floor((y/cellD) % FequalD);
  Bc = Math.floor(x/BcellD);
  Br = Math.floor(y/BcellD);
  var i, Bi;

  console.log("Field C: " + c + " Field R: "+ r + " Board C: " + Bc + " Board R: " + Br);
  i = getIndex(c, r, Bc, Br);

  if (c >= 0 && c < FcellD && r >= 0 && r < FcellD && F[i] == "" && (firstMove == 0 || (firstMove == 1 && Bc == nextMoveCboard && Br == nextMoveRboard)) && gameStop == false) {
    if (lastPressed == "X") {
      F[i] = "O";
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
      F[i] = "X";
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

  ThreeinRow(c, r, Bc, Br);
}

function ThreeinRow(c, r, Bc, Br) {
  let winX = false;
  let winO = false;
  check3inRow(c, r, Bc, Br);
}

function check3inRow(c, r, Bc, Br) {
  if (checkColumn(c, r, Bc, Br) || checkRow(c, r, Bc, Br) || checkDiagonal(c, r, Bc, Br)) {
    gameStop = true;
    console.log("game is won");
  }
}

function checkColumn(c, r, Bc, Br) {
  var win = false;
  var xCount, oCount;

  for (c=0; c<FequalD; c++) {
    xCount = 0;
    oCount = 0;
    for (r=0; r<FequalD; r++) {
      i = getIndex(c, r, Bc, Br);
      if (F[i] == "X") {
        xCount++;
      }
      if (F[i] == "O") {
        oCount++;
      }
    }
    if (xCount == FequalD) {
      return true;
    }
    if (oCount == FequalD) {
      return true;
    }
  }
  return win;
}

function checkRow(c, r, Bc, Br) {
  var win = false;
  var xCount, oCount;

  for (r=0; r<FequalD; r++) {
    xCount = 0;
    oCount = 0;
    for (c=0; c<FequalD; c++) {
      i = getIndex(c, r, Bc, Br);
      if (F[i] == "X") {
        xCount++;
      }
      if (F[i] == "O") {
        oCount++;
      }
    }
    if (xCount == FequalD) {
      return true;
    }
    if (oCount == FequalD) {
      return true;
    }
  }
  return win;
}

function checkDiagonal(c, r, Bc, Br) {
  var win = false;
  var xCount1, oCount1, xCount2, oCount2;
  xCount1 = 0;
  oCount1 = 0;
  xCount2 = 0;
  oCount2 = 0;

  for (d=0; d<FequalD; d++) {
    i = getIndex(d, d, Bc, Br);

    if (F[i] == "X") {
      xCount1++;
    }
    if (F[i] == "O") {
      oCount1++;
    }
 }

 for (d=0; d<FequalD; d++) {
   i = getIndex(d, FequalD-1-d, Bc, Br);

   if (F[i] == "X") {
     xCount2++;
   }
   if (F[i] == "O") {
     oCount2++;
   }
 }

  if (xCount1 == FequalD) {
   return true;
  }
  if (oCount1 == FequalD) {
   return true;
  }
  if (xCount2 == FequalD) {
   return true;
  }
  if (oCount2 == FequalD) {
   return true;
  }
 return win;
}
