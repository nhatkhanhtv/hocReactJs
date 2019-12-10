import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ListData from './ThaoTacDuLieu/ListData';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const url = '/api/post';
export default class HocVeThaoTacDuLieu extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         numberOne: '',
    //         value2:'',
    //         responseData:"",
    //       //  listPost:[]
    //     };
    
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleChange2 = this.handleChange2.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //   }

      
    
    //   handleChange(event) {
    //     this.setState({numberOne: event.target.value});
    //   }
    //   handleChange2(event) {
    //     this.setState({value2: event.target.value});
    //   }
    
    //   handleSubmit(event) {
    //     axios({
    //       method: 'post',
    //       url: '/post/noiChuoiTest',
    //       data: { 
    //         text1:this.state.numberOne,
    //         text2:this.state.value2
    //       }
    //     }).then(res => {
    //       //const persons = res.data;
    //       this.setState({ responseData:res.data });
    //     })
    //     .catch(error => console.log(error));
    //     event.preventDefault();
    //   }

      


    
      render() {
        return (
          <div>       

            <ListData url={url}/>
          </div>
        );
      }
}

if (document.getElementById('axios')) {
    ReactDOM.render(<HocVeThaoTacDuLieu />, document.getElementById('axios'));
}