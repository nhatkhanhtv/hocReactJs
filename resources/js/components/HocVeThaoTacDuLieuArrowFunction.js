import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

//import TablePaginationActions from './TablePaginationActions';
import Axios from 'axios';
import { TextField } from '@material-ui/core';


const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));




// function createData(name, calories, fat) {
//   return { name, calories, fat };
// }



const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
const url_api = '/api/post';
// function getApiData(){
//   axios.get(url)
//     .then(res=>{
//       //setRow(res.data);
//       console.log(res.data);
//     })
//     .catch(error=>{console.log(error)});
// }
export default function CustomPaginationActionsTable() { 
  const [onload,setOnload] = useState(true); //set false de ngung tu load cho useEffect
  const [rows,setRows] = useState([]); 
  const [rowDataIndex,setRowDataIndex] = React.useState(null);
  const [dataTable,setDataTable] = React.useState([]);
  const [search,setSearch]=useState("");
  const [state,setState] = useState({
    from:'',
    current_page:0,
    to:'',
    total:'',
    per_page:5,
    
    last_page:'',    
    next_page_url:'',
    first_page_url:'',
    last_page_url:'',
    prev_page_url:'',
    // page:0,
		// rowsPerPage:10
  });
  
  // useEffect(() => {
  //   if(onload) {
  //     axios.get(url)
  //     .then(res=>{
  //       setRows(res.data);
  //       setOnload(false);
  //     })
  //     .catch(error=>{console.log(error)});
  //   }
    
  // });
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  function getServerData(url){
    axios.get(url).then(json=>{
      let response = json.data;
      setState({        
        from:response.from,
        current_page:response.current_page-1,
        to:response.to,
        total:response.total,
        per_page:parseInt(response.per_page, 10),
        
        last_page:response.last_page,    
        next_page_url:response.next_page_url,
        first_page_url:response.first_page_url,
        last_page_url:response.last_page_url,
        prev_page_url:response.prev_page_url,
      });
      setDataTable(response.data);
    }).catch(errors=>{
      console.log(errors);
    });
  }

  useEffect(() => {

    getServerData(url_api+'?per_page='+state.per_page.toString());

  }, []);


  const handleTextChange = key => event => {
    set ({ ...rowDataIndex, [key]: event.target.value });
    if(event.target.value.length==0)
      setValidate({
        
        rules: {
            name : {
                required : true
            }
          },
          message:{
            name : {
                required : 'this field is required'
            }
          },
        
        
      });
    else setValidate({
        rules: {
            name : {
                required : false
            }
          },
          message:{
            name : {
                required : ''
            }
          },
      });
    //rowDataIndex[name]=event.target.value;

  };

  function handleClickEdit(e,row){

  }

  function handleClickDelete(e,row){
    
  }

  function renderText(row){
    return(
      <TableRow key={row.id}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="right">{row.title}</TableCell>
        <TableCell align="right">{row.content}</TableCell>
        <TableCell>
          <IconButton aria-label="Edit" onClick={(e)=>handleClickEdit(e,row)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete" onClick={(e)=>handleClickOpen(e,row.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

    );
  }

  function renderForm(row){
    return (
    <TableRow key={row?row.id:""}>
      
      <TableCell component="th" scope="row">
          {row.id}
      </TableCell>
      <TableCell >
        <TextField 
          defaultValue={row?row.title:""} 
          onChange = {handleTextChange('title')}
          required={true}
        />
      </TableCell>
      <TableCell >
        <TextField 
          defaultValue={row?row.content:""} 
          onChange = {handleTextChange('content')}
          required={true}
        />
      </TableCell>  
    </TableRow>
    );
  }

  function TablePaginationActions(props) {
    const theme = useTheme();
    const classes = useStyles1(theme);
    
    //console.log(classes);
    const { count, page, rowsPerPage, onChangePage } = props;

    function handleFirstPageButtonClick(event) {
      //onChangePage(event, 0);
      if(state.prev_page_url != null){
        getServerData(state.first_page_url+'&searchQuery='+search+'&per_page='+state.per_page.toString());
      }
    }

    function handleBackButtonClick(event) {
      //onChangePage(event, page - 1);
      if(state.prev_page_url != null){
        getServerData(state.prev_page_url+'&searchQuery='+search+'&per_page='+state.per_page.toString());
      }
    }

    function handleNextButtonClick(event) {
      //onChangePage(event, state.current_page+1);
      
      if(state.next_page_url != null){
        getServerData(state.next_page_url+'&searchQuery='+search+'&per_page='+state.per_page.toString());
      }
    }

    function handleLastPageButtonClick(event) {
      //onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      if(state.next_page_url != null){
        getServerData(state.last_page_url+'&searchQuery='+search+'&per_page='+state.per_page.toString());
      }
    }

    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={state.prev_page_url === null}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={state.prev_page_url === null} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={state.current_page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={state.current_page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
TablePaginationActions.propTypes = {
count: PropTypes.number.isRequired,
onChangePage: PropTypes.func.isRequired,
page: PropTypes.number.isRequired,
rowsPerPage: PropTypes.number.isRequired,
};

  function handleChangePage(event, newPage) {
    
    setState({
          page:newPage
          
          });
    }
  function handleChangeRowsPerPage(event) {  
    getServerData(url_api+'?searchQuery='+search+'per_page='+parseInt(event.target.value, 10));
  }
  function keyPress(e){    
      setSearch(e.target.value);
      let url = url_api+'?searchQuery='+e.target.value+'&per_page='+state.per_page.toString();
      getServerData(url);

    }


  return (
    
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {/* {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map(row => (
            // <TableRow key={row.id}>
            //   <TableCell component="th" scope="row">
            //     {row.id}
            //   </TableCell>
            //   <TableCell align="right">{row.title}</TableCell>
            //   <TableCell align="right">{row.content}</TableCell>
            // </TableRow>
            renderText(row)
          ))}  */}

          {dataTable.map(row=>(
            renderText(row)
            ))}

         {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} 
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={state.total?state.total:0}
              rowsPerPage={state.per_page?state.per_page:0}
              page={state.current_page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
  );
}


if (document.getElementById('axios')) {
  ReactDOM.render(<CustomPaginationActionsTable />, document.getElementById('axios'));
}