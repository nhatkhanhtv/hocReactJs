import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
//import ResponsiveDrawer from './DrawerExample1.js';
import TableExample from './TableExample.js';

export default class Example extends Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className = "col-md-4">                      
                      <div className="card">
                            <div className="card-header">Example Component</div>
                            <div className="card-body">I'm an example component!</div>
                            <Button variant="contained" color="primary">
                              Hello World
                            </Button>
                        </div>
                    </div>
                    <div className="col-md-8">
                    <TableExample />
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
