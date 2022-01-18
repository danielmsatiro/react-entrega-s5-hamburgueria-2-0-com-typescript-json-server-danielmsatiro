import { createTheme } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    default: true;
    medium: true;
    "default-grey": true;
    "medium-grey": true;
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: "#27AE60",
      light: "#93D7AF",
    },
    secondary: {
      main: "#EB5757",
    },
    grey: {
      50: "#f5f5f5",
      100: "#E0E0E0",
      300: "#828282",
      500: "#333333",
    },
    error: {
      main: "#E60000",
    },
    warning: {
      main: "#FFCD07",
    },
    success: {
      main: "#168821",
    },
    info: {
      main: "#155BCB",
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: "bold",
      fontSize: "1.625rem",
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: "bold",
      fontSize: "1.375rem",
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: "bold",
      fontSize: "1.125rem",
    },
    subtitle1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: "regular",
      fontSize: "1rem",
    },
    body1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: "regular",
      fontSize: "0.875rem",
    },
    body2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: "SemiBold",
      fontSize: "0.875rem",
    },
    caption: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: "regular",
      fontSize: "0.75rem",
    },
    button: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: "600",
      fontSize: "1rem",
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "white",
          borderRadius: "8px",
        },
      },
      variants: [
        {
          props: { variant: "default" },
          style: {
            height: "60px",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          },
        },
        {
          props: { variant: "default-grey" },
          style: {
            height: "60px",
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.grey[300],
            "&:hover": {
              backgroundColor: theme.palette.grey[300],
              color: theme.palette.grey[100],
            },
          },
        },
        {
          props: { variant: "medium" },
          style: {
            height: "40px",
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          },
        },
        {
          props: { variant: "medium-grey" },
          style: {
            height: "40px",
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.grey[300],
            "&:hover": {
              backgroundColor: theme.palette.grey[300],
              color: theme.palette.grey[100],
            },
          },
        },
      ],
    },
  },
});

export { theme };
