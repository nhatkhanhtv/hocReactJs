import React,{useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SimpleTable() {
  const classes = useStyles();
  // state cho pager
  const [state, setState] = useState({
    data:[],
    total:0,
    from :0,
    to:0,
    current_page:0,
    per_page :10,
    last_page:'',
     
    next_page_url:'',
    first_page_url:'',
    last_page_url:'',
    prev_page_url:'',
    page:0,
    rowsPerPage:10
  });

  const [data,setData]=useState([]);

  function getCall(url){        
    axios.get(url).then(json => {
      let response = json.data;
      setState({
        data: response.data,
        from:response.from,
        current_page:response.current_page-1,
        to:response.to,
        total:response.total,
        per_page:parseInt(response.per_page, 10),        
        last_page:response.last_page,        
        next_page_url:response.next_page_url,
        first_page_url:response.first_page_url,
        last_page_url:response.last_page_url,
        prev_page_url:response.prev_page_url          
      });
      setData(response.data);
      
    }).catch(errors=>{
        console.log(errors);
    });
    
  }
  const emptyRows = state.per_page - Math.min(state.per_page, state.to - state.current_page * state.per_page);
  useEffect(() => {

    getCall(url_api+'?per_page='+state.per_page.toString());

  }, []);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <colgroup>
          
          {columns.map((item,index) => (
                
              <col key={item.field} width={item.width} />
            
          )) }
        </colgroup>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id.toString()}>
              {openForm && rowIndex==row.id ? RenderForm(row) : RenderText(row)}
            </TableRow>
          ))}
          
          {emptyRows > 0 && (
            <TableRow style={{ height: 48 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}