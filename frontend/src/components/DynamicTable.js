import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TableFooter,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: "960px",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  avatar: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  name: {
    fontWeight: "bold",
    color: theme.palette.secondary.dark,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
  hover: {
    cursor: "pointer",
  },
  center:{
    textAlign:'center'
  }
}));

const tableHeader = [
    { label: "Key", data: "key" },
    { label: "Label", data: "label" },
  ];



const MTable = (formData, updateFormData, label) => {

  console.log('formData', formData[label]);
  
  
  const classes = useStyles();

//   const [users, setUsers] = useState(USERS);

  const addItem = () => {
    const row = {
      key: '',
      value: ''
    };

    const updateRows = [
      // copy the current rows
      ...formData[label],
      // now you can add a new object to add to the array
      row,
    ];
    // update the state to the updatedUsers
    updateFormData({
        ...formData,
        [label]: updateRows,
      });
  };

  
  const deleteItem = (index) => {
    const newRows = formData[label].filter((row, i) => i !== index);

    updateFormData({
        ...formData,
        [label]: newRows,
      });
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeader.map((cell) => (
              <TableCell key={cell.data} className={classes.tableHeaderCell}>
                {cell.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(formData[label]).map((row, i) => (
            <TableRow key={row.id}>
              {/* <TableCell>
                <Grid container>
                  <Grid item lg={2}>
                    <Avatar alt={row.name} src="." className={classes.avatar} />
                  </Grid>
                  <Grid item lg={10}>
                    <Typography className={classes.name}>{row.name}</Typography>
                    <Typography color="textSecondary" variant="body2">
                      {row.email}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {row.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell> */}
              <TableCell>
                {/* <Typography color="primary" variant="subtitle2">
                  {" "}
                  {row.key}
                </Typography> */}
                <intput type="text" value={'test'} onChange={(evnt)=>(addItem(evnt))}></intput>
                </TableCell>
              <TableCell>
                <Grid container>
                  {/* <Grid item lg={9}>
                    <Typography
                      className={classes.status}
                      style={{
                        backgroundColor:
                          (row.status === "Blocked" && "red") ||
                          (row.status === "Pending" && "blue") ||
                          (row.status === "Active" && "green"),
                      }}
                    >
                      {row.status}
                    </Typography>
                  </Grid> */}
                  <Grid item lg={3}>
                    <Typography>
                      <DeleteIcon
                        color="secondary"
                        onClick={deleteItem.bind(this, i)}
                        className={classes.hover}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>
              <Grid container>
                <Grid item lg={6} className={classes.center}>
                  <Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addItem}
                      className={classes.button}
                      startIcon={<AddIcon />}
                    >
                      Add Random Row
                    </Button>
                  </Typography>
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default MTable;