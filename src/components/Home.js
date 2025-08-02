import React from 'react'
import { Link } from 'react-router-dom';
import homeStyles from '../styles/home.module.css'

export const Home = () => {
  return (
    <main>
      <h1 className={homeStyles.title}>Welcome to German200!</h1>
      <div className={homeStyles.container}>
      <p>German200 aims to help expand your German vocabulary by quizzing you on some of the most commonly used words by native speakers. We teach you the 200 most frequently used words in German with sample sentences.</p>
      </div>
      <Link to="/test" className={homeStyles.btn}>Start</Link>
      <Link to="/flashcards" className={homeStyles.btn}>Learn</Link>
    </main>
  )
}

export default Home

