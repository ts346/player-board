
import "../css/BearFaucetWidget.css";
import axios from 'axios';
import React from "react";
import { Tooltip } from "@material-ui/core";
import bear from "../../assets/bear.png"
import fox from "../../assets/metamask_fox.png"
import waves from "../../assets/waves.gif"



declare let web3: any
declare let ethereum: any
declare let Web3: any



export const BearFaucetWidget = () => {
    let account: string = "";
  
    const connectMetamask = async () => {
      try {
  
        if (ethereum) {
  
          console.log('ETH IS ', ethereum)
          web3 = new Web3(ethereum)
          try {
            await ethereum.enable()
  
            web3.eth.getAccounts((err: string, accounts: string[]) => {
              if (err) console.log(err)
              else if (!accounts.length) alert('No Metamask accounts found')
              else {
                account = accounts[0];
                
              }
            })
          } catch (e) {
            console.error('Error, ', e)
          }
        }
      } catch (e) {
        console.log('error ', e)
      }
    }
  
    const send_tokens = async () => {
      if (account !== "") {
        const apiAddress = "https://adventure-eth-api.herokuapp.com/transfer-token";
            axios.post(apiAddress, {
              ticker: "BEAR",
              amount: 100,
              to: account,
              hookUrl: "done",
            })
              .then(function (response) {
                  console.log(response);
              })
              .catch(function (error) {
                  console.log(error);
              });
      }
      else window.alert("Connect with metamask first!")
    }
    
    
    return <div className="faucet-container">
            <div className='header_faucet'>
              <img className="topleft_faucet" src={bear} style={{width: '30px', height: '30px'}} alt="bear"></img>
              <img className="topright_faucet" onClick={connectMetamask} src={fox} style={{width: '30px', height: '30px'}} alt="fox"></img>
              <h1> 100 rawr tokens </h1>
              <img className="gif_faucet" src={waves} style={{width: '150px', height: '150px'}} alt="gif"></img>
              <button className="button_faucet" onClick={send_tokens} >request rawr tokens</button>
              <Tooltip title="version 0.1, production: joão, leo, mike">
              <div className='credits' >credits</div>
              </Tooltip>
              </div>
            </div>
    
  }