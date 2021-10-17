import React from 'react';
import { LogBox } from 'react-native';

import AppNavigator from './Navigation/appNavigator';


const App = () => { 
  LogBox.ignoreLogs(["Animated:","Warning:"]); 

  return  <AppNavigator />
};


export default App;