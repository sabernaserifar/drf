import * as React from 'react';
import { useState, useEffect } from 'react';
import axiosInstance from './axios';
import {useNavigate, useParams} from 'react-router-dom';
import useStyles from "./FormStyle";
import * as utils from './utils';
import AddDeleteTableRows from './AddDeleteTableRows';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import dayjs from 'dayjs';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ProgressBar from "./ProgressBar";
import { FormHelperText, FormControl } from '@mui/material';
import ErrorTextBox from './ErrorBox';


import {ProcessErrorMessage} from './ErrorMessage';
import CreateBlock from './CreateBlock';
import type_is from "./check_type";
import JasonTable from "./BuildJsonTable";
import MTable from './DynamicTable';


export default function Create(fields) {
  const base_route = window.location.pathname.split("/")[1];
  const { parent, parentID } = useParams(); // for navigation after create 
  const navigate = useNavigate();
  const classes = useStyles();
  let time_zone = false;
  let file_upload = false;
  let form_dict = {};

  const [timezone, setTimezone] = useState('US/Pacific');
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState(0);
  
  fields.forEach((value, field) => {
    if (utils.is_time_field(field)) {
      time_zone = true;	
      form_dict[field] = utils.convert_tz(dayjs(), timezone) ;
    }else if(utils.is_file_field(field)){
      file_upload = true;
      form_dict[field] = null;
      form_dict['parent_file'] = parentID;
    }
    else{
      form_dict[field] = value.default_value;
    };
  });
  const initialFormData = Object.freeze(form_dict);
  const [formData, updateFormData] = useState(initialFormData);
  
  const handleChange = (e, myField) => {
    if (myField && utils.is_time_field(myField)){
      updateFormData({
        ...formData,
        [myField]: utils.convert_tz(e, timezone),
      });
    }else if (myField && utils.is_file_field(myField)){
      updateFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    }		
    else{
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    console.log(formData)
    e.preventDefault();
    axiosInstance.post( `/${base_route}/`, formData,
    {headers: {'content-type': 'multipart/form-data'}, 
    onUploadProgress : (progressEvent) => {
        setProgress(Math.floor((progressEvent.loaded) / progressEvent.total * 50))}}
    )
    .then((response) => {
      // setProgress(100);
      if (parent && parentID){
        navigate({ pathname: `/${parent}/${parentID}/`}); 
      } else {
        navigate({ pathname: `/${base_route}/`}); 
      };
      window.location.reload();
    })
    .catch((error) => {
      setErrorMessage(ProcessErrorMessage(error));
    })
  };

  // console.log("Errror", JSON.stringify(errorMessage))


	return (
    <Container component="main" maxWidth="sm">
        <CssBaseline />
			<Grid className={classes.paper}>
				<Typography component="h1" variant="h5">
					Create New {utils.sanitizer(base_route)}
				</Typography>
				<FormControl className={classes.form} noValidate>
					<Grid container spacing={2}>
						{ time_zone && 
							<Grid item xs={12} key={'timezone'}>
								<InputLabel id="demo-simple-select-label">Time Zone</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={timezone}
									label="Timezone"
									onChange={(e)=>{setTimezone(e.target.value)}}
								>
									<MenuItem value={'US/Pacific'}>US/Pacific</MenuItem>
									<MenuItem value={'EST'}>EST</MenuItem>
								</Select>
							</Grid>
						}
						{ fields && Array.from(fields).map((field) => {
								return CreateBlock(field, formData[field[0]], handleChange);
							})
						}
            {/* {fields && Array.from(fields).map((field) => {
							if (field[1].field_type === 'json'){
                console.log('heree')
								return MTable(formData, updateFormData, field[0]); 
							}})
						} */}
				<br></br>
					</Grid>

    			<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Create {base_route}
					</Button>
          {ProgressBar(progress)}
				</FormControl>
			</Grid>
      { errorMessage && 
      		<Container maxWidth="md" component="main" style={{paddingTop: "50px"}}>
              <div className="col-md-12">
                    <h3>Error</h3>
              </div>
            <ErrorTextBox errorMessage={errorMessage} setErrorMessage={setErrorMessage}/> 
         </Container>
      } 

      
			{/* { errorMessage && ErrorTextBox(errorMessage) }  */}
        {/* <Container maxWidth="md" component="main" style={{paddingTop: "50px"}}> */}
           
            {/* {ErrorTextBox(errorMessage)} */}
            {/* <ErrorTextBox errorResponse={errorMessage}/> */}

          {/* <Typography key='error_head' component="h1" variant="h5" className={classes.error}>
              Error: 
          </Typography>
          { Object.keys(errorMessage).map((key) => {
              return (
                <Typography key={key} component="h1" variant="h5" className={classes.error}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}: {errorMessage[key]}
                </Typography>
              )
            })
          }  */}
      {/* </Container>  
      } */}
		</Container>
  );
}