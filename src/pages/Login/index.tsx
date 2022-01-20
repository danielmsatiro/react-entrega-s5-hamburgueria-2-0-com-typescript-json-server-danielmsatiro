import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Box,
  Container,
} from "@mui/material";
import {} from "@mui/system";
import { theme } from "../../styles/theme";
import Logo from "../../assets/logo.svg";
import Balls from "../../assets/balls.svg";
import { FiShoppingBag } from "react-icons/fi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { useState } from "react";

interface SignInData {
  email: string;
  password: string;
}

const signInSchema = yup.object().shape({
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export const Login = () => {
  const upMD = useMediaQuery(theme.breakpoints.up("md"));

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = (data: SignInData) => {
    setLoading(true);
    signIn(data)
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const history = useHistory();

  return (
    <Container maxWidth="lg">
      <Grid
        container
        sx={{ height: "100vh", width: "100%", padding: "19px" }}
        justifyContent="center"
        alignContent="center"
        flexWrap="wrap-reverse"
      >
        <Grid
          md={6}
          item
          component="form"
          sx={{
            border: `2px solid ${theme.palette.grey[50]}`,
            width: "100%",
            padding: "24px",

            borderRadius: "5px",
          }}
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing={2}>
            <Typography variant="h3">Login</Typography>
            <TextField
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Senha"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              type="password"
            />
            <Button variant="default" type="submit">
              Logar
            </Button>
            <Typography
              variant="body1"
              color={theme.palette.grey[300]}
              textAlign="center"
            >
              Crie sua conta para saborear muitas delicias e<br />
              matar sua fome
            </Typography>
            <Button
              variant="default-grey"
              onClick={() => history.push("/signup")}
            >
              Cadastrar
            </Button>
          </Stack>
        </Grid>
        <Grid
          md={6}
          item
          paddingLeft={upMD ? "60px" : "0px"}
          paddingBottom={upMD ? "0px" : "24px"}
          sx={{
            width: "100%",
          }}
        >
          <Stack spacing={3} justifyContent="center" height="100%">
            <Box>
              <img src={Logo} alt="logo" />
            </Box>
            <Grid
              container
              alignItems="center"
              justifyContent="space-around"
              flexWrap="nowrap"
              spacing={2}
              sx={{
                border: `1px solid ${theme.palette.grey[100]}`,
                width: "100%",
                padding: "14px",
                borderRadius: "5px",
                boxShadow: "0px 4px 40px -20px #00000040",
              }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="center"
                minWidth="60px"
                sx={{
                  backgroundColor: "rgba(39, 174, 96, 0.1);",
                  height: "60px",
                  width: "60px",
                  borderRadius: "5px",
                }}
              >
                <FiShoppingBag size={20} color={theme.palette.primary.main} />
              </Grid>
              <Typography
                component="p"
                variant="subtitle1"
                color={theme.palette.grey[300]}
                maxWidth="261px"
                ml="19px"
              >
                A vida é como um sanduíche, é preciso recheá-la com os{" "}
                <b>melhores</b> ingredientes.
              </Typography>
            </Grid>
            {upMD && (
              <Box>
                <img src={Balls} alt="" />
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
