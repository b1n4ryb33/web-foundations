function computerPlay(){
    const options = ['rock', 'paper', 'scissor'];
    return options[getRandomInt(3)];
}

function playRound(playerOne, playerTwo, humanSelection){

    let playerOneSelection = playerOne.play();
    let playerTwoSelection = humanSelection;

    if(playerOneSelection == playerTwoSelection){
        return `Nobody wins, you both had ${playerTwoSelection}.`;
    }
    if(playerOneSelection == "paper" && playerTwoSelection == "rock"){
        playerOne.score++;
        return `You lose. Computers ${playerOneSelection} beats your ${playerTwoSelection}`;
    }
    if(playerOneSelection == "paper" && playerTwoSelection == "scissor"){
        playerTwo.score++;
        return `You win. Computers ${playerOneSelection} losses against your ${playerTwoSelection}`;
    }
    if(playerOneSelection == "rock" && playerTwoSelection == "scissor"){
        playerOne.score++;
        return `You lose. Computers ${playerOneSelection} beats your ${playerTwoSelection}`;
    }
    if(playerOneSelection == "rock" && playerTwoSelection == "paper"){
        playerTwo.score++;
        return `You win. Computers ${playerOneSelection} losses against your${playerTwoSelection}`;
    }
    if(playerOneSelection == "scissor" && playerTwoSelection == "paper"){
        playerOne.score++;
        return `You lose. Computers ${playerOneSelection} beats your ${playerTwoSelection}`;
    }
    if(playerOneSelection == "scissor" && playerTwoSelection == "rock"){
        playerTwo.score++;
        return `You win. Computers ${playerTwoSelection} losses against your ${playerTwoSelection}`;
    }
}

function game(rounds=0, playRound){
    
    let self = this;
    
    self.rounds = rounds;
    self.roundsPlayed = 0;

    self.playerOne = new player('Computer', computerPlay);
    self.playerTwo = new player('Human');

    let resultParagraph = document.querySelector('#result');

    let roundHeadline = document.querySelector('#round-headline');
    roundHeadline.innerHTML = `Get ready for round ${self.roundsPlayed + 1}`;

    self.playRound =  function (humanSelection) {

        if(self.roundsPlayed < self.rounds){
            
            resultParagraph.innerHTML = playRound(self.playerOne, self.playerTwo, humanSelection);
            self.roundsPlayed++;

            if(self.roundsPlayed < self.rounds){
                roundHeadline.innerHTML = `Get ready for round ${self.roundsPlayed + 1}`;
            }
        }
        if(self.roundsPlayed == self.rounds){
            roundHeadline.innerHTML = calculateWinner(self.playerOne.score, self.playerTwo.score);
            let replayButton = document.querySelector('#replay');
            replayButton.style.display = "block";
        }

    }

    return self;
}

function player(name='player', play=undefined){
    let self = this;

    self.name = name;
    self.score = 0;
    self.play = play;

    return self;
}

// HELPER FUNCTIONS
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function calculateWinner(computerScore, playerScore){
    if(computerScore > playerScore){
        return `You lose with ${playerScore} to ${computerScore} points.`
    }
    else if(computerScore == playerScore){
        return `Nobody wins. You both had ${playerScore} points.`
    }
    return `You win with ${playerScore} to ${computerScore} points.`
}

function applyHandlers(){

    let sampleGame = new game(3, playRound);

    let rock = document.querySelector('#rock');
    let paper = document.querySelector('#paper');
    let scissor = document.querySelector('#scissor');

    rock.addEventListener('click', () => {
        sampleGame.playRound('rock');
    });

    paper.addEventListener('click', () => {
        sampleGame.playRound('paper');
    });

    scissor.addEventListener('click', () => {
        sampleGame.playRound('scissor');
    });

    let replayButton = document.querySelector('#replay');
    let resultParagraph = document.querySelector('#result');

    replayButton.addEventListener('click', () => {
        sampleGame = new game(3, playRound);
        replayButton.style.display = "none";
        resultParagraph.innerHTML = "";
    })
}

applyHandlers();
