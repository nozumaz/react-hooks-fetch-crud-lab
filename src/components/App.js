import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionList, setQuestionList] = useState([])
  
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(questions => setQuestionList(questions))
  }, [])

  function handleAddQuestion(newQuestion) {
    setQuestionList([...questionList, newQuestion])
  }

  function handleDeleteCLick(id) {
    const updatedQuestions = questionList.filter(question => question.id !== id)
    setQuestionList(updatedQuestions)
  }

  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questionList.map(question => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestionList(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onAddQuestion={handleAddQuestion}/> : <QuestionList onUpdateQuestion={handleUpdateQuestion} onDeleteClick={handleDeleteCLick} questionList={questionList}/>}
    </main>
  );
}

export default App;