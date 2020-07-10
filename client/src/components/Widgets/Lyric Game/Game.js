import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Tooltip } from "@material-ui/core";

import './lyricGame.css';

import LyricWindow from './LyricWindow';

const songs = [
    {
        title: 'Ghost Busters',
        lyrics: "If there's somethin' strange in your neighborhood Who you gonna call (Ghostbusters) If there's somethin' weird and it don't look good Who you gonna call (Ghostbusters) I ain't afraid of no ghost I ain't afraid of no ghost If you're seein' things runnin' through your head Who you can you call (Ghostbusters) An invisible man sleepin' in your bed, oh Who you gonna call (Ghostbusters) I ain't afraid of no ghost I ain't afraid of no ghost Who you gonna call (Ghostbusters) If you're all alone, pick up the phone\nAnd call (Ghostbusters) I ain't afraid of no ghost I hear it likes the girls I ain't afraid of no ghost Yeah, yeah, yeah, yeah Who you gonna call (Ghostbusters) Mmm, if you've had dose of a freaky ghost, baby You'd better call (Ghostbusters), oh Let me tell you somethin' Bustin' makes me feel good I ain't afraid of no ghost I ain't afraid of no ghost\n\nDon't get caught alone, oh, no (Ghostbusters) When it comes through your door, unless you just want some more I think you better call (Ghostbusters), oh Who you gonna call (Ghostbusters) Who you gonna call (Ghostbusters) I think you better (Ghostbusters), ha-ha Who you gonna call (Ghostbusters), I can't hear you Who you gonna call (Ghostbusters) Louder (Ghostbusters) Who you gonna call (Ghostbusters) Who can you call (Ghostbusters)"
    },
    {
        title: 'Heartless',
        lyrics: "In the night I hear them talk The coldest story ever told Somewhere far along this road He lost his soul To a woman so heartless How could you be so heartless? Oh, how could you be so heartless? How could you be so Cold as the winter wind when it breeze, yo? Just remember that you talking to me though You need to watch the way you talking to me, yo I mean, after all the things that we been through I mean, after all the things we got into Ayo, I know of some things that you ain't told me Ayo, I did some things, but that's the old me And now you wanna get me back And you gonna show me So you walk around like you don't know me You got a new friend, well, I got homies But in the end it's still so lonely In the night I hear them talk The coldest story ever told Somewhere far along this road He lost his soul To a woman so heartless How could you be so heartless? Oh, how could you be so heartless? How could you be so Dr. Evil? You bringing out a side of me that I don't know I decided we wasn't gonna speak, so Why we up 3 AM on the phone? Why do she be so mad at me for? Homie, I don't know, she's hot and cold I won't stop, won't mess my groove up 'Cause I already know how this thing go You run and tell your friends that you're leavin' me They say that they don't see what you see in me You wait a couple of months, then you gon' see You'll never find nobody better than me In the night I hear them talk The coldest story ever told Somewhere far along this road He lost his soul To a woman so heartless How could you be so heartless? Oh, how could you be so heartless? Talk and talk and talk and talk Baby, let's just knock it off They don't know what we been through They don't know about me and you So I got something new to see And you just gonna keep hating me And we just gonna be enemies I know you can't believe I could just leave it wrong And you can't make it right I'm gonna take off tonight into the night In the night I hear them talk The coldest story ever told Somewhere far along this road He lost his soul To a woman so heartless How could you be so heartless? Oh, how could you be so heartless?"
    },
    {
        title: 'Numb',
        lyrics: "I'm tired of being what you want me to be Feeling so faithless, lost under the surface I don't know what you're expecting of me Put under the pressure Of walking in your shoes (Caught in the undertow, just caught in the undertow) Every step that I take is another mistake to you (Caught in the undertow, just caught in the undertow) I've become so numb I can't feel you there Become so tired So much more aware I'm becoming this All I want to do\nIs be more like me\nAnd be less like you Can't you see that you're smothering me Holding too tightly Afraid to lose control 'Cause everything that you thought I would be Has fallen apart right in front of you (Caught in the undertow, just caught in the undertow) Every step that I take is another mistake to you (Caught in the undertow, just caught in the undertow) And every second I waste is more than I can take I've become so numb I can't feel you there Become so tired So much more aware I'm becoming this All I want to do Is be more like me And be less like you And I know I may end up failing too But I know You were just like me With someone disappointed in you I've become so numb I can't feel you there I'm Become so tired So much more aware\nI'm becoming this All I want to do Is be more like me And be less like you I've become so numb I can't feel you there (I'm tired of being what you want me to be) I've become so numb I can't feel you there (I'm tired of being what you want me to be)"
    }
]

class Game extends React.Component {

    componentDidMount() {
        var intervalId = setInterval(this.startTimer, 1000);
        this.setState({intervalId: intervalId});
    }

    componentWillUnmount(){
        clearInterval(this.state.intervalId);
    }

    state = {
        song: '',
        songID: null,
        lyricText: '',
        wpm: 0,
        startTimer: 10,
        intervalId: null,
        gameTimer: 0,
        completed: 0

    }

    handleChange = (event) => {
        this.setState({lyricText: songs[event.target.value-1].lyrics, song: event.target.value});
    }

    startTimer = () => {
        this.setState({startTimer: this.state.startTimer - 1});
        if(this.state.startTimer === 0){
            clearInterval(this.state.intervalId);
            var intervalId = setInterval(this.gameTimer, 1000);
            this.setState({intervalId: intervalId});
        }
    }
    gameTimer = () => {
        this.setState({gameTimer: this.state.gameTimer + 1});
        if(this.state.completed/this.state.lyricText.length === 1){
            clearInterval(this.state.intervalId);
        }
    }

    setCompleted = () => {
        this.setState({completed: this.state.completed + 1});
    }

    getWpm = (value) => {
        this.setState({wpm: value});
        
    }

    LinearProgressWithLabel(props) {
        return (
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <LinearProgress color='secondary' variant="determinate" {...props} style={{height: '10px', borderRadius: '15px', width: '100%'}}/>
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${Math.round(
                props.value,
              )}%`}</Typography>
            </Box>
          </Box>
        );
      }

    render() {

        return(
            <div style={{position: 'relative', backgroundColor: 'lightgrey', height: '100%', width: '400px', textAlign: 'center', fontFamily: 'Oswald'}}>
                
                <h3 style={{marginBottom: '20px'}}>lyrics typing tutor</h3>
                <p style={{textAlign: 'left', padding: '0', margin: '0', marginLeft: '20px', fontSize: '18px'}}>artist: kanye west</p>
                <p style={{textAlign: 'left', padding: '0', margin: '0', marginLeft: '20px', fontSize: '18px'}}>Song: {songs[1].title}</p>
                
                <LyricWindow lyrics={songs[1].lyrics} wpm={this.getWpm} startTimer={this.state.startTimer} gameTimer={this.state.gameTimer} progress={this.setCompleted}/>
                <p style={{textAlign: 'left', marginLeft: '20px', marginTop: '20px', fontSize: '18px'}}>to begin start typing</p>
                <p style={{textAlign: 'left', marginLeft: '20px', fontSize: '18px'}}>beware of cap lock</p>
                <p style={{textAlign: 'left', marginLeft: '20px', fontSize: '18px'}}>have fun!!</p>

                <div style={{position: 'absolute', right: '20px', top: '80px'}}>
                    <p style={{padding: '0', margin: '0', fontSize: '18px'}}>words per minute</p>
                    {this.state.wpm}

                </div>
                <Tooltip title="credits: abdi, leo, mike" style={{position: 'absolute', right: '10px', bottom: '0'}}>
                    <p>credits</p>
                </Tooltip>
                
                
            </div>
        )
    }
}

export default Game;