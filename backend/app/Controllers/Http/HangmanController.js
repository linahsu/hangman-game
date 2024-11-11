'use strict'
const { Word } = require('@andsfonseca/palavras-pt-br');

function letterConverter (letter) {
    let newLetter = letter;
    if (['à', 'á', 'â', 'ã'].includes(letter)) newLetter = 'a';
    if (['é', 'ê'].includes(letter)) newLetter = 'e';
    if (['í'].includes(letter)) newLetter = 'i';
    if (['ó', 'ô', 'õ'].includes(letter)) newLetter = 'o';
    if (['ú'].includes(letter)) newLetter = 'u';
    if (['ç'].includes(letter)) newLetter = 'c';
    return newLetter;
}

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
            const wordLetter = letterConverter(word[index]);
            
            if (wordLetter === letter) {
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
