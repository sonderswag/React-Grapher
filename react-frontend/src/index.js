import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';

import {Provider} from 'react-redux';
import { createStore } from 'redux'
import reducers from './reducers'
import devToolsEnhancer from 'remote-redux-devtools';

import App from './components/App'
import D3Plot from './components/Plot/D3Plot'
import Sidebar from './components/Sidebar/Sidebar'
let store = createStore(reducers,devToolsEnhancer({ realtime: true }))

//Only using redux for undo / redo feature right now
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div style={{overflow:'auto'}}>
          { /* Plotting copmonent that positions and mounts the 3d graph */}
          <D3Plot />
          { /* this give the menu bar along the left side of the screen along with the header */}
          <Sidebar />
          { /*this has all the content that will appear underneith the graph */}
          <App />
      </div>
    </BrowserRouter>
  </Provider>
  ,document.getElementById('root'));
registerServiceWorker();
