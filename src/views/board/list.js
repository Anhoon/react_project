import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TableSortLabel,
  Paper,Checkbox,Button,Box,
  Card,CardContent,InputAdornment,SvgIcon,TextField,Grid,MenuItem,Select
} from '@material-ui/core';
import axios from 'axios';
import { Search as SearchIcon } from 'react-feather';
import Selector from "src/utils/Selector";

function stableSort(array) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'boardId', numeric: false, disablePadding: false, label: '순번' },
  { id: 'title', numeric: false, disablePadding: false, label: '제목' },
  { id: 'writer', numeric: false, disablePadding: false, label: '작성자' }
];

function EnhancedTableHead(props) {
  const {onSelectAllClick,numSelected, rowCount} = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(2),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const searchStyles = makeStyles((theme) => ({
  root: {}
}));

const searchKeys = [
  {value: "ALL", print: "제목+내용"},
  {value: "CONTENTS", print: "내용"},
  {value: "TITLE", print: "제목"},
  {value: "WRITER", print: "작성자"}
]

export default function Home() {
  const navigate = useNavigate();
  const classes = useStyles();
  const searchClasses = searchStyles();
  const [selected, setSelected] = React.useState([]);
  const [pageNum, setPageNum] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  const [totalSize, setTotalSize] = React.useState(0);
  const [rows, setRows] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchKeyWord, setSearchKeyWord] = useState('');

  function getBoardData() {
    
    let searchKeyOrg = searchKey; //e.email
    let searchKeyWordOrg = searchKeyWord; //e.password
    console.log(pageNum);
    let param = "searchKey="+searchKey+"&searchKeyWord="+searchKeyWord+"&pageNum="+pageNum+"&pageSize="+pageSize;
    try {   
      axios.get('/api/board/list?'+param, {
          headers: {
            'Content-Type': 'application/json',
          }
      })
      .then((res) => {
          if(res.data.success){
            setRows(res.data.data.list);
            if(searchKeyOrg != "") setSearchKey(searchKeyOrg);
            if(searchKeyWordOrg != "") setSearchKeyWord(searchKeyWordOrg);
            setTotalSize(res.data.data.total);
            //setPageNum(res.data.data.nextPage);
            console.log(res.data.data);
          }
      })
      .catch((ex) => {
          console.log('get sample data requset fail : ' + ex);
      })
      .finally(() => { console.log('get sample data request end'); });
    } catch (e) {
        console.log(e);
    }
  }
  useEffect(() => {
    getBoardData();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.boardId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPageNum(newPage);
    getBoardData();
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    //setPageNum(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const goWritePage = () => {
    navigate('/view/Board/write', { replace: true });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
          <Grid container>
              <Grid item xs={12}>
                  <Grid container alignItems="center" justify="flex-end" direction="row">
                      <Grid className={classes.margin}>
                          <Grid container spacing={1}>
                              <Grid item>
                                  <SearchIcon/>
                              </Grid>
                              <Grid item>
                              <Select
                                  value={searchKey === "" ? searchKeys[0].value : searchKey}
                                  onChange={event => setSearchKey(event.target.value)}
                              >
                                  {searchKeys.map((data) => (
                                      <MenuItem key={data.value} value={data.value} selected>
                                          {data.print}
                                      </MenuItem>
                                  ))}
                              </Select>
                              </Grid>
                              <Grid item>
                                  <TextField id="searchKeyWord" 
                                             placeholder="검색어를 입력해주세요"
                                             onChange={event => setSearchKeyWord(event.target.value)}
                                             value={searchKeyWord === "" ? "" : searchKeyWord}
                                             />
                              </Grid>
                              <Grid item>
                              <Button color="primary" size="medium" variant="contained" onClick={ () => {getBoardData()}}>
                               조회
                              </Button>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
        <TableContainer>
          <Table className={classes.table}>
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows)
                .slice(pageNum * pageSize, pageNum * pageSize + pageSize)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.boardId);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.boardId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.boardId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }}/>
                      </TableCell>
                      <TableCell align="center" component="th" id={labelId} scope="row" padding="none">
                        {row.boardId}
                      </TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.writer}</TableCell>
                    </TableRow>
                  );
                }
                )}
              {rows.length <= 0 && (
                <TableRow>
                  <TableCell colSpan={6}>No Data</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={totalSize}
          rowsPerPage={pageSize}
          page={pageNum}
          onChangePage={handleChangePage}
        />
      </Paper>
      <Box display="flex" justifyContent="right" mt={2}>
          <Button color="primary" variant="contained" onClick={ () => {goWritePage()}}>
            등록
          </Button>
      </Box>
    </div>
  );
}