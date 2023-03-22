import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function JasonTable(Obj) {
  return (
    
    <TableContainer component={Paper} key={Obj}>
      <Typography component="h4" variant="h6">
						Key-Value Pairs 
		  </Typography>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>KEY</StyledTableCell>
            <StyledTableCell align="right">VALUE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(Obj).map((key, i) => {
            console.log(key, Obj[key])
             return (
              <StyledTableRow key={i}>
                <StyledTableCell component="th" scope="row">
                  {key}
                </StyledTableCell>
                <StyledTableCell align="right">{Obj[key]}</StyledTableCell>
              </StyledTableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}