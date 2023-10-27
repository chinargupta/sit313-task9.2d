import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import "./FindQuestion.css"

function FindQuestion() {
  // State variables to manage questions, filters, and new question input
  const [questions, setQuestions] = useState([]);
  const [filterTitle, setFilterTitle] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    tag: '',
    desc: '',
  });
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Reference to the Firestore collection where questions are stored
  const userQuestionsRef = collection(db, 'questions');
  const [filteredQuestions, setFilteredQuestions] = useState([]); // Separate filtered array

  // Fetch questions from Firestore when the component mounts
  useEffect(() => {
    const getQuestions = async () => {
      const data = await getDocs(userQuestionsRef);
      const questionData = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestions(questionData);
      setFilteredQuestions(questionData); // Initialize filtered array with all questions
    };
    getQuestions();
  }, []);

  // Handle filtering questions based on title and tag
  const handleFilter = () => {
    const filteredQuestions = questions.filter(
      (question) =>
        question.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        question.tag.toLowerCase().includes(filterTag.toLowerCase())
    );
    setFilteredQuestions(filteredQuestions); // Update filtered array, not questions
  };

  // Handle deleting a question by ID
  const handleDeleteQuestion = async (id) => {
    // Remove the question with the given id from the database
    //await deleteDoc(doc(db, 'questions', id));

    // Update filteredQuestions to remove the deleted question
    const updatedQuestions = filteredQuestions.filter((question) => question.id !== id);
    setFilteredQuestions(updatedQuestions);
  };

  // Handle submitting a new question
  const handleSubmitNewQuestion = async () => {
    // Add the new question to the database
    await addDoc(collection(db, 'questions'), newQuestion);

    // Update filteredQuestions with the new question
    setFilteredQuestions([...filteredQuestions, newQuestion]);

    // Clear the form fields
    setNewQuestion({ title: '', tag: '', desc: '' });
  };

  // Handle expanding or collapsing a question's details
  const handleExpand = (index) => {
    // Toggle the expanded state for the clicked question
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div>
      <h1>Filter Questions</h1>
      <div className='filter'>
        <h5>Title:</h5>
        <input
          type="text"
          placeholder="Filter by title"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />

        <h5>Tag:</h5>
        <input
          type="text"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>

      <h1>Add New Question</h1>
      <div className='newQuestion'>
        <h5>Title:</h5>
        <input
          type="text"
          placeholder="Title"
          value={newQuestion.title}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, title: e.target.value })
          }
        />
        <h5>Description:</h5>
        <input
          type="text"
          placeholder="Description"
          value={newQuestion.desc}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, desc: e.target.value })
          }
        />

        <h5>Tag:</h5>
        <input
          type="text"
          placeholder="Tag"
          value={newQuestion.tag}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, tag: e.target.value })
          }
        />
        <button onClick={handleSubmitNewQuestion}>Submit</button>
      </div>

      <h1>Questions</h1>
      {filteredQuestions.map((question, index) => (
        <div className="card" key={question.id}>
          <h2>Question: {index + 1}</h2> 
          <h2>Title: {question.title}</h2>
          <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
          <button onClick={() => handleExpand(index)}>
            {expandedIndex === index ? 'Collapse' : 'Expand'}
          </button>
          {expandedIndex === index && (
            <div>
              <h3>More Details:</h3>
              <p>Description: {question.desc}</p>
              <p>Tag: {question.tag}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FindQuestion;
