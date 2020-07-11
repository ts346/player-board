
import "../css/TransferWidget.css";
import React, { useState } from "react";
import { Tooltip } from "@material-ui/core";
import {ApiRequests} from "./ApiRequests";
import fox from "../../assets/metamask_fox.png"
import ship from "../../assets/ship.gif"
declare let web3: any
declare let ethereum: any
declare let Web3: any


export const TransferWidget = () => {

    let [account,setAccount] = useState("not connected");
  
    let [to,setTo] = useState("");
  
    let [aweb3,setweb3] : any = useState("");
  
  
  
  
    const connectMetamask = async () => {
        try {
    
          if (ethereum) {
    
            console.log('ETH IS ', ethereum)
            web3 = new Web3(ethereum)
            try {
              await ethereum.enable()
    
              web3.eth.getAccounts((err: string, accounts: string[]) => {
                if (err) return err;
                else if (!accounts.length) {alert('No Metamask accounts found'); return "error";}
                else {
                    setAccount(accounts[0]);
                    setweb3(web3);
                    
                }
              })
            } catch (e) {
              console.error('Error, ', e)
              return "error";
            }
          }
        } catch (e) {
          console.log('error ', e)
          return "error";
        }
      }


    const make_transfer = () => {
        ApiRequests.transfer(account,to,"10","BEAR",aweb3);
    }
  

    const handleChange = (event:any) => {
      setTo(event.target.value);
    }
  
  
      return <div className='transfer-container'>
      
      <div className='header_transfer'>
  
      <img className="topright_transfer" onClick={connectMetamask} src={fox} style={{width: '30px', height: '30px'}} alt="fox"></img>
      <h1> token shipper </h1>
      <p>connected with: {account}</p>
      <img className="gif_transfer" src={ship} style={{width: '150px', height: '150px'}} alt="ship"></img>
      <label className="text_box-transfer">
      <input type="text" name="to" value={to} onChange={handleChange}/>
    </label>
      <button className="button_transfer" onClick={make_transfer} >transfer 10 rawr tokens</button>
      <Tooltip title="version 0.1, production: joão, leo, mike">
      <div className='credits_transfer' >credits</div>
      </Tooltip>
      
    </div>
    </div>
  
  }