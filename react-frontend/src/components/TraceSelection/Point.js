import React, {Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import * as styles from './styles'

class Point extends Component {
  constructor(props) {
    super(props);
    this.condition = this.props.params !== undefined
    this.state = {
      x: this.condition ? this.props.params.x : 0,
      y: this.condition ? this.props.params.y : 0,
      z: this.condition ? this.props.params.z : 0,
    }
  }

  //Need this for the edit menu
  componentWillReceiveProps(newProps) {
    if (this.props.params !== undefined && newProps.params !== this.props.params) {
      this.setState( {
        x: newProps.params.x,
        y: newProps.params.y,
        z: newProps.params.z
      })
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.handleParamsChange({type:'point',
      params:{x:parseFloat(this.state.x),y:parseFloat(this.state.y),z:parseFloat(this.state.z)}})
    }
  }

  componentWillMount() {
    this.props.handleParamsChange({type:'point',
    params:{x:parseFloat(this.state.x),y:parseFloat(this.state.y),z:parseFloat(this.state.z)}})
  }



  render() {
    return (
      <div>
        <p style={styles.title}> Point Using Cartesian Coordinates </p>
        <Form >
          <FormGroup controlId='Point' onKeyPress={event => {
            if(event.key === "Enter") {
              this.addPoint()
            }
          }}>
            <ControlLabel style={styles.inputLabel} >X </ControlLabel>

            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.x}
            onChange={(event) => {this.setState({x: event.target.value});}}
            />

            <ControlLabel style={styles.inputLabel} >Y </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.y}
            onChange={(event) => {this.setState({y: event.target.value});}}
            />

            <ControlLabel style={styles.inputLabel} >Z </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            min='0'
            value={this.state.z}
            onChange={(event) => {this.setState({z: event.target.value});}}
            />

          </FormGroup>
        </Form>
      </div>
    )
  }
}

export default Point;
