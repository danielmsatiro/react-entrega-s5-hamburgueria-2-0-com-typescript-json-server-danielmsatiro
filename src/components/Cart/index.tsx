import { Box, Button, Dialog, Divider, Stack, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { api } from "../../services/api";
import { theme } from "../../styles/theme";
import { CardCart } from "./CardCart";

interface CartProps {
  handleCartClose: () => void;
  openCart: true;
}

export const Cart = ({ handleCartClose, openCart }: CartProps) => {
  const { cart, setCart } = useCart();
  const { accessToken } = useAuth();

  const removeAllProducts = () => {
    cart.forEach(async (product) => {
      await api.delete(`/cart/${product.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });
    setCart([]);
  };

  return (
    <>
      <Dialog
        onClose={handleCartClose}
        aria-labelledby="customized-dialog-title"
        open={openCart}
      >
        <Stack
          flexDirection={"column"}
          minHeight={"212px"}
          sx={{ width: { xs: "300px", sm: "460px", md: "500px" } }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: "54px",
              paddingX: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" color="white">
              Carrinho de Compras
            </Typography>
          </Box>
          {!cart.length ? (
            <Stack
              spacing={1}
              alignItems="center"
              justifyContent="center"
              height="160px"
            >
              <Typography variant="h3">A sacola está vazia</Typography>
              <Typography variant="body1" color="grey.300">
                Adicione itens
              </Typography>
            </Stack>
          ) : (
            <Stack
              padding={"20px"}
              spacing={2}
              divider={<Divider orientation="horizontal" flexItem />}
            >
              <Stack spacing={2}>
                {cart.map((product) => (
                  <CardCart
                    name={product.name}
                    img={product.img}
                    id={product.id}
                    key={product.id}
                    quantity={product.quantity}
                  />
                ))}
              </Stack>
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="subtitle1" fontSize={14}>
                    Total
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    color="grey.600"
                  >
                    R${" "}
                    {cart
                      .reduce(
                        (acc, { price, quantity }) => acc + price * quantity,
                        0
                      )
                      .toFixed(2)}
                  </Typography>
                </Stack>
                <Button
                  variant="default-grey"
                  onClick={() => {
                    removeAllProducts();
                    handleCartClose();
                  }}
                >
                  Remover Todos
                </Button>
              </Stack>
            </Stack>
          )}
        </Stack>
      </Dialog>
    </>
  );
};
