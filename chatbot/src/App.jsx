
import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner'
import './App.css';
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {

  // store data use state hook
  // destructuring the useState into prompt and setPrompt
  // prompt is the input from the user
  // setPrompt is the function that used to update the prompt
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  // store the response from the user and show on screen using useState
  // array of object is used to store the prompt and response
  const [response, setResponse] = useState([
    {
      prompt: "Hi, how can I help you today?",
      response: "I am a chatbot, ask me anything.",
    }
  ]);

  const apikey = import.meta.env.VITE_API_GEMINI_KEY;




  async function aiResponse() {
    setLoading(true);
    // create an instance of the GoogleGenerativeAI
    const genAI = new GoogleGenerativeAI(apikey);
    // we have selected the model "gemini-1.5-flash"
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // we have given the prompt to the model and it will generate the response
    const result = await model.generateContent(prompt);
    // we will get the response from the model
    // console.log(result.response.text());
    // ... spread operator is used to copy the previous response and add the new response
    const newResponse = [
      ...response,
      { prompt: prompt, response: result.response.text() },
    ]
    setResponse(newResponse);
    setPrompt("");
    setLoading(false);
    // save the response in the local storage
    localStorage.setItem('chatbotResponse', JSON.stringify(newResponse));
  }

  useEffect(() => {
    const data = localStorage.getItem('chatbotResponse');
    if (data) {
      setResponse(JSON.parse(data));
    }
  }, []);

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
          {loading && (
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          )}
        </div>

        <div className='box'>
          <input
            type='text'
            placeholder='Ask me Anything'
            className='text'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className='btn' onClick={aiResponse} disabled={loading}>SUBMIT</button>
          <div className='response'></div>
        </div>
      </div>
    </>
  );
}

export default App;

