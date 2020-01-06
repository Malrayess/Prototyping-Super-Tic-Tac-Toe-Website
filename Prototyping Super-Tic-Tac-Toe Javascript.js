//GLOBAL
let gameStop = false;
let lastPressed = "O";
let firstMove = 0;
let fieldCells = "";
let boardCells = "";
var BequalD;
var FequalD;
let l = BequalD * 100;
let Vlines, Hlines;
var x, y;
var fields = 0;
var count = 0, Bcount = 0;
var xWin = 0;
var oWin = 0;
let theme = "Dark";
var main = false;
var BcellD = l/BequalD;
var FcellD = Math.pow(BequalD, 2);
var nextMoveCboard = 0;
var nextMoveRboard = 0;
var freePlay = 1;
document.body.style.backgroundColor = "black";

function dimensionChecker() {
  if (document.getElementById("fieldDimensions").value >= 2) {
    FequalD = document.getElementById("fieldDimensions").value;
    console.log(FequalD);
  }
  if (document.getElementById("boardDimensions").value >= 2) {
    BequalD = document.getElementById("boardDimensions").value;
    console.log(BequalD);
  }
}

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

canvas2.width = BequalD * 100;
canvas2.height = BequalD * 100;

  ctx2.fillStyle = "black"; // fills canvas in black
  ctx2.fillRect(0, 0, l, l); // coordinates
  ctx2.strokeStyle = '#FFFFFF'; // fills border in white
  ctx2.strokeRect(0, 0, l, l); // coordinates
  ctx2.lineWidth = 4; // line width

  FDrawlines();
  BDrawlines();

  //CANVAS 3 STATUS BAR
  var canvas3 = document.getElementById("Canvas3"); // creates canvas 3, status
  var ctx3 = canvas3.getContext("2d");
  var cwidth3 = 200;
  var cheight3 = 100;

    ctx3.fillStyle = "black"; // fills canvas in black
    ctx3.fillRect(0, 0, 200, 100); // coordinates
    ctx3.strokeStyle = '#FFFFFF'; // fills border in white
    ctx3.strokeRect(0, 0, 200, 100); // coordinate
    ctx3.lineWidth = 4; // line width
    ctx3.stroke();

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
      ctx2.lineWidth = 1;
      ctx2.stroke();
    }

    for (let Hlines = 1; Hlines < FcellD; Hlines++) {
      ctx2.strokeStyle = 'white';
      ctx2.moveTo(0, l*Hlines/FcellD);
      ctx2.lineTo(l, l*Hlines/FcellD);
      ctx2.lineWidth = 1;
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
}

function getIndex(c, r, Bc, Br) {
  var i;
  i = (((Br*BequalD) + Bc)*FequalD*FequalD) + (r*FequalD) + c; // the field number * #of cells each field + row inside field(which is 3)*#of cells in field + field column
  return i;
}

function getBindex(c, r) {
  var Bi;
  Bi = ((r*BequalD) + c);
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
  Bi = getBindex(Bc, Br);
  checkBoard(nextMoveCboard,nextMoveRboard);
  if (c >= 0 && c < FcellD && r >= 0 && r < FcellD && F[i] == "" && (firstMove == 0 || (freePlay == 0 && B[Bi] == "") || (freePlay == 1 && Bc == nextMoveCboard && Br == nextMoveRboard && B[Bi] == "")) && gameStop == false) {
    if (lastPressed == "X") {
      F[i] = "O";
      ThreeinRow(c, r, Bc, Br);
      placing(c, r, "O", Br, Bc);
      console.log("O");
      lastPressed = "O";

      nextMoveCboard = c;
      nextMoveRboard = r;
    } else {
      F[i] = "X";
      ThreeinRow(c, r, Bc, Br);
      placing(c, r, "X", Br, Bc);
      console.log("X");
      lastPressed = "X";

      nextMoveCboard = c;
      nextMoveRboard = r;
    }
    if (firstMove == 0) {
      firstMove = 1;
    }
    console.log("Next C Move on Board: " + nextMoveCboard + " Next R Move on Board: " + nextMoveRboard);
  }

}

function checkBoard(Bc,Br){
  var Bi = getBindex(Bc,Br);
  if (B[Bi] != ""){
    freePlay = 0;
  }
  else {
    freePlay = 1;
  }
}

function placing(c, r, symbol, Br, Bc) {
  ctx2.fillStyle = "#FFFFFF";
  ctx2.font = autoTextSize();
  ctx2.fillText(symbol, c*cellD + Bc*FequalD*cellD + cellD/(FequalD+1), (r+1)*cellD + Br*FequalD*cellD - cellD/(FequalD+1));
  count += 1;

  Bi = getBindex(Bc, Br);
  console.log(B[Bi]);
  if (B[Bi] == "O") {
    ctx2.fillStyle = "blue";
    ctx2.font = autoBoardTextSize();
    ctx2.fillText(symbol, (Bc*BequalD*cellD) + cellD/BequalD, (Br+1)*BequalD*cellD - cellD/2.5);
  } else if (B[Bi] == "X") {
    ctx2.fillStyle = "blue";
    ctx2.font = autoBoardTextSize();
    ctx2.fillText(symbol, (Bc*BequalD*cellD) + cellD/BequalD + BequalD-1, (Br+1)*BequalD*cellD - cellD/2.5);
  }

    if (symbol == "X"&& B[Bi] == "") {
      updateStatus("It is player O's turn");
    } else if (symbol == "O" && B[Bi] == "") {
      updateStatus("It is player X's turn");
    }
}

function ThreeinRow(c, r, Bc, Br) {
  let winX = false;
  let winO = false;
  check3inRow(c, r, Bc, Br);
  checkB3inRow(Bc, Br);
}

function check3inRow(c, r, Bc, Br) {
  if (checkColumn(c, r, Bc, Br) == 1 || checkRow(c, r, Bc, Br) == 1 || checkDiagonal(c, r, Bc, Br) == 1) {
    Bi = getBindex(Bc, Br);
    B[Bi] = "X";
    prevMoveCboard = Bc;
    prevMoveRboard = Br;
    Bcount++;
    updateStatus("X has won field (" + Bc + " , " + Br + ")!"/* + "\nIt is player O's turn"*/);
    /*var txt = updateStatus();
    var lines = txt.split("\n");

    for (var i=0; i<lines.length; i++) {
      ctx3.fillStyle = "#FFFFFF";
      ctx3.font = "18px Arial";
      ctx3.fillText(lines[i], 14, 75);
    }*/
  } else if (checkColumn(c, r, Bc, Br) == 2 || checkRow(c, r, Bc, Br) == 2 || checkDiagonal(c, r, Bc, Br) == 2) {
    Bi = getBindex(Bc, Br);
    B[Bi] = "O";
    prevMoveCboard = Bc;
    prevMoveRboard = Br;
    Bcount++;
    updateStatus("O has won field (" + Bc + " , " + Br + ")!");
  } else {
    prevMoveCboard = -1;
    prevMoveRboard = -1;
  }
}

function checkB3inRow(Bc, Br) {
  if (checkBColumn(Bc, Br) == 1 || checkBRow(Bc, Br) == 1 || checkBDiagonal(Bc, Br) == 1) {
    gameStop = true;
    updateStatus("X won the Super Game!");
    xWin+= 1;
    printWinScore("X");
    } else if (checkBColumn(Bc, Br) == 2 || checkBRow(Bc, Br) == 2 || checkBDiagonal(Bc, Br) == 2) {
    gameStop = true;
    updateStatus("O won the Super Game!");
    oWin+= 1;
    printWinScore("O");
  } else if (Bcount == (Math.pow(BequalD, 2))) {
    gameStop = true;
    updateStatus("Super Game is a tie!");
  }
}

function checkColumn(c, r, Bc, Br) {
  var win = 0;
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
      return 1;
    }
    if (oCount == FequalD) {
      return 2;
    }
  }
  return win;
}

function checkRow(c, r, Bc, Br) {
  var win = 0;
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
      return 1;
    }
    if (oCount == FequalD) {
      return 2;
    }
  }
  return win;
}

function checkDiagonal(c, r, Bc, Br) {
  var win = 0;
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
   return 1;
  }
  if (oCount1 == FequalD) {
   return 2;
  }
  if (xCount2 == FequalD) {
   return 1;
  }
  if (oCount2 == FequalD) {
   return 2;
  }
 return win;
}

function checkBColumn(c, r) {
  var win = 0;
  var xCount, oCount;

  for (c=0; c<BequalD; c++) {
    xCount = 0;
    oCount = 0;
    for (r=0; r<BequalD; r++) {
      i = getBindex(c, r);
      if (B[i] == "X") {
        xCount++;
      }
      if (B[i] == "O") {
        oCount++;
      }
    }
    if (xCount == BequalD) {
      return 1;
    }
    if (oCount == BequalD) {
      return 2;
    }
  }
  return win;
}

function checkBRow(c, r) {
  var win = 0;
  var xCount, oCount;

  for (r=0; r<BequalD; r++) {
    xCount = 0;
    oCount = 0;
    for (c=0; c<BequalD; c++) {
      i = getBindex(c, r);
      if (B[i] == "X") {
        xCount++;
      }
      if (B[i] == "O") {
        oCount++;
      }
    }
    if (xCount == BequalD) {
      return 1;
    }
    if (oCount == BequalD) {
      return 2;
    }
  }
  return win;
}

function checkBDiagonal(c, r) {
  var win = 0;
  var xCount1, oCount1, xCount2, oCount2;
  xCount1 = 0;
  oCount1 = 0;
  xCount2 = 0;
  oCount2 = 0;

  for (d=0; d<BequalD; d++) {
    i = getBindex(d, d);

    if (B[i] == "X") {
      xCount1++;
    }
    if (B[i] == "O") {
      oCount1++;
    }
 }

 for (d=0; d<BequalD; d++) {
   i = getBindex(d, BequalD-1-d);

   if (B[i] == "X") {
     xCount2++;
   }
   if (B[i] == "O") {
     oCount2++;
   }
 }

  if (xCount1 == BequalD) {
   return 1;
  }
  if (oCount1 == BequalD) {
   return 2;
  }
  if (xCount2 == BequalD) {
   return 1;
  }
  if (oCount2 == BequalD) {
   return 2;
  }
 return win;
}

document.onkeypress = function keyboardR(event) {
  // call function here
  var keyCode = event.which;
  if (keyCode == 114) {
    reset();
  }
}

function reset() {
  gamestop = false;
  lastPressed = "O";
  Bcount = 0;

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

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    ctx.fillText("X: " + xWin, 10, 50);
    ctx.fillText("O: " + oWin, 100, 50);

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

    for (let i = 0; i < FequalD * FequalD * BequalD * BequalD; i++) { // first two multiplying is the cells in the field, the second two are the number of fields in the board
      F[i] = "";
    }

    for (let i = 0; i < BequalD * BequalD; i++) {
      B[i] = "";
    }

    freePlay = 1;
    nextMoveCboard = 0;
    nextMoveRboard = 0;
    firstMove = 0;
}

function updateStatus(status) {
  ctx3.fillStyle = "black"; // fills canvas in black
  ctx3.fillRect(0, 0, 200, 100); // coordinates
  ctx3.strokeStyle = '#FFFFFF'; // fills border in white
  ctx3.strokeRect(0, 0, 200, 100); // coordinate
  ctx3.lineWidth = 4; // line width
  ctx3.stroke();

  ctx3.fillStyle = "#FFFFFF";
  ctx3.font = "16px Arial";
  ctx3.fillText(status, 22, 50); // text, x, y
}

function printWinScore(winner) {
  if (winner == "X") {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 200, 100);
  ctx.strokeStyle = '#FFFFFF';
  ctx.strokeRect(0, 0, 200, 100);
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "20px Arial";
  ctx.fillText("Scoreboard", 10, 20); // text, x, y
  ctx.fillText("X: ", 10, 50);
  ctx.fillText("O: ", 100, 50);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "20px Arial";
  ctx.fillText("X: " + xWin, 10, 50);
  ctx.fillText("O: " + oWin, 100, 50);
} else if (winner == "O") {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 200, 100);
  ctx.strokeStyle = '#FFFFFF';
  ctx.strokeRect(0, 0, 200, 100);
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "20px Arial";
  ctx.fillText("Scoreboard", 10, 20); // text, x, y
  ctx.fillText("X: ", 10, 50);
  ctx.fillText("O: ", 100, 50);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "20px Arial";
  ctx.fillText("X: " + xWin, 10, 50);
  ctx.fillText("O: " + oWin, 100, 50);
 }
}

function autoTextSize() {
  if (BequalD == 2 && FequalD == 2) {
      ctx2.font = "40px Arial";
    } else if (BequalD == 3 && FequalD == 3) {
    ctx2.font = "20px Arial";
  } else if (BequalD == 4 && FequalD == 4) {
    ctx2.font = "15px Arial" ;
  }
}
function autoBoardTextSize() {
  if (BequalD == 2 && FequalD == 2) {
      ctx2.font = "120px Arial";
    } if (BequalD == 3 && FequalD == 3) {
    ctx2.font = "100px Arial";
  } else if (BequalD == 4 && FequalD == 4) {
    ctx2.font = "75px Arial" ;
  }
}
