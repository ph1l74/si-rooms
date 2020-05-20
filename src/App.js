import React from 'react';
import 'react-bulma-components/dist/react-bulma-components.min.css';
import './App.css';
import { Provider } from "react-redux";
import { createStore } from 'redux';
import rootReducer from './Reducers';
import { CookiesProvider } from "react-cookie";
import MainPage from './Components/MainPage';

const initState =
{
  user:
  {
    name: null,
    id: null
  },
  rooms: [],
  activeGame:
  {
    room: null,
    conStatus: null
  }
}

const store = createStore(rootReducer, initState
  // + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


function App() {

  return (
    <Provider store={store}>
      <CookiesProvider>
        <MainPage />
      </CookiesProvider>
    </Provider>

  );
}

export default App;
