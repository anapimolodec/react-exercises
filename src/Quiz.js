import React, {useState, useEffect} from 'react';
import {quizData} from './datafromAPI';

export default function Quiz() {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(0);
  const [select, setSelect] = useState(null);
  const selectAnswer = (answer) => {
    setSelect(answer);
  }
  useEffect(() => {
    setData(quizData);
  }, []);

return (<>
    {data && 
         <>
        <Question question={data[open]} selectAnswer={selectAnswer} correct={data[open].correctAnswer}/>
        <button disabled={open <= 0 ? true : false} onClick={() => setOpen(open - 1)}>Back</button>
        <button disabled={open >= data.length - 1 ? true : false} onClick={() => setOpen(open + 1)}>Next</button>
        </>
    }
    </>
  );
}

const Question = (props) => {
    const [clicked, setClicked] = useState(false);
    const [chosen, setChosen] = useState(null);
    const ans = props.question.answers;
   
      const updateAnswer = (i) => {
        if (clicked === false) {
          // selectAnswer(i);
          setChosen(i);
          getClicked();
        }
      }
    const getClicked = () => {
      setClicked(true);
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
  