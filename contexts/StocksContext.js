import React, { useState, useContext, useEffect } from "react";
import { AsyncStorage } from "react-native";

const StocksContext = React.createContext();

export const StocksProvider = ({ children }) => {
  const [state, setState] = useState([]);
  
  return (
    <StocksContext.Provider value={[state, setState]}>
      {children}
    </StocksContext.Provider>
  );
};

export const useStocksContext = () => {
  const [state, setState] = useContext(StocksContext);
  const [flag, setFlag] = useState(false);
  // can put more code here

  function addToWatchlist(newSymbol) {
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    
    console.log("here");
    let result =true;
    state.map((symbol)=>{
      if(symbol.newSymbol===newSymbol){
       result = false;
      }
    })

    if(result){
      setState((x) => {
        x.push({newSymbol});
        return [...new Set(x)];
      });
    }
    
    // console.log(state);
    AsyncStorage.setItem("@WatchList", JSON.stringify(state));
  }

  //
  let _retrieveWatchList = async () => {
    try {
      const value = await AsyncStorage.getItem("@WatchList");
      // console.log("Retrieved LOG");
      if (value !== null) {
        // We have data!!
        setState(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  
  useEffect(() => {
    setFlag(true);
    if(flag===false){
          _retrieveWatchList();
    }else{
      setFlag(false)
    }
    // FixMe: Retrieve watchlist from persistent storage
  }, []);

  return { ServerURL: 'http://172.22.30.58:3001/api', watchList: state,  addToWatchlist };
  // return { ServerURL: 'http://10.0.0.92:3001/api', watchList: state,  addToWatchlist };
  // return { ServerURL: 'http://172.19.27.64:3001/api', watchList: state,  addToWatchlist };
};
