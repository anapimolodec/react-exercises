import './App.css';
import QuestionList from './QuestionList';
import Quiz from './Quiz';

function App() {
  return (
    <div className="App">
      <h2 className='question-title'> Question 1: Question List</h2>
      <QuestionList />
      <h2 className='question-title'> Question 2: Quiz</h2>
      <Quiz />
    </div>
  );
}

export default App;
