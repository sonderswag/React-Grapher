/* global Plotly */
import React, {Component} from 'react';
import TraceService from '../TraceService'
import {Button } from 'react-bootstrap';
import * as colors from '../../colors'
import * as calculate from './calculations'
import {Route, Switch } from 'react-router-dom';
import UndoButton from './UndoButton'

import Point from './Point'
import Circle from './Circle'
import Line from './Line'
import Rectangle from './Rectangle'
import RectanglePolar from './RectanglePolar'
import CircleSpherePolar from './CircleSpherePolar'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions/index'


const styles = {
  button: {
    margin: '10px',
    fontSize: '20px',
    marginTop:'20px',
    color:'white',
    backgroundColor: colors.blue,
    display:'flex'
  },
  selector: {
    width: '150px',
    fontSize:'15px',
  }
}


class TraceSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selected: "",
      editTrace: {},
      newTraceMessage: {}
    }
    this.handleChange = this.handleChange.bind(this);
  }

  //This function is meant to get attributes from children components
  //this should be passes to a collection component
  handleChange(message) {
    this.setState({newTraceMessage: message})
  }

  //This function is for creating a new trace

  addTrace() {
    TraceService.sendTrace(this.state.newTraceMessage, (res) => {
      Plotly.addTraces('plot',Object.assign(calculate.extractPoints(res.data.points),
      {type:'scatter3d', mode:'markers', name:res.data.id}))
      this.props.pushUndolist({action:'add',id:res.data.id, data:this.state.newTraceMessage})
      this.props.clearRedolist();
    })
  }

  componentDidUpdate() {
    // console.log(this.state.newTraceMessage)
  }


  render() {
    return (
      <div className="Content">
        { /* This route switcher determines which collection content will be loaded
            These Components are simply different forms and don't really do much*/}
        <Switch>
          <Route exact path='/traceSelection/point' render={() => (
            <Point handleParamsChange={this.handleChange} />
          )} />
          <Route exact path='/traceSelection/line' render={() => (
            <Line handleParamsChange={this.handleChange}/>
          )} />
          <Route exact path='/traceSelection/circle' render={() => (
            <Circle handleParamsChange={this.handleChange} />
          )}/>
          <Route exact path='/traceSelection/rectangle' render={() => (
            <Rectangle handleParamsChange={this.handleChange} />
          )}/>
          <Route exact path='/traceSelection/rectangle_polar' render={() => (
            <RectanglePolar handleParamsChange={this.handleChange} />
          )}/>
          <Route exact path='/traceSelection/circle_polar' render={() => (
            <CircleSpherePolar type='circle_polar' handleParamsChange={this.handleChange} />
          )}/>
          <Route exact path='/traceSelection/sphere' render={() => (
            <CircleSpherePolar type='sphere' handleParamsChange={this.handleChange} />
          )}/>
        </Switch>
        <div style={{display:'flex', flexDirection:'row'}}>
          <Button style= {styles.button} onClick={() => {this.addTrace()}} >
            Add Trace
          </Button>
          { /* Instance of the undo redo button*/}
          <UndoButton />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return Object.assign({},state)
}

function mapDispatchToProps(dispatch) {
  return Object.assign({dispatch:dispatch},bindActionCreators(ActionCreators, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(TraceSelection);
