// import React from "react";

// function QuestionItem({ question, onDeleteClick }) {
//   const { id, prompt, answers, correctIndex } = question;

//   const options = answers.map((answer, index) => (
//     <option key={index} value={index}>
//       {answer}
//     </option>
//   ));

//   function handleDeleteClick() {
//     fetch(`http://localhost:4000/questions/${id}`, {
//       method: "DELETE"
//     })
//     .then(resp => resp.json())
//     .then(() => onDeleteClick(id))
//   }

//   return (
//     <li>
//       <h4>Question {id}</h4>
//       <h5>Prompt: {prompt}</h5>
//       <label>
//         Correct Answer:
//         <select defaultValue={correctIndex}>{options}</select>
//       </label>
//       <button onClick={handleDeleteClick}>Delete Question</button>
//     </li>
//   );
// }

// export default QuestionItem;

import React from "react";

function QuestionItem({ question, onDeleteClick, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleAnswerChange(e) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method:"PATCH",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(
        {
          "correctIndex": parseInt(e.target.value)
        }
      )
    })
    .then(resp => resp.json())
    .then(updatedQuestion => onUpdateQuestion(updatedQuestion))
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(() => onDeleteClick(id))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
