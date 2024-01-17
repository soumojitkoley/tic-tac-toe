const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const resBtn = document.querySelector('.res-btn');
let clickSound = new Audio('sounds/cs.mp3');
let winSound = new Audio('sounds/ws.mp3');
let tieSound = new Audio('sounds/ts.mp3');

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// start
function initGame() {
    gameInfo.classList.remove('ani');
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    
                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    //it means we have a winner
    if(answer !== "" ) {
        if(!clickSound.muted){
            winSound.play();
        }
        gameInfo.innerText = `Winner Player - ${answer}`;
        gameInfo.classList.add('ani');
        newGameBtn.classList.add("active");
        resBtn.classList.remove('active');
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    if(fillCount === 9) {
        if(!clickSound.muted){
            tieSound.play();
        }
        gameInfo.innerText = "Game Tied !";
        gameInfo.classList.add('ani');
        newGameBtn.classList.add("active");
        resBtn.classList.remove('active');
    }
}

function handleClick(index) {
    if(gameGrid[index] === "" ) {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        resBtn.classList.add('active');
        if(!clickSound.muted){
            clickSound.play();
        }
        handleClick(index);
    })
});

const muteBtn = document.getElementById('muteBtn');
const unmuteBtn = document.getElementById('unmuteBtn');

muteBtn.addEventListener('click', () => {
    clickSound.muted = true;
});

unmuteBtn.addEventListener('click', () => {
    console.log('pressed');
    clickSound.muted = false;
});
 
newGameBtn.addEventListener("click", () => initGame());

resBtn.addEventListener('click', () => {
    resBtn.classList.remove('active');
    initGame();
});