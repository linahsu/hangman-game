"use client"
import { useState, useEffect } from "react";
import  Image from 'next/image';
import axios from "axios";
import styles from "./page.module.css";
import { AlphabetBoard, Errors, HangmanImageContainer, LostContainer, WonContainer, Word} from "./ui/styles";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

interface WordsResponse {
  randomWord: string,
  wordSpaces: string,
}

// Lista com todas as letras do alfabeto
const alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
// Imagens da forca
const hangmanImages: string[] = ['/hangman-0.png', '/hangman-1.png', '/hangman-2.png', '/hangman-3.png', '/hangman-4.png', '/hangman-5.png', '/hangman-6.png'];

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
    setWon(false);
    setLost(false);
    setGameOver(false);
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
      newWordSpaces[index] = letter.toLocaleUpperCase();
    });

    setWordSpaces(newWordSpaces.join(''));
    setTryOuts([...tryOuts, letter]);

    if (newWordSpaces.join('') === word.toUpperCase()) {
      setWon(true);
      setGameOver(true);
    } 
    if (errors >= 5) {
      setLost(true);
      setGameOver(true);
    }
  };

  return (
    <div className={styles.page}>
      <Header newWord={newWord}/>
    
      <HangmanImageContainer>
        <Image src={hangmanImages[errors]} alt="Forca-0" width={150} height={220} />
        <Errors>{errors} / 6</Errors>
      </HangmanImageContainer>
      
      <Word>{wordSpaces.split('').join(' ')}</Word>

      {!gameOver && (
        <AlphabetBoard>
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => tryLetter(letter)}
              disabled={tryOuts.includes(letter)}
              style={{
                margin: '7px',
                padding: '5px',
                borderRadius: '10px',
                border: 'none',
                width: '90px',
                height: '90px',
                fontSize: '30px',
                backgroundColor: tryOuts.includes(letter) ? '#ffa7da' : '#16a881',
                cursor: tryOuts.includes(letter) ? 'not-allowed' : 'pointer',
              }}
            >
              {letter.toUpperCase()}
            </button>
          ))}
        </AlphabetBoard>
      )}

      {won && (
        <WonContainer>
          <p>Meus parabéns! Você acertou!</p>
        </WonContainer>
      )}

      {lost && (
        <LostContainer>
          <p>Que pena... Não foi desta vez...</p><br/>
          <p>Tente novamente!</p><br/>
          <p>Resposta: {word}</p>
        </LostContainer>
      )}
      
      <Footer />
    </div>
  );
}
