

import * as React from 'react';
import {useState} from 'react';
import * as utils from './utils';
import { sanitizer } from './utils';
import useStyles from './FormStyle';
//MaterialUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormHelperText } from '@mui/material';
import { ClassNames } from '@emotion/react';

const convert_to_string = (field, value) => {

  const field_type = field[1].field_type;

  if (!value){
    return 'None'
  };

  if (field_type==='JSON') {
    return JSON.stringify(value);
  } else if (field_type==='Array'){
    return `[${value.toString()}]`;
  } else {
    return value.toString();
  };

};

const DetailBlock = (field, value) =>{  
		const label = field[0];
		const required = field[1].required_view;
    const changable = field[1].changable;

    let val = value
    if (!changable) {
      val = convert_to_string(field, value);
    };

		return (
			<Grid item xs={12} key={field}>
				<TextField
					variant="outlined"
					required={required}
					fullWidth
					id={label}
					label={label}
					name={label}
					autoComplete={label}
					multiline={utils.multiRowsField(label)}
					onChange={null}
					minRows={8}
					value={val}
				/>
			</Grid>
		);		
};
 
export default DetailBlock;