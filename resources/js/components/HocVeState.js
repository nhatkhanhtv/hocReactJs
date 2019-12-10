import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class HocVeState extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOne: '',
            value2:''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({numberOne: event.target.value});
      }
      handleChange2(event) {
        this.setState({value2: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.numberOne+ ' a username: '+this.state.value2);
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.numberOne} onChange={this.handleChange} />
            </label>
            <label>
              Username:
              <input type="text" value={this.state.value2} onChange={this.handleChange2} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

if (document.getElementById('example')) {
    ReactDOM.render(<HocVeState />, document.getElementById('example'));
}