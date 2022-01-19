import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { AuthProvider } from "./AuthContext";
import { ProductProvider } from "./ProductsContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <ProductProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ProductProvider>
  </AuthProvider>
);
