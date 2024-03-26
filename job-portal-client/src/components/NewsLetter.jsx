import React, { useState } from "react";
import { FaEnvelopeOpenText, FaRocket } from "react-icons/fa6";
import axios from "axios";

const NewsLetter = () => {

    const [prompt,setPrompt] = useState("");
    const [response,setResponse] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {
            prompt: prompt,
        };
    
        fetch("http://localhost:5000/chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(requestBody), 
        })
        .then((res) => res.json()) 
        .then((data) => {
            setResponse(data); 
        })
        .catch((err) => {
            console.error(err); 
        });
    };
    
  return (
    <div>
      <div>
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaEnvelopeOpenText />
          Email me for jobs
        </h3>
        <p className="text-[#141414] text-base mb-4">
          UT ese eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo ea
          foes.
        </p>

        <div className="w-full space-y-4">
          <input
            type="email"
            name="email"
            placeholder="name@email.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
          />
          <input
            type="submit"
            value={"Subscribe"}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue-500 rounded-sm text-white cursor-pointer font-semibold transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
          />
        </div>
      </div>

      {/*  2nd Part */}
      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket />
          Get noticed faster
        </h3>
        <p className="text-[#141414] text-base mb-4">
          UT ese eiusmod aute. Sit enim labore dolore. Aute ea fugiat commodo ea
          foes.
        </p>

        <div className="w-full space-y-4">
          <input
            type="submit"
            value={"Upload your resume"}
            className="w-full block py-2 pl-3 border focus:outline-none bg-blue-500 rounded-sm text-white cursor-pointer font-semibold transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
          />
        </div>
      </div>

      {/* cathd */}
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="textInput">Text Input:</label>
        <input
          type="text"
          id="textInput"
          value={prompt}
          onChange={(e)=> setPrompt(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  


    </div>
  );
};

export default NewsLetter;
