import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useParams} from "react-router-dom";
import axiosInstance from "../../axios";
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

const PurchaseDetail = () => {
	const { id } = useParams();
	const [data, setData] = useState({
		posts: [],
	});

	useEffect(() => {
		axiosInstance.get('purchaseItem/' + id + '/').then((res) => {
			setData({
				posts: res.data,
			});
		});
	}, [setData]);


    const values = [];
    const labels = [];
	Object.keys(data.posts).forEach(function(key) {
        values.push(data.posts[key]);
        labels.push(key)
	})

  return (
    <TableContainer component={Paper}>
      <Table sx={{ '&.MuiTable-root': {
              paddingLeft: '16px',
              paddingRight: '16px',
              borderCollapse: 'separate'
          }}} aria-label="simple table" >
        <TableHead>
          <TableRow>
            <StyledTableCell>Property</StyledTableCell>
            <StyledTableCell>Value</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((value, index) => (
            <StyledTableRow key={index}>
              <TableCell component="th" scope="row">
                  {labels[index].charAt(0).toUpperCase()+labels[index].slice(1)}
              </TableCell>
              <TableCell>{values[index]}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchaseDetail;