import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [uniqueWordsCount, setUniqueWordsCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  useEffect(() => {
    calculateStatistics(text);
  }, [text]);

  const calculateStatistics = (input) => {
    const words = input.toLowerCase().match(/\b\w+\b/g);
    const uniqueWords = words ? new Set(words) : new Set();
    setUniqueWordsCount(uniqueWords.size);

    const chars = input.replace(/[^a-zA-Z0-9]/g, '');
    setCharCount(chars.length);
  };

  const handleReplace = () => {
    if (!new RegExp(searchText, 'i').test(text)) {
      alert('Text not found!');
    }
    const updatedText = text.replace(new RegExp(searchText, 'gi'), replaceText);
    setText(updatedText);
  };
  

  return (
    <div className="App">
      <h1>Real-Time Text Analysis and String Replacement</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
      />
      <div className="statistics">
        <p>Unique Words: {uniqueWordsCount}</p>
        <p>Character Count (excluding spaces and punctuation): {charCount}</p>
      </div>
      <div className="replacement">
        <input
          type="text"
          placeholder="Search for..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Replace with..."
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
        />
        <button onClick={handleReplace}>Replace All</button>
        <button onClick={() => setText('')}>Clear Text</button>
<button onClick={() => { setSearchText(''); setReplaceText(''); }}>Clear Inputs</button>

      </div>
    </div>
  );
}

export default App;
