let winComb = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8], 
[0, 4, 8],
[0, 3, 6], 
[1, 4, 7],
[2, 5, 8],
[2, 4, 6]];

let gameStatus = true;

let turnNumber = 0;

let currentPlayer = "нолик";

let restartButton = document.querySelector('.game-restart');

const drawMsg = `Ничья`;

let crossMas = [];
let zeroMas = [];

const game = document.querySelector('.game-container');
let cells = game.querySelectorAll('.cell');

restartButton.addEventListener('click', restartGame);

let counter = 0;
for(let cell of cells){
    cell.addEventListener('click', turnHandler, {once: true});
    cell.dataset.index = counter;
    counter++;
}

function changePlayer (){
    currentPlayer === "нолик" ? currentPlayer = "крестик" : currentPlayer = "нолик";
    document.querySelector('.game-status').innerHTML = `Ходит ${currentPlayer}`;
}

function addImage(cell){
    let image = document.createElement('img');
    if(currentPlayer === "нолик"){
        image.src = "img/zero.png";
    }
    else{
        image.src = "img/cross.png";
    } 
    cell.appendChild(image); 
}

function turnHandler(){
    turnNumber++;
    currentPlayer === "нолик" ? zeroMas.push(Number(this.dataset.index)) : crossMas.push(Number(this.dataset.index)); 
    checkWin();
    addImage(this);
    if(gameStatus){
    changePlayer();
    }
}

function checkWin(){
    let crossWin = false;
    let zeroWin = false;
    zeroMas.sort();
    crossMas.sort();

    for(let comb of winComb){
        if (isSubset(comb, zeroMas)){
            zeroWin = true;
        }
        if (isSubset(comb, crossMas)){
            crossWin = true;
        }
    }

    if(crossWin){
        document.querySelector('.game-status').innerHTML = "Выиграл крестик!";
        gameStatus = false;
        cells.forEach(cell => {
            cell.removeEventListener('click', turnHandler)
        }); 
    }

    else if(zeroWin){
        document.querySelector('.game-status').innerHTML = "Выиграл нолик!";
        gameStatus = false;
        cells.forEach(cell => {
            cell.removeEventListener('click', turnHandler)
        }); 
    }

    else{
        document.querySelector('.game-status').innerHTML = drawMsg;
        if(turnNumber == 9){
            gameStatus = false;
        }
    }
}

function restartGame(){
    cells.forEach(cell => {
        cell.innerHTML = '';
    });

    cells.forEach(cell => {
        cell.addEventListener('click', turnHandler, {once: true});
    });

    document.querySelector('.game-status').innerHTML = `Ходит нолик`;
    currentPlayer = "нолик";
    zeroMas = [];
    crossMas = [];
    gameStatus = true;
    turnNumber = 0;
}

function isSubset(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.every(elem => set2.has(elem));
}



