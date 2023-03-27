import * as React from 'react';
import {useState, useEffect} from 'react';
import * as utils from './utils';
import { sanitizer } from './utils';
import useStyles from './FormStyle';
import axiosInstance from './axios';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

//MaterialUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormHelperText } from '@mui/material';
import { ClassNames } from '@emotion/react';
import Link from '@material-ui/core/Link';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import type_is from './check_type';
import { MultiSelect, MultiSelectProps } from '@uc-react-ui/multiselect';



const object_length = (value) => {
  if (!value){
    return 0
  };

  if (type_is(value)==='JSON') {
    return Object.keys(value).length;
  } else if (type_is(value)==='Array'){
    return value.length;
  } else if (type_is(value)==='String'){
    return value.length;
  }else{
    return 0
  }

};


const CreateBlock = (field, value, handleChange) =>{ 
  
    const label = field[0];
    const help_text = field[1].help_text
    const required = field[1].required_view;
    const changable = field[1].changable;
    let val = value
    // if (!changable && field[1].field_type=='JSON') {
    //       val = JSON.stringify(value);
    // };
  
    const [fileName, setFileName] = useState('');
    const classes = useStyles()
    const handleNameChange = (e) => {
      setFileName(e.target.files[0].name);
    }

    // For deleting an uploaded file 
    const handleSubmit = (e, file_id) => {
      e.preventDefault();
      axiosInstance
        .delete(`/file_uploads/${file_id}/`)
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        })
        .then(function () {
          window.location.reload();
        });
    };

    const animatedComponents = makeAnimated();

    const [optionList, setOptionList] = useState([]);
    useEffect(() => {
      axiosInstance.get("/equipments")
      .then((response) => {
        const sensors = [];
        response.data.map((sensor) =>{
          if (sensor.equipment_type === "SENSOR"){
            sensors.push({label: sensor.label, value: sensor.label});
          }
        })
        setOptionList(sensors);
      });
  
    }, []);



    // Sensor label insert 
    // const [sensor, setSensor] = useState([]);
    // const  MultiSelectProps = {
    //     label: 'Tags',
    //     name: 'tags',
    //     size: 'small',
    //     optionList: sensorList,
    //     placeholder: 'Add tags',
    //     value: sensor,
    //     valueChange: setSensor
    // };





    if (utils.is_time_field(label)){
      return (
        <Grid item xs={12} key={label}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={13}>
              <DateTimePicker
              label={label}
              value={val}
              onChange={changable? (e)=>handleChange(e, label):null}
              renderInput={
                (params) => <TextField variant="outlined" required={required} {...params} />
              }
              />
            </Stack>
          </LocalizationProvider>
          <FormHelperText>{help_text}</FormHelperText>
        </Grid>
      );
      } else if (utils.is_date_field(label)){
        return (
          <Grid item xs={12} key={label}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={13}>
                <DesktopDatePicker
                label={label}
                value={val}
                onChange={changable? (e)=>handleChange(e, label):null}
                renderInput={
                  (params) => <TextField variant="outlined" required={required} {...params} />
                }
                />
              </Stack>
            </LocalizationProvider>
            <FormHelperText>{help_text}</FormHelperText>
          </Grid>
        );              
    }else if(utils.is_file_field(label) && !utils.is_file_upload(label) && !utils.is_file_sensor(label) ){
      return (
          <Grid item xs={12} key={label} >
            {val &&
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                variant="outlined"
                required={required}
                fullWidth
                id={label}
                label={label}
                name={label}
                value={val}
                autoComplete={label}
                onChange={null}
                multiline={utils.multiRowsField(label)}
                minRows={8}
                />
                <Button
                  variant="contained"
                  type="submit"
                  onClick={(e)=>handleSubmit(e, val)}
                >
                  delete
                </Button>
                {/* <Link
                color="textPrimary"
                href={`/file_uploads/delete/${val}/`}
                className={classes.link}
                >
                  <DeleteForeverIcon></DeleteForeverIcon>
                </Link>  */}
              </Box>
            }
          </Grid>
      )
      } else if(utils.is_file_field(label) && utils.is_file_upload(label)){
        return (
            <Grid item xs={12} key={label} >
              <Box sx={{ display: 'flex', alignItems: 'center' }} >
                <Button variant="contained" component="label" className={classes.uploadButton} >
                  {sanitizer(label)}
                  <input hidden name={label} type="file" onChange={ e=> {handleChange(e, label); handleNameChange(e)} }/>
                </Button>
                {fileName && 
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">{fileName}</Typography>
                    </Box>
                }
              </Box>
              <FormHelperText>{help_text}</FormHelperText>
            </Grid>
        )
    } else if (utils.is_file_upload(label)){
      return (
        <Grid item xs={12} key={label} >
          <Box sx={{ display: 'flex', alignItems: 'center' }} >
            <Button variant="contained" component="label" className={classes.uploadButton} >
              {sanitizer(label)}
              <input hidden name={label} type="file" onChange={ e=> {handleChange(e, label); handleNameChange(e)} }/>
            </Button>
            {fileName && 
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{fileName}</Typography>
                </Box>
            }
          </Box>
        <FormHelperText>{help_text}</FormHelperText>
      </Grid> 
      )
    } else if (utils.is_file_sensor(label)){
      return (
        <Grid item xs={12} key={label} >
          <Box sx={{ display: 'flex', alignItems: 'center' }} >
            <Button variant="contained" component="label" className={classes.uploadButton} >
              {sanitizer(label)}
              <input hidden name={label} type="file" onChange={ e=> {handleChange(e, label); handleNameChange(e)} }/>
            </Button>
            {fileName && 
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">{fileName}</Typography>
                </Box>
            }
          </Box>
        <FormHelperText>{help_text}</FormHelperText>
      </Grid> 
      )
              
    }else if (utils.is_sensor_label(label)) {
      return (
        <Grid item xs={12} key={label} >
          <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[optionList[0], optionList[1] ]}
          isMulti
          options={optionList}
          onChange={e=>handleChange(e, label)}
          /> 
        </Grid> 


      )
    }else{
      return (
        <Grid item xs={12} key={label}>
          <TextField
            variant="outlined"
            required={required}
            fullWidth
            id={label}
            label={label}
            name={label}
            value={val}
            autoComplete={label}
            onChange={changable? handleChange:null}
            multiline={utils.multiRowsField(label)}
            minRows={8}
            helperText={help_text}
          />
        </Grid>
      );
    }
  };

export default CreateBlock;