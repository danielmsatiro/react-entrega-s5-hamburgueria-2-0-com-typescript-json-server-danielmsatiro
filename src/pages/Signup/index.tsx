import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  Box,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { theme } from "../../styles/theme";
import Logo from "../../assets/logo.svg";
import Balls from "../../assets/balls.svg";
import { FiShoppingBag } from "react-icons/fi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirm_password?: string;
}

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
});

export const Signup = () => {
  const upMD = useMediaQuery(theme.breakpoints.up("md"));
  const [loading, setLoading] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);

  const handleCloseError = () => {
    setOpenError(false);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignUp = ({ name, email, password }: SignUpData) => {
    setLoading(true);
    api
      .post("/register", { name, email, password })
      .then((res) => {
        setLoading(false);
        setOpenInfo(true);
      })
      .catch((err) => {
        setOpenError(true);
        setLoading(false);
      });
  };

  const history = useHistory();

  return (
    <>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseError}
          severity="error"
          sx={{ width: "100%" }}
        >
          Email já cadastrado
        </Alert>
      </Snackbar>
      <Snackbar
        open={openInfo}
        autoHideDuration={6000}
        onClose={handleCloseInfo}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseInfo} severity="info" sx={{ width: "100%" }}>
          Cadastro Realizado! Retorne ao Login.
        </Alert>
      </Snackbar>
      <Container maxWidth="lg">
        <Grid
          container
          sx={{ height: "100vh", width: "100%", padding: "19px" }}
          justifyContent="center"
          alignContent="center"
          flexWrap="wrap"
        >
          <Grid
            md={6}
            item
            paddingRight={upMD ? "60px" : "0px"}
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
            onSubmit={handleSubmit(handleSignUp)}
          >
            <Stack spacing={2}>
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3">Cadastro</Typography>
                <Button
                  variant="text"
                  sx={{
                    color: theme.palette.grey[300],
                    fontSize: "0.875rem",
                    textDecoration: "underline",
                    padding: "0px",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                  }}
                  onClick={() => history.push("/")}
                >
                  Retornar para o login
                </Button>
              </Stack>
              <TextField
                label="Nome"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
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
              <TextField
                label="Confirmar Senha"
                {...register("confirm_password")}
                error={!!errors.confirm_password}
                helperText={errors.confirm_password?.message}
                type="password"
              />
              <Button type="submit" variant="default-grey">
                Cadastrar
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
