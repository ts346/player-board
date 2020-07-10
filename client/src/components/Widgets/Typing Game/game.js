import React, { useState, useEffect } from "react";

import { generatePhrase } from "./Misc/phrases";
import { useKeyPress } from "./Misc/keyPress";
import { currentTime } from "./Misc/time";
import "./typeGame.css";

import Leaderboard from "./leaderboard";

//import axios from "axios";



const initalWords = generatePhrase();

function Game(props) {
  // set state as empty arr with 20 spaces
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(" ").join("")
  );

  var listOfOpp = [];

  ///// UI /////
  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState(initalWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initalWords.substr(1));
  const [seconds, setSeconds] = useState(10);
  const [winner, setWinner] = useState(props.username);
  const [gameTimer, setgameTimer] = useState(0);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds("Start");
    }

    if(seconds === "Start" && gameTimer < 15){
      setTimeout(() => setgameTimer(gameTimer + 1), 1000);
    }
    else{
      // props.socket.emit('updateLeaderBoard', {player: winner, wpm: wpm})
    }

    var maxWPM = 0;
    props.socket.on(
    "getWPM", 
    function(data){
      props.updateWPM(data.player, data.wpm);
      
      for(const [key, value] of Object.entries(props.opponents)){
        
        if(parseFloat(value) > maxWPM){
          setWinner(key);
          maxWPM = value;
        }
        if(parseFloat(wpm) > maxWPM){
          console.log("Your First!");
          setWinner(props.username);
          maxWPM = value;
        }
      }
  }.bind(this));

  // props.socket.on('getLeaderboard', function(data){
  //   setLeaderboad(data.leaderboard);
  // })

  });

  /////// wpm ///////
  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);

  useKeyPress((key) => {
    

    if (!startTime) {
      setStartTime(currentTime());
    }

    //
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    //
    if (key === currentChar && seconds === "Start") {
      //
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      //
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      //
      setCurrentChar(incomingChars.charAt(0));

      //
      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(" ").length < 10) {
        updatedIncomingChars += " " + generatePhrase();
      }
      setIncomingChars(updatedIncomingChars);

      if (incomingChars.charAt(0) === " ") {
        //
        setWordCount(wordCount + 1);
        //
        
        setWpm((((wordCount + 1) / gameTimer)*60).toFixed(2));
        //
        

        // props.socket.emit("updateWPM", { username: props.username, wpm: wpm });
        props.socket.emit('updateWPM', {username: props.username, wpm: (((wordCount + 1) / gameTimer)*60).toFixed(2)});
      }
    }
  });

  /*
  function endGame() {
    props.socket.emit("endgame", { player: props.username });
  }
  

  function gameFinish() {
    axios
      .post("https://721461e8bf88.ngrok.io/finish/", {
        player1: props.username,
        player2: props.opponent,
      })
      .then((res) => {
        console.log(res);

        if (parseFloat(res.data[0]["wpm"]) > parseFloat(res.data[1]["wpm"])) {
          setWinner(res.data[0]["username"]);
        } else {
          setWinner(res.data[1]["username"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  */

  function endGame(){
    props.socket.emit('endgame', {player: props.username});
    props.resetGame();
  }

  for( const[key, value] of Object.entries(props.opponents)){
    listOfOpp.push(
      <div key={key}>
        <h3>Opponent: {key} WPM: {value}</h3>
      </div>
    )
  }

  if (gameTimer >= 15) {
    //gameFinish();
    // if players are playing for more than two minutes, turn game off
    return (
      <div className="wpmDiv">
        <h3 style={{ textAlign: "center" }}>Game Over!</h3>
        <p>WPM: {wpm}</p>

        {/*<button onClick={endGame}>End Game</button> */}
        <button style={{ width: "50%" }} onClick={endGame}>End Game</button>

        {/* <h1>Winner: {winner}</h1> */}
        <h1>Winner: {winner}</h1>

        <div style={{ textAlign: "match-parent" }}>
          <Leaderboard />
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ backgroundColor: "white" }}>
        <div className="phraseDiv">
          <p className="Character">
            <span className="Character-out">
              {(leftPadding + outgoingChars).slice(-20)}
            </span>
            <span className="Character-current">{currentChar}</span>
            <span>{incomingChars.substr(0, 20)}</span>
          </p>
        </div>

        <div className="wpmDiv">
          <h3>WPM: {wpm}</h3>
        </div>

        <div className="oppDiv">
          {/* <h2>Opponent: {props.opponent}</h2> */}
          {listOfOpp}
        </div>

        <div className="secDiv">
          <h1>{seconds}</h1>
        </div>
      </div>
    );
  }
}

export default Game;
