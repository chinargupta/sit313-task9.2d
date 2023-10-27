import React from 'react';
import './PostTypeSelector.css';

function PostTypeSelector({ postType, setPostType }) {
  const handlePostTypeChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setPostType(name);
    }
  };

  return (
    <div className="header">
      <label>Select Post Type:</label>
      <div>
        <input
          type="checkbox"
          id="question"
          name="question"
          checked={postType === 'question'}
          onChange={handlePostTypeChange}
        />
        <label htmlFor="question">Question</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="article"
          name="article"
          checked={postType === 'article'}
          onChange={handlePostTypeChange}
        />
        <label htmlFor="article">Article</label>

        <div>
        <input
          type="checkbox"
          id="FindOuestion"
          name="FindQuestion"
          checked={postType === 'FindQuestion'}
          onChange={handlePostTypeChange}
          />
          <label htmlFor="FindQuestion">Find Question</label>
      </div>
      </div>
    </div>
  );
}

export default PostTypeSelector;