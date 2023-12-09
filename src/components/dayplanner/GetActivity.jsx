import React, { useEffect, useState } from "react";
import OpenAI from "openai";
import Todolist from "./todo-dayplanner";
import "./getactivity.css";
import Loading from "../../Loading/Loading";
import { FaRedoAlt } from "react-icons/fa";

function GetActivity(props) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todoItem, setTodoItem] = useState([]);

  const prompt = `suggest activities when it's ${props.weather} and the temperature is ${props.temp} C in ${props.location}`;

  // Function to fetch activity suggestions
  const generateActivity = async () => {
    setLoading(true);
    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 250,
        top_p: 1,
        temperature: 0.7,
      });

      // Check if choices exist in the response
      console.log(response.choices[0].text);

      if (response.choices && response.choices.length > 0) {
        const paragraph = response.choices[0].text;
        let sentences = paragraph.split(/(?<![a-zA-Z\d])\d+. /);
        sentences = sentences.filter(element => isNaN(element));
        setResult(sentences);
      } else {
        console.error('Invalid response format from OpenAI API');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateActivity();
  }, [prompt]);

  const addTodos = activity => {
    setTodoItem([...todoItem, activity]);
  };

  const refresh = () => {
    generateActivity();
  };

  return (
    <>
      <div className="day-planner">
        <div className="activity-container">
          <div className="heading">
            <h1>Activities You can do Today</h1>
            <button className="refresh-btn" onClick={refresh}>Refresh <FaRedoAlt/></button>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="activity">
              <div className="activities">
                {result.map(activity => (
                  <div
                    className="activityCard"
                    key={activity}
                    onClick={() => addTodos(activity)}
                  >
                    {activity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Todolist todoItem={todoItem} addTodos={addTodos} setTodoItem={setTodoItem}/>
      </div>
    </>
  );
}

export default GetActivity;
