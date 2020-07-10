import axios from 'axios';

const aux_web3 = require("web3");


declare let web3: any
declare let ethereum: any
declare let Web3: any

 export class ApiRequests {


    static async get_balance( _user: string , _ticker: string) {
        const params = {
                      user: _user, 
                      ticker: _ticker
                      };
      
          const url ="balance";

      
          try {
              var balance : any = (await this.api_request(url,params));
              if (balance === undefined ) throw new Error("error api");
              else {
                return aux_web3.utils.fromWei(balance.toString(),"ether");
              }
      
          }
          catch(err) {
              console.log(err+"can't get balance");
              return "error";
          }
      }

        
    static async transfer(_from:string,_to:string,amount:string,ticker:string,aweb3:any) {
        
        try {
          if (aux_web3.utils.isAddress(_from) && aux_web3.utils.isAddress(_to)) {
            let _amount = aux_web3.utils.toWei(amount,"ether");
            const params = {from: _from, to: _to, amount: _amount, ticker: ticker};
    
            try {
              var transf : any = (await this.api_request("transfer",params));
    
              if (!transf ) throw new Error("error api");
              else {
                  await aweb3.eth.sendTransaction(transf, function(err:any, transactionHash:any) {
                    if (!err)
                      window.alert("transaction: " + transactionHash); 
                  });
                  }
    
              }  
            catch(err) {
              console.log(err+"transfer failed");
            }
          
        }
      }
        catch (e) {
          console.log('error ', e);
        }
      }
    
      
      
      static async api_request(url_end: string, params: object) {
        var url = 'https://myserverpool.herokuapp.com/'+url_end;
        var res;
        await axios.post(url,params)
                .then(function (response) {
                    res = response.data;
                })
                .catch(function (error) {
                  res = undefined;
                });
        
        return res;
      }
    
}


