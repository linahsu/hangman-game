'use strict'
const { Word } = require('@andsfonseca/palavras-pt-br');

class HangmanController {
    async getRandomWord({ response }) {
        const randomWord = Word.getRandomWord();
        const wordSpaces = "_" + " _".repeat(randomWord.length-1);
        return response.json({
            randomWord,
            wordSpaces,
        })
    }
}

module.exports = HangmanController
