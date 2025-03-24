import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box, Grid, TextField } from "@mui/material";

const Product = ({ product, addToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    const newQuantity = Math.min(Math.max(1, event.target.value), product.stock);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (quantity <= product.stock) {
      addToCart({ ...product, quantity });
    } else {
      alert("Quantidade solicitada excede o estoque disponível.");
    }
  };

  const name = product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name;
  const description = product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ width: 250, margin: "auto", boxShadow: 6, borderRadius: 4, display: "flex", flexDirection: "column", height: "100%", padding: 2 }}>
        <CardMedia
          component="img"
          height="250"
          image={product.image_url}
          alt={product.name}
          sx={{ objectFit: "cover", borderTopLeftRadius: 3, borderTopRightRadius: 3 }}
        />
        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", marginBottom: 1 }} title={product.name}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {description}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
            R$ {product.price.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
            Estoque: {product.stock}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={product.stock === 0 || quantity > product.stock}
              onClick={handleAddToCart}
              sx={{
                backgroundColor: product.stock > 0 ? "#1976d2" : "#cccccc",
                "&:hover": {
                  backgroundColor: product.stock > 0 ? "#1565c0" : "#cccccc",
                },
              }}
            >
              {product.stock > 0 ? "Adicionar ao Carrinho" : "Sem Estoque"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Product;
