import React from "react";

//import Leaderboard from "./Leaderboard";
import Game from "./game";
import io from "socket.io-client";
import CircularProgress from '@material-ui/core/CircularProgress';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      changeComponent: false, // just to load the game comp after the button is pressed
      loading: false,
      opponent: {},
      socketID: null,
      name: ""
    };
    this.socket = io.connect("https://shielded-brushlands-86263.herokuapp.com");
  }

  componentWillMount() {
    
    this.socket.on(
      "foo",
      function (data) {
        
        this.setState({ loading: data.loading, socketID: data.id }, function () {
          if (this.state.name !== null && !this.state.loading) {
            var temp = {};
            for(let i = 0; i < data.opponents.length; i++){
              temp[data.userIDs[data.opponents[i]]] = 0;
            }
            delete temp[this.state.name];
            this.setState({opponent: temp}, () =>{
            });
          }
        });
      }.bind(this)
    );

    
    }

  handleClick() {
    this.setState({ changeComponent: true }, function(){
      this.socket.emit("join", { player: this.state.name });
      
    }.bind(this));
    
    
  }

  handleChange = (events) => {
    this.setState({ name: events.target.value });
  };

  updateOpponent = (name, wpm) => {
    var temp = this.state.opponent;
    temp[name] = wpm;
    
    this.setState({opponent: temp});
  }

  resetGame = () => {
    this.setState({changeComponent: false});
  }

  render() {
    const changeComponent = this.state.changeComponent;
    
    if (changeComponent && !this.state.loading) {

      return <Game opponents={this.state.opponent} username={this.state.name} socket={this.socket} updateWPM={this.updateOpponent} resetGame={this.resetGame}/>;
    } else {
      return (
        <div
          style={{
            textAlign: "center",
            color: "black",
            cursor: "default", // get rid of the quad arrow cuser
            width: "400px", // take up the whole widget space
            height: "100%",
          }}
        >
          <p>Typing Challenge!</p>

          <div>
            <label htmlFor="username">Create Username: </label>
            <input
              placeholder="Enter a username"
              id="username"
              name="username"
              onChange={this.handleChange}
            />
            <button disabled={this.state.loading} onClick={this.handleClick}>Join Game</button>
            {
              this.state.loading ? 
              <CircularProgress/>
              :
              null
            }
            
          </div>
        </div>
      );
    }
  }
}
export default Login;
