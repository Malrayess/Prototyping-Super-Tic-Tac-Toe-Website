//GLOBAL
let gameStop = false;
let lastPressed = "O";
let firstMove = 0;
let fieldCells = "";
let boardCells = "";
var BequalD = document.getElementById("fieldDimensions").value;
var FequalD = document.getElementById("boardDimensions").value;
let l = BequalD * 100;
let Vlines, Hlines;
var x, y;
var fields = 0;
var count = 0, Bcount = 0;
var xWin = 0;
var oWin = 0;
let theme = "Dark";
var BcellD = l/BequalD;
var FcellD = (BequalD*FequalD);
var nextMoveCboard = 0;
var nextMoveRboard = 0;
var freePlay = 1;
document.body.style.backgroundColor = "black";

function dimensionChecker() { // function that receives input value from html slider to determine board dimensions and field dimensions
  if (document.getElementById("fieldDimensions").value >= 2) { // if input is greater than or equal to 2
    FequalD = document.getElementById("fieldDimensions").value; // field dimensions is equal to that input, determining the field cell dimensions
    //console.log(FequalD);
  }
  if (document.getElementById("boardDimensions").value >= 2) { // if input is greater than or equal to 2
    BequalD = document.getElementById("boardDimensions").value; // board dimensions is equal to that input, determining the board cell dimensions
    //console.log(BequalD);
  }
}

//CANVAS 1 SCOREBOARD
var canvas = document.getElementById("Canvas1"); // creates canvas 1, scoreboard
var ctx = canvas.getContext("2d"); // ctx = context of canvas
var cwidth = 200; // scoreboard width
var cheight = 100; // scoreboard height

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
var canvas2 = document.getElementById("Canvas2"); // creates canvas 2, playing board
var ctx2 = canvas2.getContext("2d"); // ctx = context of canvas
var cellD = l/FcellD; // field cell dimension is equal to length of canvas divided by FequalD*BequalD
var BoardCellD = l/BcellD; // board cell dimensions is equal to length of canvas divided by Board cell dimension

canvas2.width = BequalD * 100; // board width equal to board dimensions times 100, increases/decreases proportionally
canvas2.height = BequalD * 100; // board height equal to board dimensions times 100, increases/decreases proportionally

ctx2.fillStyle = "black"; // fills canvas in black
ctx2.fillRect(0, 0, l, l); // coordinates
ctx2.strokeStyle = '#FFFFFF'; // fills border in white
ctx2.strokeRect(0, 0, l, l); // coordinates
ctx2.lineWidth = 4; // line width

FDrawlines();
BDrawlines();

//CANVAS 3 STATUS BAR
var canvas3 = document.getElementById("Canvas3"); // creates canvas 3, status
var ctx3 = canvas3.getContext("2d"); // ctx = context
var cwidth3 = 200; // status bar width
var cheight3 = 100; // status bar height

ctx3.fillStyle = "black"; // fills canvas in black
ctx3.fillRect(0, 0, 200, 100); // coordinates
ctx3.strokeStyle = '#FFFFFF'; // fills border in white
ctx3.strokeRect(0, 0, 200, 100); // coordinate
ctx3.lineWidth = 4; // line width
ctx3.stroke();

function BDrawlines() { // function that creates a loop in drawing board lines defining the different fields/board cells
  for (let Vlines = 1; Vlines < BequalD; Vlines ++) { // loop for drawing vertical lines
    ctx2.beginPath();
    ctx2.strokeStyle = 'blue';
    ctx2.moveTo(l*Vlines/BequalD, 0);
    ctx2.lineTo(l*Vlines/BequalD, l);
    ctx2.lineWidth = 5;
    ctx2.stroke();
  }

  for (let Hlines = 1; Hlines < BequalD; Hlines ++) { // loop for drawing horizontal lines
    ctx2.beginPath();
    ctx2.strokeStyle = 'blue';
    ctx2.moveTo(0, l*Hlines/BequalD);
    ctx2.lineTo(l, l*Hlines/BequalD);
    ctx2.lineWidth = 5;
    ctx2.stroke();
  }
}

function FDrawlines() { // function that creates a loop in drawing field lines defining the individual field cells
  for (let Vlines = 1; Vlines < FcellD; Vlines++) { // loop for drawing vertical lines
    ctx2.strokeStyle = 'white';
    ctx2.moveTo(l*Vlines/FcellD, 0);
    ctx2.lineTo(l*Vlines/FcellD, l);
    ctx2.lineWidth = 1;
    ctx2.stroke();
  }

  for (let Hlines = 1; Hlines < FcellD; Hlines++) { // loop for drawing horizontal lines
    ctx2.strokeStyle = 'white';
    ctx2.moveTo(0, l*Hlines/FcellD);
    ctx2.lineTo(l, l*Hlines/FcellD);
    ctx2.lineWidth = 1;
    ctx2.stroke();
  }
}

var B = []; // creates an empty array for the board
var F = []; // creates an empty array for the field

for (let i = 0; i < FequalD * FequalD * BequalD * BequalD; i++) { // first two multiplying is the cells in the field, the second two are the number of fields in the board
  F.push(""); // pushes empty "spots" into the array F[]
}

for (let i = 0; i < BequalD * BequalD; i++) {
  B.push(""); // pushes empty "spots" into the array B[]
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

function getIndex(c, r, Bc, Br) { // function that gets the "index" or spot/coordinate in regards to field array
  var i;
  i = (((Br*BequalD) + Bc)*FequalD*FequalD) + (r*FequalD) + c; // the field number * #of cells each field + row inside field(which is 3)*#of cells in field + field column
  return i;
}

function getBindex(c, r) { // function that gets the "index" or spot/coordinate in regards to board array
  var Bi;
  Bi = ((r*BequalD) + c); // #of cells in field + field column
  return Bi;
}

function allPlacingCode(x, y) {
  var c, r, Bc, Br;
  //add board c,r defined, helps with placing code or drawing
  c = Math.floor((x/cellD) % FequalD); // field column
  r = Math.floor((y/cellD) % FequalD); // field row
  Bc = Math.floor(x/BcellD); // board column
  Br = Math.floor(y/BcellD); // board row
  var i, Bi;
  console.log("Field C: " + c + " Field R: "+ r + " Board C: " + Bc + " Board R: " + Br);
  i = getIndex(c, r, Bc, Br); //calls on the function to update the index of the field selected
  Bi = getBindex(Bc, Br); // calls on function to get board index or field number and update it
  checkBoard(nextMoveCboard,nextMoveRboard); // calls on function to check if board is empty or filled
  if (c >= 0 && c < FcellD && r >= 0 && r < FcellD && F[i] == "" && (firstMove == 0 || (freePlay == 0 && B[Bi] == "") || (freePlay == 1 && Bc == nextMoveCboard && Br == nextMoveRboard && B[Bi] == "")) && gameStop == false) { // sets parameters for where the mouse is allowed to be pressed
    console.log("run");
    if (lastPressed == "X") {
      F[i] = "O"; // fills in field array with "O"
      ThreeinRow(c, r, Bc, Br); // checks for field win
      placing(c, r, "O", Br, Bc); // draws "O"
      console.log("O");
      lastPressed = "O";

      nextMoveCboard = c; // updates next move column
      nextMoveRboard = r; // updates next move row
    } else {
      F[i] = "X"; // fills in field array with "X"
      ThreeinRow(c, r, Bc, Br); // check for field win
      placing(c, r, "X", Br, Bc); // draws "X"
      console.log("X");
      lastPressed = "X";

      nextMoveCboard = c; // updates next move column
      nextMoveRboard = r; // updates next move row
    }
    if (firstMove == 0) { // first move is always 0 to allow for placing anywhere
      firstMove = 1; // first move is 1 to force following next move rule
    }
    console.log("Next C Move on Board: " + nextMoveCboard + " Next R Move on Board: " + nextMoveRboard);
  }
}

function checkBoard(Bc,Br){ // checks board to see if board cell or "field" is won
  var Bi = getBindex(Bc,Br); // calls on function to get board index or field number and update it
  if (B[Bi] != ""){ // if board cell is full, free play is allowed (you can go anywhere)
    freePlay = 0;
  }
  else { // you have to follow next move rule
    freePlay = 1;
  }
}

function placing(c, r, symbol, Br, Bc) { // function that draws X or O
  ctx2.fillStyle = "#FFFFFF";
  ctx2.font = "20px Arial"/*autoTextSize()*/;
  ctx2.fillText(symbol, c*cellD + Bc*FequalD*cellD + cellD/(FequalD+1), (r+1)*cellD + Br*FequalD*cellD - cellD/(FequalD+1)); // draws X or O
  count += 1;

  Bi = getBindex(Bc, Br); // calls on function to get board index or field number and update it

  console.log(B[Bi]);
  if (B[Bi] == "O") { // if field is won by player O draws O
    ctx2.fillStyle = "blue";
    ctx2.font = autoBoardTextSize();
    ctx2.fillText("O", (Bc*BequalD*cellD) + cellD/BequalD, (Br+1)*BequalD*cellD - cellD/2.5);
  } else if (B[Bi] == "X") { // if field is won by player X draws X
    ctx2.fillStyle = "blue";
    ctx2.font = autoBoardTextSize();
    ctx2.fillText("X", (Bc*BequalD*cellD) + cellD/BequalD + BequalD-1, (Br+1)*BequalD*cellD - cellD/2.5);
  }

  if (symbol == "X"&& B[Bi] == "") { // updates status bar/box, if field is not won and last played move is X it returns message O's turn
    updateStatus("It is player O's turn");
  } else if (symbol == "O" && B[Bi] == "") { // updates status bar/box, if field is not won and last played move is O it returns message X's turn
    updateStatus("It is player X's turn");
  }
}

function ThreeinRow(c, r, Bc, Br) { // function for running all checking function to see if there is a win
  let winX = false;
  let winO = false;
  check3inRow(c, r, Bc, Br);
  checkB3inRow(Bc, Br);
}

function check3inRow(c, r, Bc, Br) { // checks if a column, row, or diagonal has been won in fields
  if (checkColumn(c, r, Bc, Br) == 1 || checkRow(c, r, Bc, Br) == 1 || checkDiagonal(c, r, Bc, Br) == 1) {
    Bi = getBindex(Bc, Br); // calls on function to get board index or field number and update it
    B[Bi] = "X"; //  fills in board array "spot" or cell with an X
    prevMoveCboard = Bc; // updates previous column move to the recent board column
    prevMoveRboard = Br; // updates previous row move to the recent board row
    Bcount++; // increases board count in order to keep track if the board game is a tie
    updateStatus("X has won field (" + Bc + " , " + Br + ")!"/* + "\nIt is player O's turn"*/); // prints message in status that player X has won field (Bc, Br)
    /*var txt = updateStatus();
    var lines = txt.split("\n");

    for (var i=0; i<lines.length; i++) {
    ctx3.fillStyle = "#FFFFFF";
    ctx3.font = "18px Arial";
    ctx3.fillText(lines[i], 14, 75);
  }*/
} else if (checkColumn(c, r, Bc, Br) == 2 || checkRow(c, r, Bc, Br) == 2 || checkDiagonal(c, r, Bc, Br) == 2) {
  Bi = getBindex(Bc, Br); // calls on function to get board index or field number and update it
  B[Bi] = "O"; // fills in board array "spot" or cell with an O
  prevMoveCboard = Bc; // updates previous column move to the recent board column
  prevMoveRboard = Br; // updates previous row move to the recent board row
  Bcount++; // increases board count in order to keep track if the board game is a tie
  updateStatus("O has won field (" + Bc + " , " + Br + ")!"); // prints message in status that player O has won field (Bc, Br)
} else if (checkColumn(c, r, Bc, Br) != (1 || 2) || checkRow(c, r, Bc, Br) != (1 || 2) || checkDiagonal(c, r, Bc, Br) != (1 || 2)) {
  if (checkForTie(c, r, Bc, Br) == 1) {
    Bi = getBindex(Bc, Br); // calls on function to get board index or field number and update it
    B[Bi] = "X"; //  fills in board array "spot" or cell with an X
    prevMoveCboard = Bc; // updates previous column move to the recent board column
    prevMoveRboard = Br; // updates previous row move to the recent board row
    Bcount++; // increases board count in order to keep track if the board game is a tie
    updateStatus("X has won field (" + Bc + " , " + Br + ")!"/* + "\nIt is player O's turn"*/); // prints message in status that player X has won field (Bc, Br)
  } else if (checkForTie(c, r, Bc, Br) == 2) {
    Bi = getBindex(Bc, Br); // calls on function to get board index or field number and update it
    B[Bi] = "O"; // fills in board array "spot" or cell with an O
    prevMoveCboard = Bc; // updates previous column move to the recent board column
    prevMoveRboard = Br; // updates previous row move to the recent board row
    Bcount++; // increases board count in order to keep track if the board game is a tie
    updateStatus("O has won field (" + Bc + " , " + Br + ")!"); // prints message in status that player O has won field (Bc, Br)
  }
} else {
  prevMoveCboard = -1; // if previous column move is negative one you can place anywhere on the board
  prevMoveRboard = -1; // if previous row move is negative one you can place anywhere on the board
}
}
/*if (XCount != FequalD && Ocount != FequalD && Xcount > Ocount && count Math.pow(FequalD, 2)) NEED TO INCLUDE CHECKER IF FIELD IS A TIE*/

function checkB3inRow(Bc, Br) { // checks if a column, row, or diagonal has been won in board
  if (checkBColumn(Bc, Br) == 1 || checkBRow(Bc, Br) == 1 || checkBDiagonal(Bc, Br) == 1) {
    gameStop = true; // stops game
    updateStatus("X won the Super Game!"); // Prints out message that X has won the Super Game
    xWin+= 1; // increases the number of times X has won
    printWinScore("X");
  } else if (checkBColumn(Bc, Br) == 2 || checkBRow(Bc, Br) == 2 || checkBDiagonal(Bc, Br) == 2) {
    gameStop = true; // Stops game
    updateStatus("O won the Super Game!");  // Prints out message that O has won the Super Game
    oWin+= 1; // increases the number of times O has won
    printWinScore("O");
  } else if (Bcount == (Math.pow(BequalD, 2))) { // checks if the board count has reached the number of board cells and stops the game
    gameStop = true; // stops game
    updateStatus("Super Game is a tie!"); // Prints out message that the no one has won and the Super Game is a tie
  }
}
function checkForTie(c, r, Bc, Br) {
  var win = 0;
  var xCount, oCount, totalCount;

  xCount = 0;
  oCount = 0;
  totalCount = 0;
  for (c=0; c<FequalD; c++) {
    for (r=0; r<FequalD; r++) {
      i = getIndex(c, r, Bc, Br);
      if (F[i] == "X") { // if an X was placed, increase the xCount as well as the general count for that field
        xCount++;
        totalCount++;
      }
      if (F[i] == "O") { // if an O was placed, increase the oCount as well as the general count for that field
        oCount++;
        totalCount++;
      }
      console.log("total: " + totalCount + " oCount: " + oCount + " xCount: " + xCount);
    }
    if (totalCount == (FequalD*FequalD) && (xCount > oCount)) { // if general count is equal to the number of cells in a field AND number of X's are greater than O's, X wins field
      return 1;
    }
    if (totalCount == (FequalD*FequalD) && (oCount > xCount)) { // if general count is equal to the number of cells in a field AND number of O's are greater than X's, O wins field
      return 2;
    }
  }
  return win;
}
function checkColumn(c, r, Bc, Br) { // function that loops and checks all columns in each field if it has been won, and keeps track of where the column has been won and allows for the column to be won again in other fields
  var win = 0;
  var xCount, oCount;

  for (c=0; c<FequalD; c++) {
    xCount = 0;
    oCount = 0;
    for (r=0; r<FequalD; r++) {
      i = getIndex(c, r, Bc, Br); // calls on function to keep track of the exact field that is being placed in and allow other fields to use the same spaces
      if (F[i] == "X") { // if the field cell is filled with an X, increase X counter for that field
        xCount++;
      }
      if (F[i] == "O") { // if the field cell is filled with an O, increase O counter for that field
        oCount++;
      }
    }
    if (xCount == FequalD) { // if there is 3 X's in a row, then return 1, which represents X
      return 1;
    }
    if (oCount == FequalD) { // if there is 3 O's in a row, then return 2, which represents O
      return 2;
    }
  }
  return win; // return win value
}

function checkRow(c, r, Bc, Br) { // function that loops and checks all rows in each field if it has been won, and keeps track of where the row has been won and allows for the row to be won again in other fields
  var win = 0;
  var xCount, oCount;

  for (r=0; r<FequalD; r++) {
    xCount = 0;
    oCount = 0;
    for (c=0; c<FequalD; c++) {
      i = getIndex(c, r, Bc, Br); // calls on function to keep track of the exact field that is being placed in and allow other fields to use the same spaces
      if (F[i] == "X") { // if the field cell is filled with an X, increase X counter for that field
        xCount++;
      }
      if (F[i] == "O") { // if the field cell is filled with an O, increase O counter for that field
        oCount++;
      }
    }
    if (xCount == FequalD) { // if there is 3 X's in a row, then return 1, which represents X
      return 1;
    }
    if (oCount == FequalD) { // if there is 3 O's in a row, then return 2, which represents O
      return 2;
    }
  }
  return win; // return win value
}

function checkDiagonal(c, r, Bc, Br) { // function that loops and checks all diagonals both ways in each field if it has been won, and keeps track of where the diagonal has been won and allows for the diagonal to be won again in other fields
  var win = 0;
  var xCount1, oCount1, xCount2, oCount2;
  xCount1 = 0; // increases X count for a diagonal going from top left to bottom right
  oCount1 = 0; // increases O count for a diagonal going from top left to bottom right
  xCount2 = 0; // increases X count for a diagonal going from top right to bottom left
  oCount2 = 0; // increases O count for a diagonal going from top right to bottom left
  //There are only two ways to win by a diagonal line, must include two separate cases for each as well as counters for each
  for (d=0; d<FequalD; d++) { // First way, diagonal line from top left to bottom right
    i = getIndex(d, d, Bc, Br); // calls on function to get board index or field number and update it

    if (F[i] == "X") { // if the field cell is filled with an X, increase X counter #1 for that field
      xCount1++;
    }
    if (F[i] == "O") { // if the field cell is filled with an O, increase O counter #1 for that field
      oCount1++;
    }
  }

  for (d=0; d<FequalD; d++) { // Second way, diagonal line from top right to bottom left
    i = getIndex(d, FequalD-1-d, Bc, Br);

    if (F[i] == "X") { // if the field cell is filled with an X, increase X counter #2 for that field
      xCount2++;
    }
    if (F[i] == "O") { // if the field cell is filled with an O, increase O counter #2 for that field
      oCount2++;
    }
  }

  if (xCount1 == FequalD) { // if there is 3 X's in a row, top left to bottom right, then return 1, which represents X
    return 1;
  }
  if (oCount1 == FequalD) { // if there is 3 O's in a row, top left to bottom right, then return 2, which represents O
    return 2;
  }
  if (xCount2 == FequalD) { // if there is 3 X's in a row, top right to bottom left, then return 1, which represents X
    return 1;
  }
  if (oCount2 == FequalD) { // if there is 3 O's in a row, top right to bottom left, then return 2, which represents O
    return 2;
  }
  return win;
}

function checkBColumn(c, r) { // function for checking big board column wins
  var win = 0;
  var xCount, oCount;

  for (c=0; c<BequalD; c++) {
    xCount = 0;
    oCount = 0;
    for (r=0; r<BequalD; r++) {
      i = getBindex(c, r); // calls on function to get board index or field number and update it
      if (B[i] == "X") {  // if the board cell is filled with an X, increase X count
        xCount++;
      }
      if (B[i] == "O") { // if the board cell is filled with an O, increase O count
        oCount++;
      }
    }
    if (xCount == BequalD) { // if there is 3 X's in a row, then return 1, which represents X
      return 1;
    }
    if (oCount == BequalD) { // if there is 3 O's in a row, then return 2, which represents O
      return 2;
    }
  }
  return win;
}

function checkBRow(c, r) { // function that checks board row wins
  var win = 0;
  var xCount, oCount;

  for (r=0; r<BequalD; r++) {
    xCount = 0;
    oCount = 0;
    for (c=0; c<BequalD; c++) {
      i = getBindex(c, r); // calls on function to get board index or field number and update it
      if (B[i] == "X") { // if the board cell is filled with an X, increase X count
        xCount++;
      }
      if (B[i] == "O") {// if the board cell is filled with an O, increase O count
        oCount++;
      }
    }
    if (xCount == BequalD) { // if there is 3 X's in a row, then return 1, which represents X
      return 1;
    }
    if (oCount == BequalD) { // if there is 3 O's in a row, then return 2, which represents O
      return 2;
    }
  }
  return win;
}

function checkBDiagonal(c, r) { // function that loops and checks all diagonals both ways in the big board if it has been won
  var win = 0;
  var xCount1, oCount1, xCount2, oCount2;
  xCount1 = 0; // increases X count for a diagonal going from top left to bottom right
  oCount1 = 0; // increases O count for a diagonal going from top left to bottom right
  xCount2 = 0; // increases X count for a diagonal going from top right to bottom left
  oCount2 = 0; // increases O count for a diagonal going from top right to bottom left
  //There are only two ways to win by a diagonal line, must include two separate cases for each as well as counters for each
  for (d=0; d<BequalD; d++) { // First way, diagonal line from top left to bottom right
    i = getBindex(d, d); // calls on function to get board index or field number and update it

    if (B[i] == "X") { // if the field cell is filled with an X, increase X counter #1 for that field
      xCount1++;
    }
    if (B[i] == "O") { // if the field cell is filled with an O, increase O counter #1 for that field
      oCount1++;
    }
  }

  for (d=0; d<BequalD; d++) { // Second way, diagonal line from top right to bottom left
    i = getBindex(d, BequalD-1-d); // calls on function to get board index or field number and update it

    if (B[i] == "X") { // if the field cell is filled with an X, increase X counter #2 for that field
      xCount2++;
    }
    if (B[i] == "O") { // if the field cell is filled with an O, increase O counter #2 for that field
      oCount2++;
    }
  }

  if (xCount1 == BequalD) { // if there is 3 X's in a row, top left to bottom right, then return 1, which represents X
    return 1;
  }
  if (oCount1 == BequalD) { // if there is 3 O's in a row, top left to bottom right, then return 2, which represents O
    return 2;
  }
  if (xCount2 == BequalD) { // if there is 3 X's in a row, top right to bottom left, then return 1, which represents X
    return 1;
  }
  if (oCount2 == BequalD) { // if there is 3 O's in a row, top right to bottom left, then return 2, which represents O
    return 2;
  }
  return win;
}

document.onkeypress = function keyboardR(event) { // reset keypress
  // call function here
  var keyCode = event.which;
  if (keyCode == 114) {
    reset();
  }
}

function reset() { // reset board function
  gameStop = false;
  lastPressed = "O";
  Bcount = 0;
  count = 0;
  l = BequalD * 100;
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

  BcellD = l/BequalD;
  FcellD = (BequalD*FequalD);

  //CANVAS 2 PLAYING BOARD
  var canvas2 = document.getElementById("Canvas2");
  var ctx2 = canvas2.getContext("2d");
  cellD = l/FcellD;
  BoardCellD = l/BcellD;

  canvas2.width = BequalD * 100; // board width equal to board dimensions times 100, increases/decreases proportionally
  canvas2.height = BequalD * 100; // board height equal to board dimensions times 100, increases/decreases proportionally

  ctx2.fillStyle = "black"; // fills canvas in black
  ctx2.fillRect(0, 0, l, l); // coordinates
  ctx2.strokeStyle = '#FFFFFF'; // fills border in white
  ctx2.strokeRect(0, 0, l, l); // coordinates
  ctx2.lineWidth = 4; // line width

  FDrawlines();
  BDrawlines();

  F.length = 0; // resets field array to nothing
  B.length = 0; // resets board array to nothing

    for (let i = 0; i < FequalD * FequalD * BequalD * BequalD; i++) { // for every field cell set empty
      F[i] = "";
    }

    for (let i = 0; i < BequalD * BequalD; i++)  {// for every board cell set empty
      B[i] = "";
    }

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

/*  var c, r, Bc, Br, i , Bi;
  c = Math.floor((x/cellD) % FequalD); // field column
  r = Math.floor((y/cellD) % FequalD); // field row
  Bc = Math.floor(x/BcellD); // board column
  Br = Math.floor(y/BcellD); // board row

  i = getIndex(c, r, Bc, Br); //calls on the function to update the index of the field selected
  Bi = getBindex(Bc, Br); // calls on function to get board index or field number and update it
*/
  freePlay = 1;
  nextMoveCboard = 0;
  nextMoveRboard = 0;
  firstMove = 0;

  console.log(F);
  console.log(B);
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

function printWinScore(winner) { // updates scoreboard after a game has been won
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
