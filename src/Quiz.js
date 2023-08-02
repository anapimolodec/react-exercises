import React, {useState, useEffect} from 'react';
import {quizData} from './datafromAPI';
import './Quiz.css';

export default function Quiz() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    setData(quizData);
  }, []);

  const currentlyClicked = (newAns) => {
    let cloneAns = [...answers];
    cloneAns[open] = newAns;
    setAnswers(cloneAns);
  }

return (<>
    {data && 
        <div className="quiz-main">
          <Question question={data[open]} currentlyClicked={currentlyClicked} answer={answers[open]}/>
          <div className='button-wrapper'>
            <button disabled={open <= 0 ? true : false} onClick={() => setOpen(open - 1)}>Back</button>
            <button disabled={(open >= data.length - 1 || answers[open] === undefined) ? true : false} onClick={() => setOpen(open + 1)}>Next</button>
          </div>
           </div>
    }
    </>
  );
}

const Question = ({question, currentlyClicked, answer}) => {
  const correct = question.correctAnswer;
  const [chose, setChosen] = useState(-1);
  useEffect(() => {
    setChosen(-1);
  }, [question]);
  const handleClick = (i) => {
    if (answer !== undefined) {
      return ;
    } else if (chose === -1) {
      setChosen(i);
      currentlyClicked(i);
    }
  }
    return (
      <>
        <h1>{question.question}</h1>
        {question.answers.map((option, i) => {
          let classname = "answer";
          if (answer === i) {
              i === correct ? classname += ' correct' : classname += ' incorrect';
          }
        return <h2 key={i} className={classname} onClick={() => handleClick(i)}>{option}</h2>
      })}
      </>
    );
  }
  