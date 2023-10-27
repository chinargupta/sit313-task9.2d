import React, { useState } from 'react';
import './App.css';
import PostTypeSelector from './PostTypeSelector'; // Importing a component for selecting post type
import QuestionForm from './QuestionForm'; // Importing a component for question form
import ArticleForm from './ArticleForm'; // Importing a component for article form
import FindQuestion from './FindQuestion'; // Importing a component for finding questions
import "firebase/firestore"; // Importing Firebase Firestore (make sure Firebase is properly configured)

function App() {
  // State to keep track of the selected post type
  const [postType, setPostType] = useState('question');

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  return (
    <div className="App">
      <h1>New Post</h1>

      {/* Radio buttons for selecting post type */}
      <div className="post-type-selector">
        <label>
          <input
            type="radio"
            value="question"
            checked={postType === 'question'}
            onChange={handlePostTypeChange}
          />
          Question
        </label>
        <label>
          <input
            type="radio"
            value="article"
            checked={postType === 'article'}
            onChange={handlePostTypeChange}
          />
          Article
        </label>
        <label>
          <input
            type="radio"
            value="FindQuestion"
            checked={postType === 'FindQuestion'}
            onChange={handlePostTypeChange}
          />
          Find Question
        </label>
      </div>

      {/* Conditional rendering based on the selected post type */}
      {postType === 'question' && <QuestionForm />} {/* Render QuestionForm when 'question' is selected */}
      {postType === 'article' && <ArticleForm />} {/* Render ArticleForm when 'article' is selected */}
      {postType === 'FindQuestion' && (
        <div className="Find">
          <FindQuestion /> {/* Render FindQuestion when 'FindQuestion' is selected */}
        </div>
      )}
    </div>
  );
}

export default App;
