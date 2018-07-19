var inquirer = require('inquirer')
var Game = require('./game.js')
var Word = require('./word.js')
var letter = require('./letter')

var hangManDisplay = Game.newWord.hangman

var wordBank = Game.newWord.wordList
var guessesRemaining = 10
var guessedLetters = []
var display = 0
var currentWord = ("sunflower");
var Ltr = function (ltr) {
    this.letter = ltr
    this.appear = false

    this.letterRender = function () {
        if (this.letter == ' ') { // renders a blank
            this.appear = true
            return '  '
        } if (this.appear === false) { // renders _
            return ' _ '
        } else { // renders the letter
            return this.letter
        }
    }
}


letsBegin()
function letsBegin() {
    console.log('Welcome to Daynas Hangman Game!')

    //guess letters if empty
    if (guessedLetters.length > 0) {
        guessedLetters = []
    }
//ask user a question, play-confirm- play?//
    inquirer.prompt([
        {
            name: 'play',
            type: 'YES',
            message: 'Are you Ready!?'
        }
    ]).then(function (answer) {
        if (answer.play) {
            console.log('')            
            console.log('You get 10 guesses to guess the right flower.')
            console.log('Good Luck!')
            newGame()
        } else {
            console.log('Good then leave you little bee')
        }
    })
}

function newGame() {
    if (guessesRemaining === 10) {
        console.log('-')

// function randomWord() {
//     theWord = allWords[Math.floor(Math.random() * allWords.length)];
// }
    //random number based on the wordBank
    var randNum = Math.floor(Math.random() * wordBank.length)
    currentWord = new Word(wordBank[randNum])
    currentWord.getLetter()
    // shows blanks.
    console.log('')
    console.log(currentWord.render())
    console.log('')
        promptUser()
        } else {
            resetGuessesRemaining()
            newGame()
    }
}

function resetGuessesRemaining() {
    guessesRemaining = 10
}
//ask user to chose letter
function promptUser() {
    inquirer.prompt([
        {
        name: 'chosenLetter',
        type: 'input',
        message: 'Pick letter, but only a letter',
        validate: function(value) {
            if (isLetter(value)) {
            return true
            } else {
                return false
            }
        }
    }
    ]).then(function(ltr) {
    //return caps
    var ltrRtrnd = (ltr.chosenLetter).toUpperCase()
    // if letter has already been used flag false. 
    var guessed = false
    for (var i = 0; i < guessedLetters.length; i++) {
        if(ltrRtrnd === guessedLetters[i]) {
                guessed = true
            }
        }

        if (guessed === false) {
            // push letter into array
         guessedLetters.push(ltrRtrnd)
            var found = currentWord.checkIfLetterFound(ltrRtrnd)
            if (found === 0) {
            console.log('Haha wrong guess!')

            guessesRemaining--
            // counter for hangman display
            display++
            console.log('Guesses reamaining: '.error + guessesRemaining)
            console.log(hangManDisplay[display - 1]) // prints the hangman display
            console.log('')
            console.log(currentWord.render())
            console.log('')
            console.log('-------------')
            console.log('Letters already guessed: ' + guessedLetters)
                 } else {
        console.log('Heck yeah! You are Correct!!')

        if (currentWord.checkWord() === true) {
            console.log('')
            console.log(currentWord.render())
            console.log('')
            console.log('--- WINNER --')
            letsBegin()
        } else {
            console.log('Guesses remaining: '.error + guessesRemaining)
            console.log('')
            console.log(currentWord.render())
            console.log('')
            console.log('--------------------')
                    console.log('Letters guessed: ' + guessedLetters)
                }
            }
        // if guessesRemaining is not found prompt the user
            if (guessesRemaining > 0 && theWord.wordFound === false) {
                keepPromptingUser();
            } else if (guessesRemaining === 0) {
                console.log('You have been defeated!');
                console.log('The word was: ' + theWord.word);
            }
            
        } else { 
            console.log('oops! You"ve guessed that letter already, try again.')
            promptUser();
        }
    })
}