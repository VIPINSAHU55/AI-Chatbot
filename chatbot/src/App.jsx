
import { useState, useEffect } from 'react';
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState([
    {
      prompt: "Hi, how can I help you today?",
      response: "I am a chatbot, ask me anything.",
    }
  ]);

  const apikey = import.meta.env.VITE_API_GEMINI_KEY;

  useEffect(() => {
    const genAI = new GoogleGenerativeAI(apikey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }, [apikey]);

  async function aiResponse() {
    if (!prompt.trim()) return;
    const genAI = new GoogleGenerativeAI(apikey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    try {
      const result = await model.generateContent(prompt);
      setResponse([...response, { prompt, response: result.response.text() }]);
      setPrompt('');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Ai Chatbot</h1>
      <div className='container'>
        <div className='uc'>
          {response.map((res, index) => (
            <div key={index}>
              <p className='user'>
                <strong>User:</strong> {res.prompt}
              </p>
              <p className='chat'>
                <strong>Chatbot:</strong> {res.response}
              </p>
            </div>
          ))}
        </div>
        <div className='box'>
          <input
            type='text'
            placeholder='Ask me Anything'
            className='text'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className='btn' onClick={aiResponse}>SUBMIT</button>
          <div className='response'></div>
        </div>
      </div>
    </>
  );
}

export default App;

