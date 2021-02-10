const round = document.getElementById('roundCount');
const player1 = document.getElementById('player1Count');
const player2 = document.getElementById('player2Count');
const battleArea = document.getElementsByClassName('battlePlace')[0];
const resetBtn = document.getElementsByClassName('resBtn')[0];
const contain = document.getElementsByClassName('container')[0];
const err = document.createElement('div');
const win = document.createElement('div');
const draw = document.createElement('div');

const donut = 'https://www.freepnglogos.com/uploads/donut-png/onlinelabels-clip-art-rainbow-sprinkles-donut-30.png';
const eclairs = 'eclairs.png'

const WINARR = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]

let roundCounter = 1;
let playerScore1 = 0;
let playerScore2 = 0;

function playerCounter1() {
    playerScore1 += 1;
    player1.innerText = playerScore1;
}

function playerCounter2() {
    playerScore2 += 1;
    player2.innerText = playerScore2;
}

const ECLAIRS = [];
const DONUTS = [];
let winChecker = false;

const checkWin = function (reff, arr, playerConter, player) {
    reff.forEach(item => {
        let checkArr = [];

        for (let i = 0; i < item.length; i++) {
            if (arr.indexOf(item[i]) !== -1) {
                checkArr.push(item[i])
            }
        }
        if ((ECLAIRS.length + DONUTS.length) === 9 && checkArr.length !== 3) {
            drawWin();
            console.log(checkArr)
        }

        if (checkArr.length === 3) {
            playerConter();
            addWin(player);
            battleArea.removeEventListener('click', userStep);
            winChecker = true;
        }; 

    });
}

const userStep = function (event) {
    if (ECLAIRS.length === DONUTS.length) {
        if (DONUTS.indexOf(+event.target.id) === -1 && ECLAIRS.indexOf(+event.target.id) === -1) {
            eclairsStep(event);
            if (!winChecker) {
                donutsStep();
            }
        } else {
            addError();
            setTimeout(deleteError, 2000)    
        }
    }
}

function eclairsStep(event) {
    if (DONUTS.indexOf(+event.target.id) === -1 && ECLAIRS.indexOf(+event.target.id) === -1) {
        event.target.style = `background-image: url(${eclairs});`;
        ECLAIRS.push(+event.target.id)
        checkWin(WINARR, ECLAIRS, playerCounter1, 'Игрок 1');
        battleArea.removeEventListener('click', userStep);
    }
}

function donutsStep() {
    let num = getRandomInt(1, 10);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    if (ECLAIRS.indexOf(+num) === -1 && DONUTS.indexOf(+num) === -1) {
        function drawDonut() {
            let place = document.getElementById(num);
            place.style = `background-image: url(${donut})`;
            DONUTS.push(+num);
            checkWin(WINARR, DONUTS, playerCounter2, 'Игрок 2');
            battleArea.addEventListener('click', userStep);
        }
        setTimeout(drawDonut, 1000)
    } else if ((ECLAIRS.length + DONUTS.length) === 9) {
        return
    } else {
        donutsStep()
    }
}

const resetMatch = function () {
    roundCounter += 1;
    winChecker = false;
    round.innerText = roundCounter;
    for (let i = 0; i < battleArea.children.length; i++) {
        battleArea.children[i].style = 'background-image: url()';
    }

    ECLAIRS.splice(0, ECLAIRS.length);
    DONUTS.splice(0, DONUTS.length);

    deleteResultPopup();
    battleArea.addEventListener('click', userStep);
}

function addError() {
    err.classList = 'error';
    err.innerText = 'NO!'
    contain.append(err);
}

function addWin(player) {
    win.classList = 'win';
    win.innerText = `${player}\n WIN!`
    contain.append(win);
}

function drawWin() {
    draw.classList = 'draw';
    draw.innerText = 'DRAW!'
    contain.append(draw);
}



function deleteResultPopup() {
    win.remove();
    draw.remove();
}

function deleteError() {
    err.remove()
}

battleArea.addEventListener('click', userStep);
resetBtn.addEventListener('click', resetMatch);

console.log(battleArea)