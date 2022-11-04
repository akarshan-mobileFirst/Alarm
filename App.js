 import React from 'react';
 import { LogBox } from 'react-native';
 import AlarmScreen from './src/screens/AlarmScreen';

 LogBox.ignoreAllLogs();
 
 const App = () => <AlarmScreen />;
 
 export default App;
 