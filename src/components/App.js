import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => setQuestions(questions))
  }, []);

  const handleUpdateQuestion = (id, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex })
    })
    .then(response => response.json())
    .then(updatedQuestion => {
      setQuestions(prevQuestions =>
        prevQuestions.map(question =>
          question.id === id ? updatedQuestion : question
        )
      );
    });
  }

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      if(response.ok) {
        setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id));
      }
      else {
        console.log(`Failed to delete question with id ${id}`);
      }
    });
  }

  const addQuestion = (newQuestion) => {
    setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" 
        ? <QuestionForm addQuestion={addQuestion}/> 
        : <QuestionList 
            questions={questions} 
            onDeleteQuestion={handleDeleteQuestion} 
            onUpdateQuestion={handleUpdateQuestion}
          />}
    </main>
  );
}

export default App;