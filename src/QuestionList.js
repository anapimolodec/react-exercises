import {useEffect, useState} from 'react';
import { questionsData, submissionsData } from './datafromAPI';


const QuestionList = () => {
  const [questions, setQuestions] = useState(null);
  const [cats, setCats] = useState(null);
  const [submissions, setSubmissions] = useState(null);

  const getStatus = (id) => {
    let i = 0;
    while (submissionsData[i]) {
        if (submissionsData[i].questionId == id) {
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
    console.log(cats);
  return (
        <>
        { cats &&
            Object.keys(cats).map((cat) => {
                return (
                <Category cat={cat} cats={cats}/>
                );
            })
        }
        </>
    );
}

export default QuestionList;

const Category = ({cat, cats}) => {
    console.log(cat, cats);
    return (
      <div className = "category">
        <h2>{cat} 1/{cats[cat].length}</h2>
        {cats[cat].map((question, i) => {
            return (<Question 
            key = {i}
            question = {question}/>);
        })}
      </div>);
  }

const Question = ({question}) => {
    const convertStatus = (str) => {
        if (str) {
            return (str.toLowerCase().replaceAll('_', '-'));
        }
        return (null);
    }
    const status = convertStatus(question.status) + 'status';
    return (
        <div className="question">
            <div className={status}></div>
            <h3>{question.name.name}</h3>
        </div>
    );
}