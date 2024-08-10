import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");
  const [loading, setLoading] = useState(false); // State for loading

  async function generateans() {
    setLoading(true); // Show loader
    setanswer(""); // Clear previous answer
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAckngkfGDz4PHyUh6_Z3d7jH8PV0re8LE",
      method: "post",
      data: { contents: [{ parts: [{ text: question }] }] }
    });
    setanswer(
      response["data"]["candidates"][0]["content"]["parts"][0]["text"]
    );
    setLoading(false); // Hide loader after receiving the response
  }

  return (
    <>
      <div className="container">
        <h1><span className="buddy">Buddy</span> <span className='bot'>Bot</span></h1>
        <div className='question'>
          <textarea value={question} onChange={(e) => setquestion(e.target.value)} cols="30" rows="5" placeholder='What is going on your mind 😃?'></textarea>
 
<button class="button" onClick={generateans}>
  <span>
    <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path></svg>
  </span>
</button>

      
        </div>

        <div>
          <pre>
            {/* Show loading animation if loading is true, otherwise show the answer */}
            {loading ? (
              /* From Uiverse.io by mobinkakei */ 
<div class="wrapper">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="shadow"></div>
    <div class="shadow"></div>
    <div class="shadow"></div>
</div>
            ) : (
              answer
            )}
          </pre>
        </div>
      </div>
    </>
  )
}

export default App