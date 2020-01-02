import React,{useState, useEffect, Component} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class RenderText extends Component{
  constructor(props){
    super(props);
  }  
  render(){
    const {row} = this.props;
    return(
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.title}</TableCell>
        <TableCell align="right">{row.content}</TableCell>
        <TableCell>
          <IconButton aria-label="Edit" onClick={(e)=>this.props.handleClickEdit(e,row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete" onClick={(e)=>this.props.handleOpenDeleteDialog(row.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      );
    }
  }

  export default RenderText;