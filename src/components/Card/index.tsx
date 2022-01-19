import { Box, Button, Stack, Typography } from "@mui/material";
import { theme } from "../../styles/theme";

interface CardProps {
  name: string;
  category: string;
  price: number;
  img: string;
  id: number;
}

export const Card = ({ name, category, price, img, id }: CardProps) => {
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
            onClick={() => console.log(id)}
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
