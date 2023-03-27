import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props}/>
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel(progress) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
      { progress > 0 && progress < 50 && 
        <Typography variant="body2" color="text.secondary">
          Uploading data ...  
        </Typography>}
      {progress >= 50 && progress < 100 && 
        <Typography variant="body2" color="text.secondary">
          Data uploaded. Now, adding it to database. Please wait ...  
        </Typography>
      }
    </Box>
  );
}