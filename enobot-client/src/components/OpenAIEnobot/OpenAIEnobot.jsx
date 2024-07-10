import { useState, useEffect } from 'react';
import axios from 'axios';
import './OpenAIEnobot.scss';

const HTTP_ENDPOINT = "http://localhost:8080/api/predict"; 

async function sendPrompt(data) {
  const response = await axios.post(HTTP_ENDPOINT, data);
  return response.data;
}

const OpenAIEnobot = ({ type, variety, region }) => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrediction = async () => {
      const data = {
        type,
        variety: variety.map(item => item.value), 
        region: region.value,
      };
      console.log('Sending data to server:', data);

      try {
        const resData = await sendPrompt(data);
        setResponse(resData);
      } catch (error) {
        setError("Failed to fetch response. Please try again.");
      }
    };

    fetchPrediction();
  }, [type, variety, region]);

  return (
    <div className="openai-enobot">
      <div className="openai-enobot__header">
        <img src="/src/assets/images/enobot-black.svg" alt="EnoBot Icon" className="enobot-icon" />
        <span>Hello there! I'm EnoBot, your personal wine sommelier. Let's talk wine! </span>
      </div>
      <div className="openai-enobot__body">
        {error ? <div className="error">{error}</div> : <p>{response || 'Loading...'}</p>}
      </div>
    </div>
  );
};

export default OpenAIEnobot;
