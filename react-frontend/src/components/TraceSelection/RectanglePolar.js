import React, {Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import * as styles from './styles'

/*
zenith: clockwise rotation about the x-axis
azimuth: counter clockwise rotation about the z-axis
distance: distance from the origin to the
length: length of the rectangle in the rotated plane
width: width of the rectangle in the rotated plane
*/
class RectanglePolar extends Component {
  constructor(props) {
    super(props);
    this.condition = this.props.params !== undefined
    this.state = {
      zenith  : this.condition ? this.props.params.zenith   : 0,
      azimuth : this.condition ? this.props.params.azimuth  : 0,
      distance: this.condition ? this.props.params.distance : 0,
      length  : this.condition ? this.props.params.length   : 5,
      width   : this.condition ? this.props.params.width    : 5,
    }

  }

  //
  componentWillReceiveProps(newProps) {
    if (this.props.params !== undefined && newProps.params !== this.props.params) {
      this.setState({
        zenith  : this.props.params.zenith  ,
        azimuth : this.props.params.azimuth ,
        distance: this.props.params.distance,
        length  : this.props.params.length  ,
        width   : this.props.params.width   ,
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.update()
    }
  }

  componentWillMount() {
    this.update()
  }

  update = () => {
    var param ={
      zenith  : this.state.zenith  ,
      azimuth : this.state.azimuth ,
      distance: this.state.distance,
      length  : this.state.length  ,
      width   : this.state.width   ,
    }
    this.props.handleParamsChange({type:'rectangle_polar',params:param})
  }

  render() {
    return (
      <div>
        <p style={styles.title}> Line Using Cartesian Coordinates </p>
        <Form >
          <FormGroup controlId='pt1' onKeyPress={event => {
            if(event.key === "Enter") {
              this.addTrace()
            }
          }}>
            <ControlLabel style={styles.inputLabel} >Distance From Origin</ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            min='0'
            value={this.state.distance}
            onChange={(event) => {
              this.setState({distance: parseFloat(event.target.value)})
            }}
            />

          </FormGroup>
          <div style={{  margin: '8px 0',height: 1,}} />
          <FormGroup controlId='pt1' onKeyPress={event => {
            if(event.key === "Enter") {
              this.addTrace()
            }
          }}>

            <ControlLabel style={styles.inputLabel} >Width </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.width}
            onChange={(event) => {
              this.setState({width: parseFloat(event.target.value)})
            }}
            />

            <ControlLabel style={styles.inputLabel} >Length </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.length}
            onChange={(event) => {
              this.setState({length: parseFloat(event.target.value)})
            }}
            />


            <ControlLabel style={styles.inputLabel} >Zenith </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.zenith}
            onChange={(event) => {
              this.setState({zenith: parseFloat(event.target.value)})
            }}
            />

            <ControlLabel style={styles.inputLabel} >Azimuth </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.azimuth}
            onChange={(event) => {
              this.setState({azimuth: parseFloat(event.target.value)})
            }}
            />
          </FormGroup>
        </Form>
      </div>
    )
  }
}



export default RectanglePolar;
