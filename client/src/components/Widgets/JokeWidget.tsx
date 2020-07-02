//Joke Widget
import React, { useEffect, useState, useCallback } from "react";

const audio = new Audio(
  "http://static1.grsites.com/archive/sounds/comic/comic002.mp3"
);

export const JokeWidget = () => {
  const [setup, setSetup] = useState("loading");
  const [punchline, setPunchline] = useState("loading");

  const newJoke = useCallback(() => {
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((res) => res.json())
      .then((res2) => {
        setSetup(res2.setup);
        setPunchline(res2.punchline);
      });
    audio.play();
  }, []);

  useEffect(() => {
    newJoke();
  }, [newJoke]);

  return (
    <div className="default">
      <div className="joke-container">
        <h3 className="title">Press The Button To Get A Random Joke!</h3>
        <button className="getJoke" onClick={newJoke}>
          Tell Me Something Funny!
        </button>
      </div>
      <div className="Joke">
        Setup: {setup} <br />
        Punchline: {punchline} <br />
      </div>
    </div>
  );
};
