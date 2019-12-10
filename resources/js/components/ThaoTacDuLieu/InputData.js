import React from 'react';
import ReactDOM from 'react-dom';

export default class InputData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:"",
            content:"",
            stateChange:false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
    }

    handleSubmit(event){
        const url = this.props.url + "/store";
        //if(!this.state.stateChange) {
            axios({
                method: 'post',
                url: url,
                data: { 
                  title:this.state.title,
                  content:this.state.content
                }
              }).then(res => {
                //const persons = res.data;
                //this.setState({ responseData:res.data });
                console.log('ok');
              })
              .catch(error => console.log(error));
        //} 
        
        event.preventDefault();
    }

    handleChangeTitle(event){
        this.setState({title:event.target.value});
    }

    handleChangeContent(event){
        this.setState({content:event.target.value});
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Title
                    <input type='text' value={this.state.title} onChange={this.handleChangeTitle}></input>
                </label>
                <label>Content
                    <input type='text' multiline='multiline' value={this.state.content} onChange={this.handleChangeContent}></input>
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}