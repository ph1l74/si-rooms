import React, { useEffect, useState } from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './App.css';
import { Provider } from "react-redux";
import { createStore } from 'redux';
import rootReducer from './Reducers';
import { CookiesProvider } from "react-cookie";
import MainPage from './Components/MainPage';

const store = createStore(rootReducer, { user: {name: null, id: null} }
  + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


function App() {

  return (
    <Provider store={store}>
      <CookiesProvider>
        <MainPage></MainPage>
      </CookiesProvider>
    </Provider>

  );
}

export default App;
