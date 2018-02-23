import React, {Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import * as styles from './styles'

class Line extends Component {
  constructor(props) {
    super(props);
    this.condition = this.props.params !== undefined
    this.state = {
      x1: this.condition ? this.props.params.pt1.x : 0,
      y1: this.condition ? this.props.params.pt1.y : 0,
      z1: this.condition ? this.props.params.pt1.z : 0,
      x2: this.condition ? this.props.params.pt2.x : 5,
      y2: this.condition ? this.props.params.pt2.y : 5,
      z2: this.condition ? this.props.params.pt2.z : 5,
      points: []
    }

  }

  //
  componentWillReceiveProps(newProps) {
    if (this.props.params !== undefined && newProps.params !== this.props.params) {
      this.setState({
        x1: newProps.params.pt1.x,
        y1: newProps.params.pt1.y,
        z1: newProps.params.pt1.z,
        x2: newProps.params.pt2.x,
        y2: newProps.params.pt2.y,
        z2: newProps.params.pt2.z,
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
      pt1:{x:parseFloat(this.state.x1),y:parseFloat(this.state.y1),z:parseFloat(this.state.z1)},
      pt2:{x:parseFloat(this.state.x2),y:parseFloat(this.state.y2),z:parseFloat(this.state.z2)},
    }
    this.props.handleParamsChange({type:'line',params:param})
  }

  render() {
    return (
      <div>
        <p style={styles.title}> Line Using Cartesian Coordinates </p>
        <Form >
          <FormGroup controlId='Point-1' onKeyPress={event => {
            if(event.key === "Enter") {
              this.addTrace()
            }
          }}>
            <ControlLabel style={styles.inputLabel} >X </ControlLabel>

            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.x1}
            onChange={(event) => {this.setState({x1: event.target.value})}}
            />

            <ControlLabel style={styles.inputLabel} >Y </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.y1}
            onChange={(event) => {this.setState({y1: event.target.value})}}
            />

            <ControlLabel style={styles.inputLabel} >Z </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            min='0'
            value={this.state.z1}
            onChange={(event) => {this.setState({z1: event.target.value < 0 ? 0 : event.target.value})}}
            />

          </FormGroup>
          <div style={{  margin: '8px 0',height: 1,}} />
          <FormGroup controlId='Point-1' onKeyPress={event => {
            if(event.key === "Enter") {
              this.addTrace()
            }
          }}>
            <ControlLabel style={styles.inputLabel} >X </ControlLabel>

            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.x2}
            onChange={(event) => {this.setState({x2: event.target.value})}}
            />

            <ControlLabel style={styles.inputLabel} >Y </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.y2}
            onChange={(event) => {this.setState({y2: event.target.value})}}
            />

            <ControlLabel style={styles.inputLabel} >Z </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            min='0'
            value={this.state.z2}
            onChange={(event) => {this.setState({z2: event.target.value})}}
            />

          </FormGroup>
        </Form>

      </div>
    )
  }
}



export default Line;
