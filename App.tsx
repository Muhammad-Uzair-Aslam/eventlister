import React from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import store from './src/store/Store';
const App: React.FC = () => {
  return (
    <Provider store={store}>
    <MainNavigator/>
    </Provider>
  );
};

export default App;

