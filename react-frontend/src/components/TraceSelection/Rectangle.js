import React, {Component} from 'react';
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import * as styles from './styles'

class Rectangle extends Component {
  constructor(props) {
    super(props);
    this.condition = this.props.params !== undefined
    this.state = {
      pt1: this.condition ? this.props.params.pt1 : {x:0,y:0,z:0},
      pt2: this.condition ? this.props.params.pt2 : {x:5,y:5,z:5},
      pt3: this.condition ? this.props.params.pt3 : {x:0,y:0,z:5},
      points: []
    }

  }

  //
  componentWillReceiveProps(newProps) {
    if (this.props.params !== undefined && newProps.params !== this.props.params) {
      this.setState({
        pt1: newProps.params.pt1,
        pt2: newProps.params.pt2,
        pt3: newProps.params.pt3,
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
      pt1:this.state.pt1,
      pt2:this.state.pt2,
      pt3:this.state.pt3
    }
    this.props.handleParamsChange({type:'rectangle',params:param})
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
            <ControlLabel style={styles.inputLabel} >X </ControlLabel>

            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.pt1.x}
            onChange={(event) => {
              var newPt1 = this.state.pt1
              newPt1.x = parseFloat(event.target.value)
              this.setState({pt1: newPt1})
            }}
            />

            <ControlLabel style={styles.inputLabel} >Y </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.pt1.y}
            onChange={(event) => {
              var newPt1 = this.state.pt1
              newPt1.y = parseFloat(event.target.value)
              this.setState({pt1: newPt1})
            }}
            />

            <ControlLabel style={styles.inputLabel} >Z </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            min='0'
            value={this.state.pt1.z}
            onChange={(event) => {
              var newPt1 = this.state.pt1
              newPt1.z = parseFloat(event.target.value)
              this.setState({pt1: newPt1})
            }}
            />


          </FormGroup>
          <div style={{  margin: '8px 0',height: 1,}} />
          <FormGroup controlId='pt2' onKeyPress={event => {
            if(event.key === "Enter") {
              this.addTrace()
            }
          }}>
            <ControlLabel style={styles.inputLabel} >X </ControlLabel>

            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.pt2.x}
            onChange={(event) => {
              var newPt2 = this.state.pt2
              newPt2.x = parseFloat(event.target.value)
              this.setState({pt2: newPt2})
            }}
            />

            <ControlLabel style={styles.inputLabel} >Y </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.pt2.y}
            onChange={(event) => {
              var newPt2 = this.state.pt2
              newPt2.y = parseFloat(event.target.value)
              this.setState({pt2: newPt2})
            }}
            />

            <ControlLabel style={styles.inputLabel} >Z </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            min='0'
            value={this.state.pt2.z}
            onChange={(event) => {
              var newPt2 = this.state.pt2
              newPt2.z = parseFloat(event.target.value)
              this.setState({pt2: newPt2})
            }}
            />
          </FormGroup>
          <div style={{  margin: '8px 0',height: 1,}} />
          <FormGroup controlId='pt3' onKeyPress={event => {
            if(event.key === "Enter") {
              this.addTrace()
            }
          }}>
            <ControlLabel style={styles.inputLabel} >X </ControlLabel>

            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.pt3.x}
            onChange={(event) => {
              var newPt3 = this.state.pt3
              newPt3.x = parseFloat(event.target.value)
              this.setState({pt3: newPt3})
            }}
            />

            <ControlLabel style={styles.inputLabel} >Y </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            value={this.state.pt3.y}
            onChange={(event) => {
              var newPt3 = this.state.pt3
              newPt3.y = parseFloat(event.target.value)
              this.setState({pt3: newPt3})
            }}
            />

            <ControlLabel style={styles.inputLabel} >Z </ControlLabel>
            <FormControl
            style={styles.input}
            type="number"
            step="1"
            min='0'
            value={this.state.pt3.z}
            onChange={(event) => {
              var newPt3 = this.state.pt3
              newPt3.z = parseFloat(event.target.value)
              this.setState({pt3: newPt3})
            }}
            />
          </FormGroup>
        </Form>

      </div>
    )
  }
}



export default Rectangle;
