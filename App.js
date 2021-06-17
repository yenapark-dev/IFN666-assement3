import * as React from 'react';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { StocksProvider } from './contexts/StocksContext';
// import { SplashScreen } from "expo";
// import useLinking from "./navigation/useLinking";

const Stack = createStackNavigator();

export default function App(props) {

    return (
      <View style={styles.container}>
        <StocksProvider>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer theme={DarkTheme}>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={BottomTabNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </StocksProvider>
      </View>
    );
  }
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
