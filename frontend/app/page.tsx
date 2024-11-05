"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./page.module.css";

interface WordsResponse {
  randomWord: string,
  wordSpaces: string,
}

// Lista com todas as letras do alfabeto
const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function Home() {
  const [word, setWord] = useState<string>('');
  const [wordSpaces, setWordSpaces] = useState<string>('');
  const [tryOuts, setTryOuts] = useState<string[]>([]);
  const [errors, setErrors] = useState<number>(0);
  const [won, setWon] = useState<boolean>(false);
  const [lost, setLost] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Função para buscar uma nova palavra e resetar os outros estados
  const newWord = async () => {
    const response = await axios.get<WordsResponse>('http://127.0.0.1:3333/word');
    setWord(response.data.randomWord);
    setWordSpaces(response.data.wordSpaces);
    setTryOuts([]);
    setErrors(0);
  };

  // Chama a função que gera uma nova palavra na renderização inicial
  useEffect(() => {
    newWord();
  }, []);

  const tryLetter = async (letter: string) => {
    const response = await axios.post(
      'http://127.0.0.1:3333/validate',
      { word, letter },
    );

    const { indexes } = response.data;
    if (indexes.length === 0) setErrors(errors + 1);

    const newWordSpaces = wordSpaces.split('');
    indexes.forEach((index: number) => {
      newWordSpaces[index] = letter;
    });

    setWordSpaces(newWordSpaces.join(''));
    setTryOuts([...tryOuts, letter]);

    if (newWordSpaces.join('') === word) {
      setWon(true);
      setGameOver(true);
    } 
    if (errors >= 4) {
      setLost(true);
      setGameOver(true);
    }
  };

  return (
    <div className={styles.page}>
      <h1>Jogo da Forca</h1>
      <p>Erros: {errors} / 5</p>
      <p>{wordSpaces}</p>


      {!gameOver && (
        <div>
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => tryLetter(letter)}
              disabled={tryOuts.includes(letter)}
              style={{
                margin: '5px',
                padding: '5px',
                borderRadius: '5px',
                border: 'none',
                width: '40px',
                height: '40px',
                backgroundColor: tryOuts.includes(letter) ? '#ccc' : '#007bff',
                cursor: tryOuts.includes(letter) ? 'not-allowed' : 'pointer',
              }}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {won && <p>Você ganhou!</p>}

      {lost && <p>Você perdeu!</p>}
    </div>
  );
}
