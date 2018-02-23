/* global Plotly */
import React, {Component} from 'react';
import TraceService from '../TraceService'
import {Button } from 'react-bootstrap';
import * as colors from '../../colors'
import * as calculate from '../TraceSelection/calculations'

import Point from '../TraceSelection/Point'
import Line from '../TraceSelection/Line'
import Circle from '../TraceSelection/Circle'
import CircleSpherePolar from '../TraceSelection/CircleSpherePolar'
import Rectangle from '../TraceSelection/Rectangle'
import RectanglePolar from '../TraceSelection/RectanglePolar'
import UndoButton from '../TraceSelection/UndoButton'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../../actions/index'


const styles = {
  inputLabel: {
    paddingRight:'5px',
    paddingTop:'5px',
    fontSize: '20px',
  },
  input: {
    fontSize:'20px',
    paddingLeft:'20px',
    height: '25px',
  },
  title: {
    fontSize: '15px'
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  button: {
    marginLeft: '10px',
    fontSize: '20px',
    marginTop:'15px',
    color:'white',
    backgroundColor: colors.blue,
  },
  selector: {
    width: '150px',
    fontSize:'15px',
  }
}


class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      traces: [],
      newTraceMessage: {},
      editTrace: {},
      selected: '',
    }
  }

  handleParamsChange = (message) => {
    this.setState({newTraceMessage: message})
  }

  handleChange = (event) => {
    this.setState({selected: event.target.value})
    TraceService.getTrace(event.target.value,(err, res) => {
      if (err) {
        console.log(err)
        return
      }
    this.setState({editTrace: res})
  })

  }

  getIds = () => {
    TraceService.getTraceIds((err,res) => {
      // console.log(res)
      if (res[0] === '.DS_Store') {
        this.setState({traces:res.slice(1)})
      }
      else {
        this.setState({traces:res})
      }
    })
  }

  editTraceRender = () => {
    // console.log(this.state.editTrace)
    switch (this.state.editTrace.type) {
      case 'point':
        return <Point handleParamsChange={this.handleParamsChange}
          params={this.state.editTrace.params}/>
        break;
      case 'circle':
        return <Circle handleParamsChange={this.handleParamsChange}
          params={this.state.editTrace.params}/>
        break;
      case 'circle_polar':
        return <CircleSpherePolar type='circle_polar' handleParamsChange={this.handleParamsChange}
          params={this.state.editTrace.params}/>
        break;
      case 'sphere':
        return <CircleSpherePolar type='circle_polar' handleParamsChange={this.handleParamsChange}
          params={this.state.editTrace.params}/>
        break;
      case 'line':
        return <Line handleParamsChange={this.handleParamsChange}
          params={this.state.editTrace.params}/>
        break;
      case 'rectangle':
        return <Rectangle handleParamsChange={this.handleParamsChange}
          params={this.state.editTrace.params}/>
        break;
      case 'rectangle_polar':
        return <RectanglePolar handleParamsChange={this.handleParamsChange}
          params={this.state.editTrace.params}/>
        break;
      default:
        return <div />
    }
  }

  editTrace = () => {
    var plotDiv = document.getElementById('plot');
    var traceIndex = null
    for ( var i = 0 ; i<plotDiv.data.length ; ++i) {
      if (plotDiv.data[i].name === this.state.selected) {
        traceIndex = i
        break
      }
    }

    TraceService.updateTrace(this.state.selected, this.state.newTraceMessage, (err,res) => {
      // console.log('res',res)
      Plotly.deleteTraces('plot',[traceIndex])
      Plotly.addTraces('plot',Object.assign(calculate.extractPoints(res.points),
      {type:'scatter3d', mode:'markers', name:res.id}))
      //need the data to be the data of the change => that is the data that was downloaded
      this.props.pushUndolist({action:'edit',id:this.state.selected,data:this.state.editTrace})
      this.props.clearRedolist();
    })
  }

  deleteTrace = () => {
    var plotDiv = document.getElementById('plot');
    var traceIndex = null
    for ( var i = 0 ; i < plotDiv.data.length ; ++i) {
      if (plotDiv.data[i].name === this.state.selected) {
        traceIndex = i
        break
      }
    }

    TraceService.deleteTrace(this.state.selected, (err,res) => {
      Plotly.deleteTraces('plot',[traceIndex])
      this.props.pushUndolist({action:'delete',data:this.state.editTrace})
      this.props.clearRedolist();
      this.setState({editTrace: {}})
      this.getIds();

    })

  }

  componentWillMount() {
    this.getIds();
  }



  render() {
    return (
      <div className="Content">
        <div style={{display:'flex', flexDirection:'row', padding:'10px'}}>
            <span style={styles.inputLabel}>Edit Collection </span>
            <select onChange={this.handleChange} style={styles.selector}>
              <option value="" selected disabled hidden>Trace Name</option>
              {this.state.traces.map((trace) => {
                return <option key={trace} value={trace}> {trace} </option>
              })}
            </select>

        </div>
        {this.editTraceRender()}
        {this.state.editTrace.type !== undefined ?
        <Button style= {styles.button} onClick={() => {this.editTrace()}} >
          Update Trace
        </Button>
        :
        <div />
        }

        {this.state.editTrace.type !== undefined ?
        <Button style= {styles.button} onClick={() => {this.deleteTrace()}} >
          Delete Trace
        </Button>
        :
        <div />
        }

        <UndoButton />
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
