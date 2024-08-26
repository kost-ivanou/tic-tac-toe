let winComb = [[0, 1, 2],
[3, 4, 5],
[6, 7, 8], 
[0, 4, 8],
[0, 3, 6], 
[1, 4, 7],
[2, 5, 8],
[2, 4, 6]];

let currentPlayer = "нолик";

const winMsg = `Выиграл ${currentPlayer}`;
const drawMsg = `Ничья`;



let crossMas = [];
let zeroMas = [];

const cells = document.querySelector('.game-container').querySelectorAll('.cells');

function changePlayer (){
    currentPlayer = "нолик" ? "крестик" : "нолик";
}

function addImage(cell){
    let image = document.createElement('img');
    currentPlayer = "нолик" ? image.innerHTML = '<img src = "zero.jpg"/>': image.innerHTML = '<img src = "cross.jpg"/>';
    cell.append(image); 
}




