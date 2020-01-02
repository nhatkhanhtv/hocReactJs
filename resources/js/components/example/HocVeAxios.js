import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const url = '/admin/post';
export default class HocVeAxios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOne: '',
            value2:'',
            responseData:"",
            listPost:[]
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
        axios({
          method: 'post',
          url: '/post/noiChuoiTest',
          data: { 
            text1:this.state.numberOne,
            text2:this.state.value2
          }
        }).then(res => {
          //const persons = res.data;
          this.setState({ responseData:res.data });
        })
        .catch(error => console.log(error));
        event.preventDefault();
      }

      listViewReload(){
        axios.get(url)
        .then(res=>{
          const listPost = res.data;
          this.setState({ listPost });
        })
        .catch(error=>{console.log(error)});
      }

      componentDidMount(){
        this.listViewReload()
      }


    
      render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit} >
              <label>
                Name:
                <input type="text" value={this.state.numberOne} onChange={this.handleChange} />
              </label>
              <label>
                Username:
                <input type="text" value={this.state.value2} onChange={this.handleChange2} />
              </label>
              <input type="submit" value="Submit" />
              <label>
                Response:
                <input type="text" value={this.state.responseData}  readOnly/>
              </label>
            </form>

            <div className="list-data">
              <ul>
                { this.state.listPost.map(post => <li key={post.id}>{post.title}</li>)}
              </ul>
            </div>
          </div>
        );
      }
}

if (document.getElementById('axios')) {
    ReactDOM.render(<HocVeAxios />, document.getElementById('axios'));
}