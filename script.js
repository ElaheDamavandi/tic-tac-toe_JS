// your code here...
// Grab elements functions
const selectElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) return element;
  throw new Error(
    `Somthing went wrong, make sure that ${selector} exists or is typed correctly.`
  );
};

const selectAllElements = (selector) => {
  const element = document.querySelectorAll(selector);
  if (element) return element;
  throw new Error(
    `Somthing went wrong, make sure that ${selector} exists or is typed correctly.`
  );
};

// Get the game elements
const cells = selectAllElements(`div[data-cell-index]`);
const resetButton = selectElement(`.game--restart`);
const gameStatus = selectElement(`.game--status`);
let gameSituation = true;
let Is_X_Turn = true;
let winner = "";
const winningSituation = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// swap players turn function
const swapTurn = () => {
    Is_X_Turn = !Is_X_Turn;
    if(Is_X_Turn){
        gameStatus.innerHTML = "It's X's turn.";
    }else{
        gameStatus.innerHTML = "It's O's turn.";
    }
};

//remove eventListener from cell to stop the game
const stopGame = () => {
    console.log("Stoping ...");
    gameSituation = false;
}

//Check if game is a draw or not function
const checkDraw = () =>{
    if(!winner){
        let Is_Draw = [...cells].every(cell => {
            return cell.innerHTML == "X" || cell.innerHTML == "O";
        })
        if(Is_Draw){
            stopGame();
            gameStatus.innerHTML = "Game ended in a draw.";
        }
    }
};

//Check if any of players win or not function
const checkWin = (turn) =>{
    let match;
    if(turn){
        match = winningSituation.some( items =>{
            return items.every( item => {
                return cells[item].innerHTML == "X"
            });
        })
        if(match){
            winner = "X";
        }
    }else{
        match = winningSituation.some( items =>{
            return items.every( item => {
                return cells[item].innerHTML == "O"
            });
        })
        if(match){
            winner = "O";
        }
    }
    if(match){
        gameStatus.innerHTML = `Player ${winner} has won.`;
        stopGame();
    }else{
        swapTurn();
    }
};

//Control players click on game board function
const controlClick = (index) => {
    checkDraw();
    console.log(index.cellIndex)
    if(Is_X_Turn && !cells[index.cellIndex].innerHTML && !winner){
        cells[index.cellIndex].innerHTML = "X";
        checkWin(Is_X_Turn);
    }
    if(!Is_X_Turn && !cells[index.cellIndex].innerHTML && !winner){
        cells[index.cellIndex].innerHTML = "O";
        checkWin(Is_X_Turn);
    }
}

//Add a click event listener to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", (clickedCell) => {
    if(gameSituation){
        let cellIndex = clickedCell.target.dataset;
        controlClick(cellIndex);
    }
  });
});

//Add a click listener to reset button 
resetButton.addEventListener("click", () => {
    gameSituation = true;
    winner = "";
    Is_X_Turn = true;
    gameStatus.innerHTML = "It's X's turn.";
    cells.forEach((cell) => {
        cell.innerHTML = "";
    });
});