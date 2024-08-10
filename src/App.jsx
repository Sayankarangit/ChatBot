import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false); // State for loading

  // Function to format text with ** as bold
  function formatBoldText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong style='color: red;'>$1</strong>");
  }

  async function generateAns() {
    setLoading(true); // Show loader
    setAnswer(""); // Clear previous answer
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAckngkfGDz4PHyUh6_Z3d7jH8PV0re8LE",
      method: "post",
      data: { contents: [{ parts: [{ text: question }] }] }
    });
    
    // Apply bold formatting to the answer
    const formattedAnswer = formatBoldText(
      response.data.candidates[0].content.parts[0].text
    );
    
    setAnswer(formattedAnswer); // Update the state with formatted answer
    setLoading(false); // Hide loader after receiving the response
  }

  return (
    <>
      <div className="container">
        <h1><span className="buddy">Buddy</span> <span className='bot'>Bot</span></h1>
        <div className='question'>
          <textarea 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            cols="30" 
            rows="5" 
            placeholder='What is going on your mind 😃?'
          ></textarea>
          <button className="button" onClick={generateAns}>
            <span>
              <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path>
              </svg>
            </span>
          </button>
        </div>

        <div className="response-container">
          {/* Show loading animation if loading is true, otherwise show the formatted answer */}
          {loading ? (
            <div className="loading-container">
              <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
              </div>
            </div>
          ) : (
            <pre dangerouslySetInnerHTML={{ __html: answer }} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;