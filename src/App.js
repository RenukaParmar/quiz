import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
// import Question from './question';
import question from './question';
function App() {
  const [activeQuestions, setActiveQuestions] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const[showResult,setShowResult]=useState(false)

  const [result, setResult] = useState({
    score: 0,
    correct: 0,
    incorrect: 0,
  })

  const quiz = question;

  function onClickNext() {
    setResult((prev) =>
    selectedAnswer ? {
        ...prev,
        score: prev.score + 5,
        correct: prev.correct + 1
      }
        :
        { ...prev, incorrect: prev.incorrect + 1 }
    )
    setSelectedAnswerIndex(null)
    if(activeQuestions!==quiz.length-1){
      setActiveQuestions(prev => prev + 1)
    }
    else{
      setActiveQuestions(0)
      setShowResult(true)
    }
  }
  
  function onAnswerSelected(answer, index) {
    setSelectedAnswerIndex(index)
    quiz.map(item => {
      if (answer === item.correctAnswer) {
        setSelectedAnswer(true)
      }
      else {
        setSelectedAnswer(false)
      }
    }
    )
    // console.log(selectedAnswer)
  }

  const addLeadingZero = (number) => (number > 4 ? number : `0${number}`)
  
  return (
    <div >
      {!showResult?(
        <div className='mainHead'>
        <div className='quizHead'>
        <div className='quizContent'>
          <div className='addLeadingZero'>
            <span className='addLeadingZeroSpan1'> 
            {addLeadingZero(activeQuestions + 1)} </span>
            <span>/{quiz.length}</span>
          </div>
          <h2 style={{ padding: '46px' }}>
            {quiz[activeQuestions].question}
          </h2>
          <ul className='options'>
            <li className='listOption'>
              {quiz[activeQuestions].choices.map((item, index) =>
              <ul key={item}>
                <li
                  onClick={() => onAnswerSelected(item, index)}
                  // style={{backgroundColor:selectedAnswerIndex===index?"black":"none"}}
                  className={selectedAnswerIndex === index ? "selectedAnswer " : null}
                >
                  {item}
                </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
        <button onClick={()=>onClickNext()}
         className='btn'
          disabled={selectedAnswerIndex === null}
          style={{backgroundColor:selectedAnswerIndex === null?"white":"blueviolet",
          color:selectedAnswerIndex === null?"gray":"white",
          cursor:selectedAnswerIndex === null&&'none'
          }}>
          {activeQuestions === quiz.length - 1 ? "Finish" : "Next"}
        </button>       
        </div>
        </div>
         )
         :
         (
<Result totalQuestions={quiz} result={result}  />
         )
}
      </div>
  );
}

export default App;
function Result(props){
  return(
    <>
    <div className='resultContainer'>
        <h2>Result</h2>
      <div>
   <h4>Total Questions:{props.totalQuestions.length}</h4>
   <h4>Score:{props.result.score}</h4>
   <h4>CorrectAnswer:{props.result.correct}</h4>
   <h4>WrongAnswer:{props.result.incorrect}</h4>
</div>
  
    </div>
    </>
  )
}
