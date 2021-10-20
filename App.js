import React from 'react';
import { LogBox } from 'react-native';

import AppNavigator from './Navigation/appNavigator';


const App = () => { 
  LogBox.ignoreAllLogs(); 

  return  <AppNavigator />
};


export default App;