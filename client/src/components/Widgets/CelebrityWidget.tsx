import React, { useEffect, useState } from "react";
import axios from 'axios';
import clock from './images/clock.png';
declare const window: any;
//Celebrity Widget
//Celebrity Image
export const CelebrityWidget = () =>{
    //Image states
    const [optionValue, setOptionValue] = useState('kanye')
    const [itemIndex, setItemIndex] = useState(0)
    const items = [
      { label: "kanye",value: require('./images/Kanye.png')},
      { label: "lebron", value: require('./images/Lebron.png')},
      { label: "the rock", value: require('./images/Rock.png')},
    ];
    //Time state
    const [time, setTime] = useState("");
    //Token states
    const [accountU, setAccount] = useState(0x00);
    //Image functions
  const handleChange = (evt: { target: { value: any; }; }) => {
   const newValue = evt.target.value
   setOptionValue(newValue)
   const newItemIndex = items.findIndex(items => items.label === newValue)
   setItemIndex(newItemIndex)
  }
  //Time functions
  const getFormattedTime = () => {
    const newDate = new Date(Date.now());
  
    return `${newDate.getHours()}:
    ${newDate.getMinutes().toString().padStart(2, "0")}`;
  };
  //Token functions
  const getAccountName = async () => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0]
    setAccount(account);
  }
  const sendAPIRequest = () => {
    window.alert('A Gift For You'+'\n'+'\n'+'1 RAWR Token');
        var apiAddress;
        apiAddress = "https://adventure-eth-api.herokuapp.com/transfer-token";
        axios.post(apiAddress, {
            ticker: "BEAR",
            amount: 1,
            to: accountU,
            hookUrl: "done",
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
  }
  useEffect(() => {
    setInterval(() => {
      const newTime = getFormattedTime();
      setTime(newTime);
    }, 1000);
    getAccountName();
    setTimeout(sendAPIRequest, 1000);
  }, []);
    return (
      <div id="celebrity" className="default">
        <header>
          <img className="clock" src={clock} />
          <h1>{items[itemIndex].label} time</h1>
          <div className="dropdown">
            <select className="dropbutton" value={optionValue} onChange={handleChange}>
              <option value="kanye">Kanye</option>
              <option value="lebron">Lebron</option>
              <option value="the rock">The Rock</option>
            </select>
          </div>
        </header>
        <main>
          <img className="image" src={items[itemIndex].value} />
          <div className="time">
              The time is <div>{time}</div>
          </div>
          <div>
        </div>
        </main>
      </div>
  )
  }
