
import "../css/AudioPlayer.css";
import React, { useEffect, useState } from "react";
import {MusicController } from "adventure-component-library";



export const AudioPlayerWidget = () => {

  
    var [i,setI] = useState(0);
    const [list] = useState([
                  {songName: "dejitaru glow", artist: "a.l.i.s.o.n, crystal cola", url: "http://www.hochmuth.com/mp3/Vivaldi_Sonata_eminor_.mp3"},
                  {songName: "dejitaru glow", artist: "brooo", url: "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_700KB.mp3"}
                ]);
  
    
    let [audio,set_audio] = useState(new Audio(list[i].url));
  
    let [is_playing,set_playing] = useState(false);
  
    function play ()  {  
      set_playing(!is_playing);
    }
  
    useEffect(() => {
      if (is_playing) {
        audio.play();
      }
      else {
        audio.pause();
      }
    }, [is_playing]);
  
  useEffect(() => {
    set_audio(new Audio(list[i].url));
  },[i]);
  
  
  function increment() {
      set_playing(false);
      setI((i + 1) % list.length);
      
  }
  function decrement () {
      set_playing(false);
      if (i === 0) setI(list.length - 1);
      else setI(i-1);
  }
  
  
  
   return <div className="player-container">          
              <MusicController
              isPlaying={is_playing}
              onClickPrev={()=>{decrement()}}
              onClickNext={()=>{increment()}}
              onTogglePlay={()=>{play()}}
              song={ list[i]} />
            </div>
  }