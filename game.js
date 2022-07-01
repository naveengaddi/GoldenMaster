import {faker} from "@faker-js/faker";
import {Player} from "./Player"
export function Game() {
    let players = new Array();
    let purses = new Array(6);
    let inPenaltyBox = new Array(6);

    let popQuestions = new Array();
    let scienceQuestions = new Array();
    let sportsQuestions = new Array();
    let rockQuestions = new Array();

    let currentPlayer = 0;
    let isGettingOutOfPenaltyBox = false;

    let didPlayerWin = function () {
        return !(purses[currentPlayer] == 6);
    };

    let currentCategory = function () {
        if ( players[currentPlayer].position == 0) return "Pop";
        if ( players[currentPlayer].position == 4) return "Pop";
        if ( players[currentPlayer].position == 8) return "Pop";
        if ( players[currentPlayer].position == 1) return "Science";
        if ( players[currentPlayer].position == 5) return "Science";
        if ( players[currentPlayer].position == 9) return "Science";
        if ( players[currentPlayer].position == 2) return "Sports";
        if ( players[currentPlayer].position == 6) return "Sports";
        if ( players[currentPlayer].position == 10) return "Sports";
        return "Rock";
    };

    this.createRockQuestion = function (index) {
        return "Rock Question " + index;
    };

    for (let i = 0; i < 50; i++) {
        popQuestions.push("Pop Question " + i);
        scienceQuestions.push("Science Question " + i);
        sportsQuestions.push("Sports Question " + i);
        rockQuestions.push(this.createRockQuestion(i));
    }

    this.isPlayable = function (howManyPlayers) {
        return howManyPlayers >= 2;
    };

    this.add = function (playerName) {
        let player = new Player(playerName);
        players.push(player);
        purses[this.noOfPlayers()] = 0;
        inPenaltyBox[this.noOfPlayers()] = false;

        console.log(playerName + " was added");
        console.log("They are player number " + players.length);

        return true;
    };

    this.noOfPlayers = function () {
        return players.length;
    };

    let askQuestion = function () {
        if (currentCategory() == "Pop") console.log(popQuestions.shift());
        if (currentCategory() == "Science") console.log(scienceQuestions.shift());
        if (currentCategory() == "Sports") console.log(sportsQuestions.shift());
        if (currentCategory() == "Rock") console.log(rockQuestions.shift());
    };

    function updateCurrentPlayerPosition(roll) {

         players[currentPlayer].position =  players[currentPlayer].position + roll;
        if ( players[currentPlayer].position > 11) {
             players[currentPlayer].position =  players[currentPlayer].position - 12;
        }
        players[currentPlayer].position
        console.log(players[currentPlayer].name + "'s new location is " +  players[currentPlayer].position);
    }

    this.roll = function (roll) {

        console.log(players[currentPlayer].name + " is the current player");
        console.log("They have rolled a " + roll);

        if (players[currentPlayer].isInPenaltyBox) {
            if (roll % 2 != 0) {
                isGettingOutOfPenaltyBox = true;

                console.log(players[currentPlayer].name + " is getting out of the penalty box");
                updateCurrentPlayerPosition(roll);
                console.log("The category is " + currentCategory());
                askQuestion();
            } else {
                console.log(players[currentPlayer].name + " is not getting out of the penalty box");
                isGettingOutOfPenaltyBox = false;
            }
        } else {
            updateCurrentPlayerPosition(roll);
            console.log("The category is " + currentCategory());
            askQuestion();
        }
    };

    function changePlayerTurn() {
        currentPlayer += 1;
        if (currentPlayer == players.length) currentPlayer = 0;
    }

    function winner() {
        console.log("Answer was correct!!!!");

        purses[currentPlayer] += 1;
        console.log(players[currentPlayer].name + " now has " + purses[currentPlayer] + " Gold Coins.");

        let winner = didPlayerWin();
        changePlayerTurn();

        return winner;
    }

    this.wasCorrectlyAnswered = function () {
        if (players[currentPlayer].isInPenaltyBox) {
            if (isGettingOutOfPenaltyBox) {
                return winner();
            }
            changePlayerTurn();
            return true;
        }
        return winner();
    };

    this.wrongAnswer = function () {
        console.log("Question was incorrectly answered");
        console.log(players[currentPlayer].name + " was sent to the penalty box");
        players[currentPlayer].isInPenaltyBox = true;

        changePlayerTurn();
        return true;
    };
}

function rollDice() {
    return Math.floor(faker.datatype.float({min: 0, max: 1}) * 6) + 1;
}

export function run(seed) {
    faker.seed(seed);

    let notAWinner = false;
    let game = new Game();

    game.add("Chet");
    game.add("Pat");
    game.add("Sue");

    do {
        game.roll(rollDice());
        if (Math.floor(faker.datatype.float({min: 0, max: 1}) * 10) == 7) {
            notAWinner = game.wrongAnswer();
        } else {
            notAWinner = game.wasCorrectlyAnswered();
        }
    } while (notAWinner);
}
