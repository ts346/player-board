import React, {useState, useEffect} from 'react';

import { useKeyPress } from './Misc/keyPress';
import { currentTime } from "./Misc/time";

function Lyrics (props){



    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(" ").join("")
      );
    const [outgoingChars, setOutgoingChars] = useState("");
    var [currentChar, setCurrentChar] = useState(props.lyrics.charAt(0));
    const [incomingChars, setIncomingChars] = useState(props.lyrics.substr(1));
    const [start, setStart] = useState(false)
    

    const [gameTimer, setgameTimer] = useState(0);
    useEffect(() => {
      if(start){
        setTimeout(() => {
          setgameTimer(gameTimer + 1);
          
          
        }, 1000);
      }
    })

      /////// wpm ///////
  const [startTime, setStartTime] = useState();
  const [wordCount, setWordCount] = useState(0);

  

  useKeyPress((key) => {
    setStart(true);

    if (!startTime) {
      setStartTime(currentTime());
    }

    //
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    //
    if (key === currentChar) {
      
      //
      props.progress();
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }
      //
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      //
      updatedIncomingChars = incomingChars.substring(1);
      setCurrentChar(incomingChars.charAt(0));

      //
     
      setIncomingChars(updatedIncomingChars);
      if (incomingChars.charAt(0) === " ") {
        
        //
        setWordCount(wordCount + 1);
        //
        props.wpm(((wordCount + 1) / (gameTimer/60)).toFixed(2));
        
        
        //
      
      }
    }
  });

        return(
            <div style={{height: '15%', width: '90%', margin: 'auto', backgroundColor: 'white'}}>
                <p className="Character">
                    <span className="Character-out-lyric">
                    {(leftPadding + outgoingChars).slice(-20)}
                    
                    </span>
                    <span className="Character-current">{currentChar}</span>
                    <span className="Character-incoming">{incomingChars.substr(0, 20)}</span>
                </p>
            </div>
        );
}

export default Lyrics;