import { Form, Button } from "react-bootstrap";
import PromptResponse from "./components/PromptResponse";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  useEffect(() => {
    // get previous prompts, if any, from local storage
    const prevPrompts = JSON.parse(localStorage.getItem("pagePrompts"));
    if (prevPrompts) {
      setResponses(prevPrompts);
    }
  }, []);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };
    // dont allow submission of another prompt
    setLoading(true);
    const res = await fetch(
      "https://api.openai.com/v1/engines/text-curie-001/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`,
        },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    setLoading(false);
    const newResponses = [
      { prompt: prompt, response: data.choices[0].text },
      ...responses,
    ];
    setResponses(newResponses);
    localStorage.setItem("pagePrompts", JSON.stringify(newResponses));
  };
  return (
    <div className="App">
      <h1>OpenAI Text Prompt Tester</h1>
      <Form className="prompt-container" onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formPrompt">
          <Form.Label>
            <h2>Prompt</h2>
          </Form.Label>
          <Form.Control
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            as="textarea"
            placeholder="Enter your prompt here! Feel free to leave the page and refresh, your prompts will still be there! :D"
            style={{ width: "40vw", height: "10vw" }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Loading" : "Submit Prompt"}
        </Button>
      </Form>
      <h1 style={{ marginTop: "2vw" }}>Prompt Responses</h1>
      <div className="prompt-responses">
        {responses.map((response) => {
          return (
            <PromptResponse
              prompt={response.prompt}
              response={response.response}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
