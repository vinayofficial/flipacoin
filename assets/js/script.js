var winCount, loseCount, winStatus, gamePlays = [];

//Check Initial Volume Status
var soundBtn = document.getElementById('soundBtn');
var soundOff = '<i class="fa fa-volume-mute fa-2x"></i>';
var soundOn = '<i class="fa fa-volume-up fa-2x"></i>';
var volStatus = JSON.parse(localStorage.getItem('volume'));
if (volStatus) soundBtn.innerHTML = soundOn;
else soundBtn.innerHTML = soundOff;

//Check and Set Initial Score
//Win Score
winCount = localStorage.getItem('winCount');
if (winCount) document.getElementById('winCount').innerHTML = +winCount
else document.getElementById('winCount').innerHTML = 0;
//lose score
loseCount = localStorage.getItem('loseCount');
if (loseCount) document.getElementById('loseCount').innerHTML = +loseCount
else document.getElementById('loseCount').innerHTML = 0;

//Initial Logs
getLogs() 

//Start the Game
function startGame(userChoice) {
    var output, winSound, loseSound, el;

    // Assign Sound
    winSound = new Audio('assets/js/win.mp3');
    loseSound = new Audio('assets/js/lose.mp3');

    // Get the Game Buttons
    var gbtn = document.getElementsByClassName('gameBtn');
    for (var i = 0; i < gbtn.length; i++) gbtn[i].setAttribute('disabled', 'disabled');


    // Get the coin images
    var coinHead = document.getElementsByClassName('coinHead')[0]
    var coinTail = document.getElementsByClassName('coinTail')[0]

    coinHead.classList.remove('hide');
    coinHead.classList.add('flip');
    coinTail.classList.remove('hide');
    coinTail.classList.add('flip');

    //Getting Result
    let result = Math.floor(Math.random() * 2);
    console.log('random number is: ' + result);
    // 1 = true; 0 = false;

    if (result) result = 'Head';
    else result = 'Tail';

    setTimeout(function () {
        // Showing Results
        if (result == 'Head') coinTail.classList.add('hide');
        else coinHead.classList.add('hide');

        if (userChoice == 'Head' || userChoice == 'Tail') {
            if (userChoice == result) {
                winStatus = true;
                output = "You Won !!";
                el = document.getElementById('winCount');
                winCount = +el.innerHTML + 1;
                el.innerHTML = winCount;
                localStorage.setItem('winCount', winCount);
                if (volStatus) winSound.play();
            }
            else {
                winStatus = false;
                output = "Better Luck Next Time !!";
                el = document.getElementById('loseCount');
                loseCount = +el.innerHTML + 1;
                el.innerHTML = loseCount;
                localStoragecd CanvasGradient,ṃ9=-80982.setItem('loseCount', loseCount);
                if (volStatus) loseSound.play();
            }

            var res = {
                user: userChoice,
                toss: result,
                winning: winStatus
            }

            gamePlays.push(res);
            localStorage.setItem('gamePlays', JSON.stringify(gamePlays));
            getLogs();
            console.log('user selected: ' + userChoice);
        } else {
            output = '';
        }

        console.log('Result: ' + result);

        // Generating Output
        el = document.getElementById('result');
        el.classList.remove('hide');
        el.innerHTML = "<h3> It's a " + result + "!! " + output + "</h3>";

        //Reset Everything
        for (var i = 0; i < gbtn.length; i++) gbtn[i].removeAttribute('disabled');
        coinHead.classList.remove('flip');
        coinTail.classList.remove('flip');
    }, 2000)

}

function resetGame() {
    winCountHTML = document.getElementById('winCount').innerHTML = 0;
    loseCountHTML = document.getElementById('loseCount').innerHTML = 0;
    localStorage.setItem('winCount', 0);
    localStorage.setItem('loseCount', 0);
    console.log('The game has reset !!');
}

function toggleSound() {
    volStatus = !volStatus;
    localStorage.setItem('volume', volStatus);
    if (volStatus) soundBtn.innerHTML = soundOn;
    else soundBtn.innerHTML = soundOff;
    console.log('volume status is: ' + volStatus);
}

function getLogs() {
    var gp = JSON.parse(localStorage.getItem('gamePlays'))
    var gl = document.getElementById('gameLogs')
    gl.innerHTML = '';
    var i = 1;
    gp.forEach(e => {
        var trow = "<tr>";
        trow += "<td>"+ i +"</td>"
        trow += "<td>" + e.user + "</td>";
        trow += "<td>" + e.toss + "</td>";

        if (e.winning) trow += "<td class='text-success'> Won </td>"
        else trow += "<td class='text-danger'> Lost </td>";

        gl.innerHTML += trow;
        i++;
    });
}