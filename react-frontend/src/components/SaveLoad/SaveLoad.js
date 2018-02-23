/* global Plotly */
import React, {Component} from 'react';
import FileService from '../FileService'
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import * as colors from '../../colors'
import * as calculate from '../TraceSelection/calculations'
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
    margin: '10px',
    fontSize: '20px',
    marginTop:'0px',
    color:'white',
    backgroundColor: colors.blue,
    display:'flex',
    order:'2',
  },
  selector: {
    width: '168px',
    fontSize:'15px',
  }
}


class Save_Load extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loadFiles: [],
      selected: "",
    }
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({selected:event.target.value})
  }

  componentWillMount() {
    FileService.getSavedCollectionList((err,res) => {
      console.log(res)
      this.setState({loadFiles: res})
    })
  }


  save() {
    if (this.state.name.length > 1) {
      FileService.saveCollection(this.state.name,(err) => {
        if (err) {
          console.log(err)
          return
        }
        FileService.getSavedCollectionList((err,res) => {
          console.log(res)
          this.setState({loadFiles: res})
        })
      })

    }
  }


  load = () => {
    FileService.loadCollection(this.state.selected, (err,res) => {
      if(err) {
        console.log(err)
        return
      }
      console.log(res)

      var traceList = Object.keys(res).map((key) => {
        return Object.assign(calculate.extractPoints(res[key].points),
        {type:'scatter3d', mode:'markers', name:key})
      })
      this.drawPlot(traceList);

    })
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

    deleteFile = () => {
      FileService.deleteCollection(this.state.selected,(err,res) => {
        if (err) return;
        FileService.getSavedCollectionList((err,res) => {
          console.log(res)
          this.setState({loadFiles: res})
        })
      })
    }

  render() {
    return (
      <div className="Content">

        <p style={styles.title}>Save Current Collection </p>

        <div style={{display:'flex', flexDirection:'column'}}>
          <Form style={{display:'flex', flexDirection:'row'}}>
            <FormGroup style={{display:'flex', order:'0'}} controlId='Save'>
              <ControlLabel style={styles.inputLabel} > File Name </ControlLabel>
              <FormControl
              style={styles.input}
              type="text"
              value={this.state.name}
              onChange={(event) => {this.setState({name: event.target.value})}}
              />
            </FormGroup>
            <Button style= {styles.button} onClick={() => {this.save()}} >
              Save
            </Button>
          </Form>

          <div style={{display:'flex', flexDirection:'row'}}>

              <span style={styles.inputLabel}>Load A Collection </span>
              <select onChange={this.handleChange} style={styles.selector}>
                {this.state.loadFiles.map((file) => {
                  return <option value={file}> {file} </option>
                })}
              </select>

              <Button style= {styles.button} onClick={this.load} >
                Load
              </Button>

              <Button style= {styles.button} onClick={this.deleteFile} >
                Delete
              </Button>
          </div>
        </div>
      </div>
    )
  }
}


export default Save_Load;
