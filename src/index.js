import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import { commandStreamReducer } from './store';
import CortexProvider from './components/cortexProvider';

const store = createStore(commandStreamReducer);

ReactDOM.render(
  <Provider store={store}>
    {/* Preferable to embed Cortex Client as Parent node in React Tree. */}
    <CortexProvider/> 
  </Provider>,
  document.getElementById('root')
);
