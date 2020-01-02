import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
//import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';

import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'



const url = '/api/post';

export default class HocVeThaoTacDuLieu extends Component {
  constructor(props){
    super(props);
    this.state = {
        listPost:[],
        id:"",
        title:"",
        content:"",
        stateChange:0
    },
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleClickEdit = this.handleClickEdit.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    
}

  handleSubmit(event){
    
    if(this.state.stateChange==0)
    {      
      const urlStore = url + "/store";
        axios({
            method: 'post',
            url: urlStore,
            data: { 
              title:this.state.title,
              content:this.state.content
            }
          }).then(res => {           
            let list = this.state.listPost;
            list.push(res.data);
            this.setState({listPost:list});


          })
          .catch(error => console.log(error));
    } else {
      const urlChange = url +"/"+this.state.id;
      this.handleUpdate(urlChange);

    }
    
    
    event.preventDefault();
  }

  handleUpdate(url){
    axios({
      method: 'put',
      url: url,
      data: { 
        id:this.state.id,
        title:this.state.title,
        content:this.state.content
      }
    }).then(res => { 
      let listData = res.data;
      let list = this.state.listPost;

      list.map((item,index)=>{
        if(item.id == listData.id) {
          list[index] = listData
          
        }
      });
      this.setState({        
        listPost: list,
        
      });
      this.setState({
        title:"",
        content:"",
        stateChange:0
      });
      console.log('ok');
    })
    .catch(error => console.log(error));
  }

  handleChangeTitle(event){
    //cap nhat thay doi title
    this.setState({title:event.target.value});
  }

  handleChangeContent(event){
    //cap nhat thay doi content
    this.setState({content:event.target.value});
  }

  listViewReload(){
    //reload lai table
    axios.get(url)
    .then(res=>{
      const listPost = res.data;
      this.setState({ listPost });
    })
    .catch(error=>{console.log(error)});
  }

  componentDidMount(){
    //ham chay khi vua goi component
    this.listViewReload()
  }

  handleClickEdit(e,row){
    //ham xu ly nut edit
    console.log('update '+row.title);
    this.setState({
      id:row.id,
      title: row.title,
      content : row.content,
      stateChange:true
    });
    e.preventDefault();
  }

  handleClickDelete(e,id){
    //ham xu ly nut delete
    console.log('delete '+id);
    axios.delete(url+"/"+id)
      .then(res => {
        const list = res.data;
        this.setState({listPost:list});  
      })
    e.preventDefault();
  }

  
  
  render() {
    return (
        <Paper>
        <form onSubmit={this.handleSubmit}>
            <label>Title
                <input type='text' value={this.state.title} onChange={this.handleChangeTitle}></input>
            </label>
            <label>Content
                <input type='text' multiline='multiline' value={this.state.content} onChange={this.handleChangeContent}></input>
            </label>
            <input type="submit" value="Submit" />
        </form>
          <Table>
            <TableHead>
              <TableRow></TableRow>
            </TableHead>
            <TableBody>
            { this.state.listPost.map(post => 
              <TableRow key={post.id}>
              <TableCell>
              {post.id}
              </TableCell>
              <TableCell>
              {post.title}
              </TableCell>
              <TableCell>{post.content}</TableCell>
              <TableCell>
                <IconButton aria-label="Edit" onClick={(e)=>this.handleClickEdit(e,post)}>
                      <EditIcon />
                 </IconButton>
                <IconButton aria-label="Delete" onClick={(e)=>this.handleClickDelete(e,post.id)}>
                      <DeleteIcon />
                 </IconButton>            
                
              </TableCell>
            </TableRow>

              )}
            </TableBody>
          </Table>
          
      </Paper>      
    )
  }
}

if (document.getElementById('axios')) {
    ReactDOM.render(<HocVeThaoTacDuLieu />, document.getElementById('axios'));
}