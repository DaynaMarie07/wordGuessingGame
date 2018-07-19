var Letter = require('./letter.js')

function Letter(wrd) {
    this.letters = [];
    this.underscoreArray = [];
    this.letterArray = [];
    this.strArray = [];
    this.wordSplitter = function () {
        for (var i = 0; i<this.word.length; i++) {
            this.letterArray[i] = "_";
        }
    }
    this.showLetters = function(){
        var strArray = this.word.split();  
        console.log(strArray)
        for (var i = 0; i<this.strArray.length; i++)
        {
            this.letters.push( new Letter(strArray[i]) );
        }
    
    }
}
    // gets and pushes to letters array
    this.getLetter = function () {
        for (var i = 0; i < this.word.length; i++) {
        var newLtr = new Letter(this.word[i]);
        this.letters.push(newLtr);
        }
    }

    // checks to see if user found the current word
    this.checkWord = function () {
        if (this.letters.every(function (lttr) {
          return lttr.appear === true;
        })) {
            this.wordFound = true;
          return true;
        }
    }
    
    this.checkLtr = function (guessedLetter) {
        var myReturn = 0
        this.letters.forEach(function (lttr) {
            if (lttr.letter === guessedLetter) {
            lttr.appear = true
            myReturn++
            }
        })
    return myReturn
    }
// // letterArray.isCorrect();
// console.log(wordTest.letterArray)
// wordTest.wordSplitter();
// console.log(wordTest.letterArray)
// wordTest.showTheLetters();
    this.wrdRender = function () {
        var display = ''
        this.letters.forEach(function (lttr) {
            var currentLetter = lttr.letterRender()
            display += currentLetter
        })
        return display
    }


module.exports = Word