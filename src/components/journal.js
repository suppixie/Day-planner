import React, { useState } from 'react';
import axios from 'axios';
import '../../src/components/journal.css';

function DailyJournal() {
  const [entry, setEntry] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/save-entry', { entry });
      if (response.status === 200) {
        alert('Entry saved successfully!');
      }
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Failed to save entry.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(entry);
    alert('Entry copied to clipboard!');
  };

  return (
    <div className="daily-journal">
      <h1>Daily Journal</h1>
      <div >
        <textarea
        className='textarea'
          rows="10"
          cols="50"
          placeholder="Write your daily journal entry here..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        ></textarea>
      </div>
      <div>
        <p>Date: {date}</p>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCopy}>Copy</button>
      </div>
    </div>
  );
}

export default DailyJournal;
