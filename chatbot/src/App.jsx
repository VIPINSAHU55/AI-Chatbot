import { useState } from 'react';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const apikey = import.meta.env.VITE_API_GEMINI_KEY;

  async function aiRespose() {
    try {
      const genAI = new GoogleGenerativeAI(apikey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);
      const responseText = result.response.text(); // Ensure proper response handling
      setResponse(responseText);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  }

  return (
    <>
      <h1>Ai Chatbot</h1>
      <div className='container'>
        <p>{response}</p>
        <div className='box'>
          <form id='fm' onSubmit={(e) => e.preventDefault()}>
            <input 
              type='text' 
              placeholder='Ask me Anything' 
              className='text' 
              onChange={(e) => {setPrompt(e.target.value)}}
            />
            <button className='btn' onClick={aiRespose}>SUBMIT</button>
          </form>
          <div className='response'></div>
        </div>
      </div>
    </>
  );
}

export default App;
