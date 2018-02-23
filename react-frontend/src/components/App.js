import React from 'react';
import '../index.css'

import {Route, Switch } from 'react-router-dom';

import Home from './Home/Home'
import TraceSelection from './TraceSelection/TraceSelection'
import Save_Load from './SaveLoad/SaveLoad'
import Edit from './Edit/Edit'



class App extends React.Component {


  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
 updateWindowDimensions = () => {
  this.forceUpdate()
  }


  render() {
    return (
        <div className='Content-Box' style={{top:(50+(window.innerWidth-180)*.36)+'px'}}>
          <div className="Content" style={{height:(window.innerHeight-window.innerWidth*.3)+'px', width:(window.innerWidth-180)+'px'}}>
            <Switch>
              { /*Currently Home */}
              <Route exact path='/' component={Home} />
              { /* trace selection handles all the pages related to adding traces to the collection */}
              <Route path='/traceSelection' component={TraceSelection} />
              { /* component for handling all the file interface */}
              <Route exact path='/save_load' component={Save_Load} />
              { /* Component for editing the current collection */}
              <Route path='/edit' component={Edit} />
            </Switch>
          </div>
        </div>
    );
  }
}


export default App;
