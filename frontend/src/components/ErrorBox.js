import React, { useState } from "react";
import dayjs from 'dayjs';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import useStyles from "./FormStyle";
import { TextareaAutosize } from '@material-ui/core';
import type_is from "./check_type";


function ErrorTextBox({ errorMessage, setErrorMessage }) {
    const classes = useStyles();

    let dataMessage =  ""
    if (type_is(errorMessage) === "JSON" && (errorMessage.hasOwnProperty('data'))){
      if (type_is(errorMessage.data) == "Array" && errorMessage.data.length > 1 ) {
        dataMessage = JSON.stringify(errorMessage.data.slice(0,2));
      }else{
        dataMessage = JSON.stringify(errorMessage.data);
      }
    };

    const errorResponse = JSON.stringify(errorMessage);

    const formattedDateTime = dayjs().format('YYYY-MM-DD_HH-mm-ss');
    const [fileName, setFileName] = useState(`error_log_${formattedDateTime}.txt`);

    const downloadFile = () => {
        const file = new Blob([errorResponse], { type: "text/plain" });
        const fileUrl = window.URL.createObjectURL(file);
        const downloadLink = document.createElement("a");
        downloadLink.href = fileUrl;
        downloadLink.setAttribute("download", fileName);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <Grid item xs={12} key={fileName} >
          <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <div className="col-md-12">
            <h4>Short Error:</h4>
          </div>
          <TextareaAutosize
            value={dataMessage}
            minRows={2}
            style={{ width: '100%' }}
            /> 
            <div className="col-md-12">
              <h4>Full Error Message:</h4>
            </div>
            <TextareaAutosize
            value={errorResponse}
            onChange={setErrorMessage}
            minRows={5}
            style={{ width: '100%' }}
            />
            <Button
            variant="contained"
            type="submit"
            className={classes.uploadButton}
            onClick={downloadFile}
            >
            Download Error Log
            </Button>
          </Container>
      </Grid>
  );
}

export default ErrorTextBox;
