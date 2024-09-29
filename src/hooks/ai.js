import { useState } from 'react';
//ai model llama-v3p1-405b-instruct
const ai = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async (query,temp,maxtokens) => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer B6q76Q91K4HyseT1Qm0Mi4uaPQ3GmpmAMNtC6cZOSYTVQKVI',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "accounts/fireworks/models/llama-v3p1-405b-instruct",
          prompt: query,
          max_tokens: maxtokens,
          temperature: temp,
          top_p: 1,
          top_k: 50,
          frequency_penalty: 0,
          presence_penalty: 0,
          n: 1,
          stop:["\n"],
          stream: false,
          context_length_exceeded_behavior: "truncate",
        })
      };

      const response = await fetch('https://api.fireworks.ai/inference/v1/completions', options);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("fireworks", data);
      setSuggestions(data.choices[0].text.split('\n').filter(Boolean));
    } catch (error) {
      setError('Failed to fetch username suggestions');
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  return { suggestions, loading, error, fetchSuggestions,setSuggestions };
};

export default ai;
//adding new ai model 