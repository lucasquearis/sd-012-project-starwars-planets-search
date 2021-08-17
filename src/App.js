import React from 'react';
import Provider from './context/Provider';
import Main from './pages/Main';
import './App.css';

function App() {
  return (
    <Provider>
      <Main />
    </Provider>
  );
}

export default App;
