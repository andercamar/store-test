import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useCart } from "../context/CartContext";

function Info() {
  const { cart,calculateTotal } = useCart();

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        {`R$ ${calculateTotal()}`}
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
            <ListItem key={product.id} sx={{ py: 1, px: 0 }}>
              <ListItemText
                sx={{ mr: 2 }}
                primary={product.name}
                secondary={`Qtd: ${product.quantity}`}
              />
              <Typography variant="body1" sx={{ fontWeight: 'small' }}>
                {`R$ ${(product.quantity*product.price).toFixed(2)}`}
              </Typography>
            </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

export default Info;