import { Box, Button, Stack, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { theme } from "../../styles/theme";

interface CardProps {
  name: string;
  category: string;
  price: number;
  img: string;
  id: number;
}

export const Card = ({ name, category, price, img, id }: CardProps) => {
  const { accessToken, user } = useAuth();
  const { cart, createProduct, addProduct } = useCart();

  const handleProduct = () => {
    /* Busca um produto que já exista com o mesmo name no Cart*/
    const productFound = cart.find((product) => product.name === name);

    if (!productFound) {
      const newProduct = {
        name,
        category,
        price,
        img,
        userId: user.id,
        quantity: 1,
      };
      return createProduct(newProduct, accessToken);
    }

    addProduct(productFound.quantity, productFound.id, user.id, accessToken);
  };

  return (
    <Box
      width="300px"
      height="346px"
      borderRadius={2}
      sx={{
        border: `2px solid ${theme.palette.grey[100]}`,
        transition: theme.transitions.create("all"),

        "&:hover": {
          border: `2px solid ${theme.palette.primary.main}`,
          transform: "scale(1.1)",
          button: {
            backgroundColor: theme.palette.primary.main,
            color: "white",
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          },
        },
      }}
    >
      <Box
        height="150px"
        sx={{
          backgroundImage: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></Box>
      <Box>
        <Stack padding="21px" spacing={2}>
          <Typography variant="h3" color={theme.palette.grey[600]}>
            {name}
          </Typography>
          <Typography variant="caption" color={theme.palette.grey[300]}>
            {category}
          </Typography>
          <Typography variant="body1" color="primary" fontWeight="bold">
            R$ {price.toFixed(2)}
          </Typography>
          <Button
            onClick={() => handleProduct()}
            variant="medium-grey"
            sx={{ width: "106px" }}
          >
            Adicionar
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
