/* global Plotly */
// Plot.js
import React from 'react';
import TraceService from '../TraceService';


import * as calculations from '../TraceSelection/calculations'
import '../../index.css'



function resize() {
  var d3 = Plotly.d3;
  // var WIDTH_IN_PERCENT_OF_PARENT = ;
  // console.log(WIDTH_IN_PERCENT_OF_PARENT)
  var gd3 = d3.select('#plot')
  var gd = gd3.node();
  window.onresize = function() {
             Plotly.Plots.resize(gd);
         };

}

class D3Plot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }

    this.updateCallback = this.updateCallback.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  updateCallback(err,list) {
      if (err) {
        console.log(err);
        return
      }

      var traceList = Object.keys(list).map((key) => {
        return Object.assign(calculations.extractPoints(list[key].points),{type:'scatter3d', mode:'markers', name:key})
      })

      this.drawPlot(traceList);
    }

  componentWillMount() {
    //get the 3d points turn dataPoints: [{x:1,y:1,z:1},{x:2,y:2,z:2}] => {x: [1,2], y:[1,2], z:[1,2]}
    TraceService.getList(this.updateCallback)


  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    resize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
  this.forceUpdate()
}



  drawPlot = (traceList) => {
      // console.log('trace',this.state.traces)
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
      // document.getElementById('plot').on('plotly_click', this.props.onPlotClick);
    }


  render() {
    return (

          <div style={{marginTop: '-9px', width:window.innerWidth-190, height:(window.innerWidth-180)*.36}} id="plot"></div>


    );
  }
}

// <button onClick={() => {Plotly.addTraces('plot',{x:[0],y:[0],z:[0],type:'scatter3d', mode:'markers', name:'1'} ) }}> press me </button>


export default D3Plot;
