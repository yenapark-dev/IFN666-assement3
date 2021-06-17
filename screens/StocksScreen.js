import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useStocksContext } from '../contexts/StocksContext';
import { scaleSize } from '../constants/Layout';
import StockTable from '../components/StockTable';
import { TouchableOpacity } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Swiper from 'react-native-swiper';
import StockGraph from '../components/StockGraph';


export default function StocksScreen({ route }) {
  const { ServerURL, watchList } = useStocksContext();
  const [info, setInfo] = useState([]);
  // const [selectedStock, setSelectedStock] = useState(watchList);
  const [stock, setStock] = useState({});
  const [flag, setFlag] = useState(false);
  const [pressed, setPressed] = useState(false);

  var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }

  const getPrice = async (symbol) => {
    try {
      let res = await fetch(ServerURL + "/stock", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ symbol: symbol })
      });
      let data = await res.json();
      return data.stock;

    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchPrice = async (symbol) => {
    try {
      let data = await getPrice(symbol);
      console.log(data);
      setInfo((x) => {
        x.push(data);
        return [...x];
      });
      console.log(info);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("useEffect");
    // console.log(watchList);
    setFlag(true);
    if (flag === false) {
      setInfo([]);
      watchList.map((stock) => {
        // console.log(stock);
        fetchPrice(stock.newSymbol);
        // console.log("====");
      })
    } else {
      setFlag(false)
    }

  }, [watchList]);
  console.log(stock);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {info.map((stock) => {

          return (
            <TouchableOpacity key={stock.symbol} onPress={() => {setStock(stock); setPressed(true);}} style={styles.row}>
              <Text style={styles.item}>{stock.symbol}    {stock.price}     </Text>
              {stock.changed<0 && <Text style={styles.negative}>{stock.changed}</Text>}
              {stock.changed>0 && <Text style={styles.positive}>{stock.changed}</Text>}
            </TouchableOpacity>

          );
        })}
      </ScrollView>
      {pressed && <Swiper showsPagination={false}>
        <View >
          <StockTable table={stock} />
        </View>
        <View>
          <StockGraph detail={stock.symbol}/>
        </View>
      </Swiper>
 }
 {!pressed && <Text style={styles.item}>Please select the stock. </Text>}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  scrollView: {
    marginLeft: '20%',
    width: '100%',
    marginTop: '3%',
height: '50%'
  },
  item: {
    fontSize: 15,
    height: 44,
    color: 'white',
  },
  negative: {
    fontSize: 15,
    height: 44,
    color: 'red',
  },  
  positive: {
    fontSize: 15,
    height: 44,
    color: 'green',
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  // table: {
  //   height: '30%',
  //   color: 'white',
  // }
});