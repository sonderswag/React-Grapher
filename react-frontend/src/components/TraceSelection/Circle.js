import React, {Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import * as styles from './styles'

class Circle extends Component {
  constructor(props) {
    super(props);
    this.condition = this.props.params !== undefined
    this.state = {
      cX: this.condition ? this.props.params.center.x : 0,
      cY: this.condition ? this.props.params.center.y : 0,
      cZ: this.condition ? this.props.params.center.z : 0,
      zenith: this.condition ? this.props.params.zenith : 0,
      azimuth: this.condition ? this.props.params.azimuth : 0,
      radius: this.condition ? this.props.params.radius : 5,
      step: this.condition ? this.props.params.step : 10,
    }

  }

  componentWillReceiveProps(newProps) {
    if (newProps.params !== undefined && newProps.params !== this.props.params) {
      this.setState({
        cX: newProps.params.center.x,
        cY: newProps.params.center.y,
        cZ: newProps.params.center.z,
        zenith: newProps.params.zenith,
        azimuth: newProps.params.azimuth,
        radius: newProps.params.radius,
        step: newProps.params.step,
      })
    }
  }

  update = () => {
    var param = {
      center: {x:this.state.cX,y:this.state.cY,z:this.state.cZ},
      radius:this.state.radius,
      zenith:this.state.zenith,
      azimuth:this.state.azimuth,
      step:this.state.step
    }
    this.props.handleParamsChange({type:'circle',
    params:param})
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.update()
    }
  }

  componentWillMount() {
    this.update()
  }


  render() {

    return (
        <div >
          <p style={styles.title}> Circle </p>
          <Form >
            <FormGroup controlId='Center Point' onKeyPress={event => {
              if(event.key === "Enter") {
                this.addTrace()
              }
            }}>

              <ControlLabel style={styles.inputLabel} > Center Point :    X </ControlLabel>

              <FormControl
              style={styles.input}
              type="number"
              step="1"
              value={this.state.cX}
              onChange={(event) => {this.setState({cX: parseFloat(event.target.value)})}}
              />

              <ControlLabel style={styles.inputLabel} >Y </ControlLabel>
              <FormControl
              style={styles.input}
              type="number"
              step="1"
              value={this.state.cY}
              onChange={(event) => {this.setState({cY: parseFloat(event.target.value)})}}
              />

              <ControlLabel style={styles.inputLabel} >Z </ControlLabel>
              <FormControl
              style={styles.input}
              type="number"
              step="1"
              min='0'
              value={this.state.cZ}
              onChange={(event) => {this.setState({cZ: event.target.value < 0 ? 0 : parseFloat(event.target.value)})}}
              />

            </FormGroup>

            <p style={{fontSize: '20px',paddingLeft:'10px'}}> Options In Degrees:  Distance Between Points: {(this.state.radius*this.state.step*(Math.PI/180)).toPrecision(3)} </p>

            <div style={{  margin: '8px 0',height: 1,}} />
            <FormGroup controlId='Options' onKeyPress={event => {
              if(event.key === "Enter") {
                this.addTrace()
              }
            }}>
              <ControlLabel style={styles.inputLabel} >Radius </ControlLabel>

              <FormControl
              style={styles.input}
              type="number"
              step="1"
              value={this.state.radius}
              onChange={(event) => {this.setState({radius: parseFloat(event.target.value)})}}
              />

              <ControlLabel style={styles.inputLabel} >Degrees Per Point </ControlLabel>

              <FormControl
              style={styles.input}
              type="number"
              step="1"
              value={this.state.step}
              onChange={(event) => {this.setState({step: parseFloat(event.target.value)})}}
              />

              <ControlLabel style={styles.inputLabel} >Zenith </ControlLabel>
              <FormControl
              style={styles.input}
              type="number"
              step="1"
              value={this.state.zenith}
              onChange={(event) => {this.setState({zenith: parseFloat(event.target.value)})}}
              />

              <ControlLabel style={styles.inputLabel} >Azimuth </ControlLabel>
              <FormControl
              style={styles.input}
              type="number"
              step="1"
              min='0'
              value={this.state.azimuth}
              onChange={(event) => {this.setState({azimuth: parseFloat(event.target.value)})}}
              />

            </FormGroup>
          </Form>
        </div>
    )
  }
}


export default Circle;
