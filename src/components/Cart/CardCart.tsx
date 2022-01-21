import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { theme } from "../../styles/theme";

interface CardCartPros {
  name: string;
  img: string;
  id: number;
  quantity: number;
}

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&.MuiIconButton-root": {
    borderRadius: "0",
    width: "30px",
    height: "34px",
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.secondary.main,
  },
}));

export const CardCart = ({ name, img, id, quantity }: CardCartPros) => {
  const { removeProduct, addProduct, subtractProduct } = useCart();
  const { accessToken, user } = useAuth();

  const handleSubtract = () => {
    if (quantity === 1) {
      removeProduct(id, accessToken);
    } else {
      subtractProduct(quantity, id, user.id, accessToken);
    }
  };

  return (
    <Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
      <Box
        width={80}
        height={80}
        sx={{
          backgroundImage: `url(${img})`,
          backgroundSize: "80%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          border: `solid 1px ${theme.palette.grey[100]}`,
          borderRadius: "5px",
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Stack justifyContent={"center"}>
          <Typography variant="h3">{name}</Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            width={106}
            height={34}
          >
            <StyledIconButton
              onClick={() => {
                handleSubtract();
              }}
            >
              -
            </StyledIconButton>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              flexGrow={1}
              sx={{
                height: "100%",
                border: `solid 1px ${theme.palette.grey[100]}`,
              }}
            >
              <Typography variant="body2">{quantity}</Typography>
            </Grid>
            <StyledIconButton
              onClick={() => addProduct(quantity, id, user.id, accessToken)}
            >
              +
            </StyledIconButton>
          </Stack>
        </Stack>
      </Box>
      <Box>
        <IconButton onClick={() => removeProduct(id, accessToken)}>
          <FaTrash size={15} />
        </IconButton>
      </Box>
    </Stack>
  );
};
