import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    
    if (!message.trim()) {
      alert('Please enter a message.');
      return;
    }

    try {
      const response = await axios.post('/send_message', { message });
      setResponse(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error occurred. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Send Message to Line Bot</h1>
        <form onSubmit={handleMessageSubmit}>
          <label htmlFor="message">Message:</label><br />
          <textarea
            id="message"
            name="message"
            rows="4"
            cols="50"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea><br />
          <button type="submit">Send</button>
        </form>
        {response && <p id="response">{response}</p>}
      </header>
    </div>
  );
}

export default App;
