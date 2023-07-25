import {useEffect, useState} from 'react';
import { questionsData, submissionsData } from './datafromAPI';
import './QuestionList.css';

const QuestionList = () => {
  const [ , setQuestions] = useState(null);
  const [cats, setCats] = useState(null);
  const [ , setSubmissions] = useState(null);

  const getStatus = (id) => {
    let i = 0;
    while (submissionsData[i]) {
        if (submissionsData[i].questionId === id) {
            return submissionsData[i].status;
        }
        i++;
    }
    return null;
  } 
  const calcCats = (data) => {
      const categories = {};
      if (!data) return;
      let i = 0;
        while (i < data.length) {
            let pair = { name: data[i], status: getStatus(data[i].id)};
            if (categories[data[i].category]) {
                categories[data[i].category].push(pair);
            } else {
                categories[data[i].category] = [pair];
            }
            i++;
        }
        return categories;
    }
    

    useEffect(() => {
        setSubmissions(submissionsData);
        setQuestions(questionsData);
        setCats(calcCats(questionsData));
        
        
    }, []);
    const countCorrect = (object) => {
        let i = 0;
        let count = 0;
        while (object[i]) {
            if (object[i].status === "CORRECT") {
                count++;
            }
            i++;
        }
        return (count);
    }
  return (
        <div className="main">
        { cats &&
            Object.keys(cats).map((cat) => {
                const correct = countCorrect(cats[cat]);
                return (
                <Category cat={cat} cats={cats} correct={correct}/>
                );
            })
        }
        </div>
    );
}

export default QuestionList;

const Category = ({cat, cats, correct}) => {
    
    return (
      <div className = "category">
        <h2>{cat} {correct}/{cats[cat].length}</h2>
        {cats[cat].map((question, i) => {
            if (question.status === "CORRECT") {
                correct++;
            }
            return (<Question 
            key = {i}
            question = {question}
            />);
        })}
      </div>);
  }

const Question = ({question}) => {
    const convertStatus = (str) => {
        if (str) {
            return (str.toLowerCase().replaceAll('_', '-'));
        }
        return ('unattempted');
    }
    const status = convertStatus(question.status) + ' status';
    return (
        <div className="question">
            <div className={status}></div>
            <h3>{question.name.name}</h3>
        </div>
    );
}