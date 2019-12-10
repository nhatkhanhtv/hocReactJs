import React from 'react';
import ReactDOM from 'react-dom';
import InputData from './InputData';
export default class ListData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listPost:[]
        }
    }

    listViewReload(){
        axios.get(this.props.url)
        .then(res=>{
          const listPost = res.data;
          this.setState({ listPost });
        })
        .catch(error=>{console.log(error)});
      }

      componentDidMount(){
        this.listViewReload()
      }

    render(){
        return (
            <div className="list-data">
                <InputData url={this.props.url}/>
              <ul>
                { this.state.listPost.map(post => <li key={post.id}>{post.title}</li>)}
              </ul>
            </div>
        );
    }
}