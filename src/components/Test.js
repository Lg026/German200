import React, {useState, useEffect} from 'react'
import testStyles from '../styles/test.module.css'
import axios from 'axios'

const randomAnswers = (answerArray, correctAnswer, count) => {
  const filteredArray = answerArray.filter(answer => answer !== correctAnswer);
  let randomized = [];
  
  while(randomized.length < count - 1) {
    const randomAnswer = filteredArray[Math.floor(Math.random() * filteredArray.length)];
    if(!randomized.includes(randomAnswer)) {
      randomized.push(randomAnswer);
    }
  }
  randomized.push(correctAnswer);
  randomized.sort(() => 0.5 - Math.random());

  return randomized;
}

export const Test = () => {
    const [data, setData] = useState({words: [], currentIndex: 0, loading: true});
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
    axios.get('https://languageapi-yne8.onrender.com/')
    .then(res => {
      const correctAnswer = res.data[0].English;
      const randomizedAnswers = randomAnswers(res.data.map(word => word.English), correctAnswer, 4);
      setData({words: res.data, currentIndex: 0, loading: false});
      setAnswers(randomizedAnswers);
    })
    .catch(error => {
        console.error('error:', error)
        setError(error);
    })
}, [])


    const handleAnswerClick = (answer) => {
      setSelectedAnswer(answer);
      setIsCorrect(answer === data.words[data.currentIndex].English);
    }

    const handleNextClick = () => {
  if (isCorrect) {
    const nextIndex = data.currentIndex + 1;
    setData({...data, currentIndex: nextIndex});
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowAnswer(false)

    if (nextIndex < data.words.length) {
      const correctAnswer = data.words[nextIndex].English;
      const randomizedAnswers = randomAnswers(data.words.map(word => word.English), correctAnswer, 4);
      setAnswers(randomizedAnswers);
    }
  } else if (selectedAnswer !== null) {
    setShowAnswer(true);
  }
}

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (data.loading) {
        return <div className={testStyles.loading}>Loading...</div>
    }

    if (data.currentIndex >= data.words.length) {
        return <h1 className={testStyles.ending}>Congratulations you've completed the test.</h1>
    }

    const handleKeyPress = (event) => {
  if (event.key === 'Enter' && selectedAnswer !== null) {
    document.getElementById('nextBtn').click();
  }
}

    const question = data.words[data.currentIndex].German

    return (
      
      <div>
        <h2 className={testStyles.Qnum}>Question: {data.currentIndex + 1}</h2>
        <p className={testStyles.german}><b>{question}</b></p>
        <p className={testStyles.sentence}>{data.words[data.currentIndex].Example}</p>
        <ul className={testStyles.listContainer}>
          {answers.map((answer) => (
            <div key={answer} onKeyDown={handleKeyPress} tabIndex={0} onClick={(e) => { e.currentTarget.focus();handleAnswerClick(answer);}} className={`${showAnswer ? (answer === data.words[data.currentIndex].English ? testStyles.right :(selectedAnswer === answer ? testStyles.wrong : testStyles.questions)) : testStyles.questions}`}>
              <input className={testStyles.checkBoxes} type="checkbox" id={`answer${answer}`} name="answer" value={answer} checked={selectedAnswer === answer} onChange={(e) => handleAnswerClick(e.target.value)}
              />
              <label htmlFor={`answer${answer}`}>{answer}</label>
            </div>
          ))} 
        </ul>
        <button id="nextBtn" className={testStyles.btn} onClick={handleNextClick}>Next</button>
      </div>
    )
}
  
export default Test











