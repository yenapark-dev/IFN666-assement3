import React, { useState, useEffect } from 'react';
import { useStocksContext, addToWatchLis } from '../contexts/StocksContext';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

//import React Native chart Kit for different kind of Chart
import {
  LineChart,
} from 'react-native-chart-kit';
import { parse } from 'react-native-svg';

var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
}

const MyBezierLineChart = (props) => {

  const { ServerURL } = useStocksContext();
  const [state, setState] = useState([]);

  const getDetail = async () => {
    try {
      let res = await fetch(ServerURL + "/stock/graph", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ symbol: props.symbol })
      });
      let data = await res.json();
      if (typeof data.historical == "undefined") {
        return [0];

      } else {
        return data.historical.map((stock) => ({
          close: parseFloat(stock.close)
        }));
      }

    } catch (error) {
      console.log(error);
    }
  };

  const fetchDetail = async () => {
    try {
      setState(await getDetail());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDetail();
  }, [props.symbol]);

  let closeList = [0];

  // undefine no result instead of error
  if (state === 0) {
    // closeList.push(0);
  } else {
    closeList = [];
    state.map((close) => {
      closeList.push(parseFloat(close.close));
    })
  }
  console.log(closeList);
  return (
    <>
      <LineChart
        data={{

          datasets: [
            { data: closeList }, // Here is the problem.
          ],
        }}
        width={Dimensions.get('window').width - 16} // from react-native
        height={80}
        // yAxisLabel={''}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
};

const StockGraph = (props) => {

  return (

    <ScrollView>
      <View style={styles.container}>
        <View>
          <MyBezierLineChart symbol={props.detail} />
        </View>
      </View>
    </ScrollView>

  );
};

export default StockGraph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
