let winComb = [ 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], 
    [0, 4, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];

const game = document.querySelector('.game-container');
let cells = game.querySelectorAll('.cell');

let counter = 0;
let sizes = [];
for(let cell of cells){
    cell.addEventListener('click', turnHandler, {once: true});
    cell.dataset.index = counter;
    counter++;
}

console.log(sizes);


let gameStatus = true;

let turnNumber = 0;

let currentPlayer = "нолик";

let restartButton = document.querySelector('.game-restart');

const drawMsg = `Ничья`;

let crossMas = [];
let zeroMas = [];

restartButton.addEventListener('click', restartGame);

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

    for (let i = 0; i < winComb.length; i++) {
        const comb = winComb[i];
        if (isSubset(comb, zeroMas)){
            zeroWin = true;
            drawWinningLine(comb);
        }
        if (isSubset(comb, crossMas)){
            crossWin = true;
            drawWinningLine(comb);
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

    const line = document.querySelector('.line');
    if (line) {
        line.remove();
    }

    document.querySelector('.game-status').innerHTML = `Ходит нолик`;
    currentPlayer = "нолик";
    zeroMas = [];
    crossMas = [];
    gameStatus = true;
    turnNumber = 0;
}

function drawWinningLine(comb) {
    const line = document.createElement('div');
    line.classList.add('line');

    const cellRect = cells[comb[0]].getBoundingClientRect();
    const gameRect = game.getBoundingClientRect();

    if (comb[0] % 3 === comb[1] % 3 && comb[1] % 3 === comb[2] % 3) {
        // Вертикальная линия
        line.classList.add('vertical');
        line.style.left = `${cellRect.left - gameRect.left + cellRect.width / 2 - 3}px`;
        line.style.top = `0px`;
    } else if (Math.floor(comb[0] / 3) === Math.floor(comb[1] / 3) && Math.floor(comb[1] / 3) === Math.floor(comb[2] / 3)) {
        // Горизонтальная линия
        line.classList.add('horizontal');
        line.style.top = `${cellRect.top - gameRect.top + cellRect.height / 2 - 3}px`;
        line.style.left = `0px`;
    } else if (comb[0] === 0 && comb[1] === 4 && comb[2] === 8) {
        // Диагональная линия (с 0  на 8)
        line.classList.add('diagonal');
        line.style.left = `-20%`;
        line.style.top = `calc(50% - 3px)`;
    } else if (comb[0] === 2 && comb[1] === 4 && comb[2] === 6) {
        // Диагональная линия (с 2 на 6)
        line.classList.add('diagonal-reverse');
        line.style.left = `-20%`;
        line.style.top = `calc(50% - 3px)`;
    }

    game.appendChild(line);
}

function isSubset(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.every(elem => set2.has(elem));
}



