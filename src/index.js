import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './components/menu';
import './styles/index.scss';
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import { commandStreamReducer } from './store';

const store = createStore(commandStreamReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Menu />
    </React.Fragment>
  </Provider>,
  document.getElementById('root')
);
