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

  function addToWatchlist(newSymbol) {
    //FixMe: add the new symbol to the watchlist, save it in useStockContext state and persist to AsyncStorage
    
    let result =true;
    state.map((symbol)=>{
      if(symbol.newSymbol === newSymbol){
       result = false;
      }
    })

    if(result){
      setState((x) => {
        x.push({newSymbol});
        return [...new Set(x)];
      });
    }
    AsyncStorage.setItem("@WatchList", JSON.stringify(state));
  }

  //
  let _retrieveWatchList = async () => {
    try {
      const value = await AsyncStorage.getItem("@WatchList");
      if (value !== null) {
        // We have data!!
        setState(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
//   useEffect(() => {
 
//     _retrieveWatchList();

// }, [state.length]);

  useEffect(() => {
    setFlag(true);
    if(flag === false){
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
