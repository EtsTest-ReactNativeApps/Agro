import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from "redux-thunk"
import AppNavigator from './Navigation/appNavigator';
import authReducer from "./store/reducers/auth"

const App = () => { 
  LogBox.ignoreAllLogs(); 
  const rootReducer=combineReducers({
    auths:authReducer,
  });
  const store=createStore(rootReducer,applyMiddleware(ReduxThunk));

  return  <Provider store={store}><AppNavigator /></Provider>
};


export default App;