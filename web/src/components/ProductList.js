import React, { useEffect, useState } from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";
import Product from "./Product";
import { fetchProducts } from "../services/api.service";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((response) => {
        setProducts(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <Typography variant="h6">Nenhum produto encontrado.</Typography>;
  }

  return (
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Product product={product} addToCart={addToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
