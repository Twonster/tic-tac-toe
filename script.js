const round = document.getElementById('roundCount');
const player1 = document.getElementById('player1Count');
const player2 = document.getElementById('player2Count');
const battleArea = document.getElementsByClassName('battlePlace')[0];
const resetBtn = document.getElementsByClassName('resBtn')[0];
const contain = document.getElementsByClassName('container')[0];
const err = document.createElement('div');
const win = document.createElement('div');
const draw = document.createElement('div');

const donut = 'donut.png';
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

const checkWin = function (refferenceArr, userArr, playerConter, player) {
    refferenceArr.forEach(item => {
        let checkArr = [];

        for (let i = 0; i < item.length; i++) {
            if (userArr.indexOf(item[i]) !== -1) {
                checkArr.push(item[i])
            }
        }

        if (checkArr.length === 3) {
            playerConter();
            showNotification(win, 'win', `${player}\n WIN!`);
            battleArea.removeEventListener('click', userStep);
            winChecker = true;
            return
        };

        if ((ECLAIRS.length + DONUTS.length) === 9 && winChecker === false) {
            showNotification(draw, 'draw', `DRAW`);
        }

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
            showNotification(err, 'error', 'NO');
            setTimeout(deleteNotification, 1000, err)
        }
    }
}

function eclairsStep(event) {
    event.target.style = `background-image: url(${eclairs});`;
    ECLAIRS.push(+event.target.id);
    checkWin(WINARR, ECLAIRS, playerCounter1, 'Игрок 1');
    battleArea.removeEventListener('click', userStep);
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function donutsStep() {
    let num = getRandomInt(1, 10);
    let time = getRandomInt(1, 3);

    if (ECLAIRS.indexOf(+num) === -1 && DONUTS.indexOf(+num) === -1) {
        setTimeout(drawDonut, time * 1000, num);
    } else if ((ECLAIRS.length + DONUTS.length) === 9) {
        return
    } else {
        donutsStep()
    }
}

function drawDonut(num) {
    let place = document.getElementById(num);
    place.style = `background-image: url(${donut})`;
    DONUTS.push(+num);
    checkWin(WINARR, DONUTS, playerCounter2, 'Игрок 2');
    battleArea.addEventListener('click', userStep);
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

    deleteNotification(draw, win);
    battleArea.addEventListener('click', userStep);
}

function showNotification(elem, className, text) {
    elem.classList = className;
    elem.innerText = text;
    contain.append(elem);
}

function deleteNotification(...prop) {
    prop.forEach(item => item.remove())
}

battleArea.addEventListener('click', userStep);
resetBtn.addEventListener('click', resetMatch);