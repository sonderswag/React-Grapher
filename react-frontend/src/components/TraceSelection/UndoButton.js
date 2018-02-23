/* global Plotly */
import React, {Component} from 'react';
import {Button } from 'react-bootstrap';
import TraceService from '../TraceService'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions/index'

import * as colors from '../../colors'
import * as calculate from './calculations'
const styles = {

  button: {
    margin: '10px',
    marginTop: '20px',
    fontSize: '20px',
    color:'white',
    backgroundColor: colors.blue,
  }
}

class UndoButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redoList: []
    }
    this.undo = this.undo.bind(this);
  }

  handleAction = (Item) => {
    console.log(Item)
    var traceIndex = null
    var counterItem = Object.assign({},Item) //need to do a deep copy
    if (Item.action === 'add' || Item.action==='edit' ) {
      var plotDiv = document.getElementById('plot');
      // console.log(plotDiv)
      for ( var i = 0 ; i< plotDiv.data.length ; ++i) {
        if (plotDiv.data[i].name === Item.id) {
          traceIndex = i
          break
        }
      }
    }
    //switch on the action that was performed, and perform the coutner action
    //Will modify counter item to counteract whatever action is taken
    switch (Item.action) {
      case 'add': //something was added, so counter action is to delete
        TraceService.deleteTrace(Item.id, (err,res) => {
            Plotly.deleteTraces('plot',[traceIndex])
            counterItem.action = 'delete'  //change to counter action
        })
        break;
      case 'delete': //something was deleted. so counter action is to add
        TraceService.sendTrace(Item.data, (res) => {
          Plotly.addTraces('plot',Object.assign(calculate.extractPoints(res.data.points),
          {type:'scatter3d', mode:'markers', name:res.data.id}))
          counterItem.action = 'add' //change to counter action
          counterItem.id = res.data.id //change the id to proper one
        })
        break;
      case 'edit': //in order to do the redo need to capture the current values params
      TraceService.getTrace(Item.id,(err,res) => {
        if (err) {
          return
        }
        counterItem.data = {type:res.type, params:res.params}
        TraceService.updateTrace(Item.id, Item.data, (err,res) => {
          // console.log('res',res)
          Plotly.deleteTraces('plot',[traceIndex])
          Plotly.addTraces('plot',Object.assign(calculate.extractPoints(res.points),
          {type:'scatter3d', mode:'markers', name:res.id}))
        })
      })

        break;
      default:
    }

    return counterItem;
  }


  undo() {

    //get the last element on the undoList
    if(this.props.UndoList.length === 0) {
      return
    }

    //handle action
    var redoItem = this.handleAction(this.props.UndoList.slice(-1)[0])
    //add to redo list
    this.props.pushRedolist(redoItem)

    this.props.popUndolist()

  }

  redo = () => {
    if (this.props.RedoList.length === 0) {
      return
    }

    //handle action
    var undoItem = this.handleAction(this.props.RedoList.slice(-1)[0])
    //add to undo list
    this.props.pushUndolist(undoItem)
    //remove from redoList
    this.props.popRedolist()

  }


  render() {
    return (
      <div>
          <Button style= {styles.button} onClick={() => {this.undo()}} >
            Undo 
          </Button>
          <Button style= {styles.button} onClick={() => {this.redo()}} >
            Redo
          </Button>
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


export default connect(mapStateToProps, mapDispatchToProps)(UndoButton);
