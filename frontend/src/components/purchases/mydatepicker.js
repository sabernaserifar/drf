import dayjs from 'dayjs';
import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function MaterialUIPickers() {
    const [ordertime, setOrdertime] = useState(dayjs('2023-01-01T00:00:00'));
    const [deliverytime, setDeliverytime] = useState(dayjs('2023-01-01T00:00:00'));


  //   const handleChange = (newValue) => {
  //   setValue(newValue);
  // };
  console.log('My time', dayjs('')) ;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DateTimePicker
          label="Date&Time picker"
          value={ordertime}
          onChange={(e)=>{setOrdertime(e)}}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}