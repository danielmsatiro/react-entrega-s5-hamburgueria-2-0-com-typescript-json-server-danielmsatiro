import { Header } from "../../components/Header";
import { Card } from "../../components/Card";
import { Container, Grid } from "@mui/material";
import { useProducts } from "../../contexts/ProductsContext";
import { useEffect, useState } from "react";
import { Cart } from "../../components/Cart";

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { products, loadProducts } = useProducts();
  const [openCart, setOpenCart] = useState(false);

  const handleCartOpen = () => {
    setOpenCart(true);
  };

  const handleCartClose = () => {
    setOpenCart(false);
  };

  useEffect(() => {
    loadProducts().then((res) => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Header handleCartOpen={handleCartOpen} />
      <Container maxWidth="lg" xs={{ margimX: { lg: "115px" } }}>
        <Cart openCart={openCart} handleCartClose={handleCartClose} />
        <Grid container spacing={4} paddingTop="25px" justifyContent="center">
          {products.map((product) => (
            <Grid item key={product.id}>
              <Card
                id={product.id}
                name={product.name}
                category={product.category}
                price={product.price}
                img={product.img}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
