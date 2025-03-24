import React from "react";
import { List, ListItem, ListItemText, Button, Typography, IconButton, Divider } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../context/CheckoutContext";

const Cart = () => {
  const { clearCheckoutData  } = useCheckout();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate(); 
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };
  const handleCheckout = () => {
    clearCheckoutData();
    navigate("/checkout");
  };

  return (
    <div style={{ padding: 30, backgroundColor: "#f5f5f5", borderRadius: 8, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: "bold", color: "#333" }}>
        Carrinho de Compras
      </Typography>

      <List>
        {cart.map((item) => (
          <div key={item.id}>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 20px",
                backgroundColor: "#fff",
                marginBottom: "10px",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <ListItemText
                primary={item.name}
                secondary={`R$ ${item.price.toFixed(2)} - Quantidade: ${item.quantity} - Estoque: ${item.stock}`}
                primaryTypographyProps={{ fontWeight: "bold", fontSize: 16 }}
                secondaryTypographyProps={{ color: "#777" }}
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                  disabled={item.quantity <= 1}
                  style={{ color: "#ff5722" }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" style={{ margin: "0 10px", fontWeight: "bold" }}>
                  {item.quantity}
                </Typography>
                <IconButton
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  style={{ color: "#4caf50" }}
                >
                  <AddIcon />
                </IconButton>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeFromCart(item.id)}
                  style={{ marginLeft: 10 }}
                >
                  Remover
                </Button>
              </div>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>

      {cart.length > 0 && (
        <div style={{ marginTop: 20, textAlign: "right" }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Total: R$ {calculateTotal()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 20, padding: "10px 20px", borderRadius: 20 }}
            onClick={handleCheckout}
          >
            Finalizar Compra
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
