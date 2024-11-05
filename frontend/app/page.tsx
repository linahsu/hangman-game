import { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";

interface WordsResponse {
  randomWord: string,
  wordSpaces: string,
}

const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function Home() {
  const [word, setWord] = useState<string>('');
  const [wordSpaces, setWordSpaces] = useState<string>('');
  const [tryOuts, setTryOuts] = useState<string[]>([]);
  const [errors, setErrors] = useState<number>(0);

  const newWord = async () => {
    const response = await axios.get<WordsResponse>('http://localhost:3333/word');
    setWord(response.data.randomWord);
    setWordSpaces(response.data.wordSpaces);
    setTryOuts([]);
    setErrors(0);
  };

  return (
    <div className={styles.page}>
      <h1>Jogo da Forca</h1>
    </div>
  );
}
