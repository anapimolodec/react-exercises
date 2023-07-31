import React, {useState, useEffect} from 'react';
import {quizData} from './datafromAPI';
import './Quiz.css';

export default function Quiz() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    setData(quizData);
  }, []);

return (<>
    {data && 
         <div className="quiz-main">
        <Question question={data[open]} correct={data[open].correctAnswer}/>
        <button disabled={open <= 0 ? true : false} onClick={() => setOpen(open - 1)}>Back</button>
        <button disabled={open >= data.length - 1 ? true : false} onClick={() => setOpen(open + 1)}>Next</button>
        </div>
    }
    </>
  );
}

const Question = (props) => {
    const [clicked, setClicked] = useState(false);
    const [chosen, setChosen] = useState(null);
    const ans = props.question.answers;
    console.log("opened question");
    console.log(clicked, chosen);
    const updateAnswer = (i) => {
        
        if (clicked === false) {
          // selectAnswer(i);
          console.log("opened clicked question");
          setChosen(i);
          setClicked(true);
        }
    }
   
    return (
      <>
        <h1>{props.question.question}</h1>
        {ans.map((option, i) => {
         let classname ='answer ';
        if (chosen === i) {
          classname += props.correct === chosen ? 'correct' : 'incorrect'; 
        }
        return <h2 className={classname} key={i} onClick={() => updateAnswer(i)}>{option}</h2>
      })}
        
      </>
    );
  }
  