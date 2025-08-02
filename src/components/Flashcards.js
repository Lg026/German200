import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/flashcard.module.css';
import { useTheme } from '../context/themeContext';

const Flashcards = () => {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    axios.get('https://languageapi-yne8.onrender.com')
      .then(res => setWords(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
    <div className={styles.progress}>
        <h2>{index + 1} / {words.length}</h2>
      </div>
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>
      <div 
        className={`${styles.card} ${flipped ? styles.flipped : ''}`} 
        onClick={() => setFlipped(!flipped)}
      >
        <div className={styles.front}>
          <h2>{words[index]?.German}</h2>
          <p>{words[index]?.Example}</p>
        </div>
        <div className={styles.back}>
          <h2>{words[index]?.English}</h2>
          <p>{words[index]?.EnglishExample}</p>
        </div>
      </div>

      <div className={styles.controls}>
        <button 
          onClick={() => setIndex(i => i - 1)}
          disabled={index === 0}
        >Previous</button>
        <button
          onClick={() => setIndex(i => i + 1)}
          disabled={index === words.length - 1}
        >Next</button>
      </div>
    </div>
    </>
  );
};

export default Flashcards;


