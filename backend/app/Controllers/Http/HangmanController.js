'use strict'
const { Word } = require('@andsfonseca/palavras-pt-br');

class HangmanController {
    async getRandomWord({ response }) {
        const randomWord = Word.getRandomWord();
        const wordSpaces = "_" + "_".repeat(randomWord.length-1);
        return response.json({
            randomWord,
            wordSpaces,
        })
    }

    async validadeLetter({ request, response }) {
        const { word, letter } = request.all();
        const indexes = [];

        for (let index = 0; index < word.length; index += 1) {
            if (word[index] === letter) {
                indexes.push(index);
            }
        }

        return response.json({
            letter,
            indexes,
        })
    }
}

module.exports = HangmanController
