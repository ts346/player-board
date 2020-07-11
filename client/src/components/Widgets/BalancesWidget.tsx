import "../css/Widget.css";
import "../css/BalancesWidget.css";

import React, {useState } from "react";
import { Tooltip } from "@material-ui/core";
import {ApiRequests} from "./ApiRequests";
import { JsonToTable } from "react-json-to-table";

import leo from "../../assets/leo.png"
import mike from "../../assets/mike.png"
import joao from "../../assets/joao.jpeg"
import not_connected from "../../assets/connect.png"

const web3 = require("web3");




export const BalancesWidget = () => {


    //add new tokens here (and then in the api)
    const [tokens,setTokens] = useState([
                                        {ticker: "BEAR", amount: "0"}, 
                                        {ticker: "GRATITUDE" , amount: "0"}
                                        ]);

    const [account, set_account] = useState("");

    const [images] = useState([mike, leo, joao]);

    const [profile,set_profile] = useState(not_connected);                                
    
    


    const live_update = () => {
      setRandomProfile();
      setInterval (async function () {await ranking()},5000);
    }

    async function ranking() {


        if (web3.utils.isAddress(account)) {
          
          let new_tokens : {ticker : string, amount : string}[] = new Array(0);

          for (let i = 0; i < tokens.length ; i++) {

            let _balance : string = await ApiRequests.get_balance(account,tokens[i].ticker);

            var token : {ticker : string, amount : string} = {ticker : tokens[i].ticker, amount : _balance }
            new_tokens.push(token);
          }
          setTokens(new_tokens);
        }       
    }


    const handleChange = (event:any) => {
      set_account(event.target.value.toString());
    }

    const setRandomProfile = () => {
      const random = Math.floor(Math.random() * 3);
      set_profile(images[random]);
    }


      return <div className='balances-container'>
                <div className='header_balances'>
                  enter account:
                <label className="text_box_balances">
                    <input type="text" name="account" value={account} onChange={handleChange}/>
                </label>
                <button className="check_button" onClick={live_update} >check </button>
                <img src={profile} className="profile_image" alt="random profile pic"></img>
                <div className="table">
                  <JsonToTable json={tokens} />
                </div>
                
                </div>
                <Tooltip title="version 0.1, production: joão, leo, mike">
                <div className='credits_balances' >credits</div>
                </Tooltip>
                </div>
}


