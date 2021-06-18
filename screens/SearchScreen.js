import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, Text, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { useStocksContext, addToWatchList } from '../contexts/StocksContext';
import { SearchBar } from 'react-native-elements';
import { scaleSize } from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

// FixMe: implement other components and functions used in SearchScreen here (don't just put all the JSX in SearchScreen below)

export default function SearchScreen({ navigation }) {
  const { ServerURL, addToWatchlist } = useStocksContext();
  const [search, setSearch] = useState("");
  const [state, setState] = useState([]);
  const [symbolList, setSymbolList] = useState([]);

  const getSymbolList = async () => {
    try {
      let res = await fetch(ServerURL + "/symbol/list");
      let data = await res.json();

      return data.Symbol.map((stock) => ({
        symbol: stock.Symbol,
        name: stock.CompanyName,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStock = async () => {
    try {
      setState(await getSymbolList());
      setSymbolList(await getSymbolList());
    } catch (error) {
      console.log(error);
    }
  }

  const filteredStock = (search) => {
    
    setSearch(search);
    if (search !== "") {
      setState(symbolList.filter((element) =>
        element.symbol.toUpperCase().includes(search.toUpperCase()) ||
        element.name.toUpperCase().includes(search.toUpperCase())
      ));
    } else {
      setState(symbolList);
    }
  }

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View >
          <SearchBar
            placeholder="Search"
            onChangeText={filteredStock}
            value={search}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          {state.map((event) => {
            return (
              <TouchableOpacity key={event.symbol} onPress={() => { addToWatchlist(event.symbol); navigation.navigate("Stocks"); }}>
                <Text style={styles.symbolInSearch} > {event.symbol} </Text>
                <Text style={styles.compnayNameInSearch} >{event.name}</Text>
              </TouchableOpacity>);
          })}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 7,
    padding: 10,
  },

  scrollView: {
    marginLeft: '7%',
    width: '100%',
    marginTop: '1%',
  },

  symbolInSearch: {
    paddingHorizontal: scaleSize(5),
    paddingTop: scaleSize(15),
    color: "#fff",
    fontSize: scaleSize(20),
},

compnayNameInSearch: {
    paddingHorizontal: scaleSize(10),
    color: "#fff",
},
});