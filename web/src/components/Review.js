import * as React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useCheckout } from '../context/CheckoutContext';
import { useCart } from "../context/CartContext";

export default function Review() {
  const { calculateTotal,calculateItems } = useCart();
  const { checkoutData } = useCheckout();
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary={`${calculateItems()} selected`} />
          <Typography variant="body2">{`R$ ${calculateTotal()}`}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`R$ ${calculateTotal()}`}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Detalhes
          </Typography>
          <Typography gutterBottom>{checkoutData.user_name}</Typography>
          <Typography gutterBottom>{checkoutData.user_email}</Typography>
          <Typography gutterBottom>{checkoutData.address}</Typography>
          <Typography gutterBottom>{checkoutData.city}</Typography>
          <Typography gutterBottom>{checkoutData.state}</Typography>
          <Typography gutterBottom>{checkoutData.postal_code}</Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Detalhes do Pagamento
          </Typography>
          <Typography gutterBottom>{checkoutData.payment_method}</Typography>
          <Grid container>
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}