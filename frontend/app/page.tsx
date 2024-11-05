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

  return (
    <div className={styles.page}>
      <h1>Jogo da Forca</h1>
      <p>Erros: {errors} / 5</p>
      <p>{wordSpaces}</p>

      <div>
        {alphabet.map((letter) => (
          <button
            key={letter}
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
    </div>
  );
}
