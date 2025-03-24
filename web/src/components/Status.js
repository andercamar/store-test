import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const OrderStatusMessage = ({ success, message }) => {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {success ? 'Obrigado pela sua compra!' : 'Algo deu errado.'}
      </Typography>
      <Typography variant="body1" color={success ? 'text.primary' : 'error'}>
        {message}
      </Typography>
    </Box>
  );
};

export default OrderStatusMessage;
