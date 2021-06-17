import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { scaleSize } from '../constants/Layout';
 
export default function StockTable(props) {

    let state = {
      tableHead: [props.table.symbol], // set table head as an Symbol name
      tableColHead: [// set first columns' heading
        'Open', 'Close', 'Volume',
      ],
      tableColHead2: [// set second columns' heading
        'Low', 'High',
      ],
      tableData: [// set first columns' data
        [props.table.open],
        [props.table.price],
        [props.table.volume],
      ],
      tableData2: [// set second columns' data
        [props.table.low],
        [props.table.high],
      ]
    }
  console.log(props.table);
    return (
      <View>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#b5b5b5' }}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableColHead} textStyle={styles.text} />
            <Rows data={state.tableData} flexArr={[1, 1]} style={styles.row} textStyle={styles.text} />
            <Col data={state.tableColHead2} textStyle={styles.text} />
            <Rows data={state.tableData2} flexArr={[1, 1]} style={styles.row} textStyle={styles.text} />
          </TableWrapper>
        </Table>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: scaleSize(22)
    },
    wrapper: { flexDirection: 'row' },
    head: { height: scaleSize(40) },
    text: { margin: scaleSize(3), color: "white", textAlign: "center" }
  });