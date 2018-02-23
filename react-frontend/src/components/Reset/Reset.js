/* global Plotly */
import React, {Component} from 'react';
import TraceService from '../TraceService'
import * as calculate from '../TraceSelection/calculations'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions/index'


class Reset extends Component {

  reset = () => {

        //delete everything all traces in the backend
        TraceService.deleteAll((err,res) => {
          //get atleast the origin
          var traceList = Object.keys(res).map((key) => {
            return Object.assign(calculate.extractPoints(res[key].points),
            {type:'scatter3d', mode:'markers', name:key})
          })
          //redraw the plot
          Plotly.newPlot('plot', traceList , {
            margin: {
              t: 0, r: 0, l: 0, b:0
            },
            xaxis: {
              gridcolor: 'transparent'
            },
            showlegend: true,
            width: window.innerWidth - 400,
          }, {
            displayModeBar: false
          });
          //reset the undo and redo list
          this.props.clearRedolist()
          this.props.clearUndoList()
        })
  }

  render() {
    return (
      <button onClick={this.reset} style={{
        color:'#757575',
        fontSize:'16px',
        fontFamily: 'HelveticaNeue-Light',
        backgroundColor: 'Transparent',
        backgroundRepeat:'no-repeat',
        border: 'none',
        cursor: "pointer",
        overflow: 'hidden',
        outline: 'none',
        paddingLeft:'0px',
        paddingTop:'10px',
      }}>
        Reset All
      </button>
    )
  }
}


const mapStateToProps = state => {
  return Object.assign({},state)
}

function mapDispatchToProps(dispatch) {
  return Object.assign({dispatch:dispatch},bindActionCreators(ActionCreators, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
