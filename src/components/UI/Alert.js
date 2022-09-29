import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useStateValue } from '../../StateProvider';

const AlertUI = ({}) => {
  const [{ severity, alertMsg, open }, dispatch] = useStateValue();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({
      type: 'CLOSE_ALERT',
    });
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={1000}
      onClose={handleClose}
      key='bottom + right'
    >
      <Alert
        variant='filled'
        onClose={handleClose}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {alertMsg}
      </Alert>
    </Snackbar>
  );
};

export default AlertUI;
