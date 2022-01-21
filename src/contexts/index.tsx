import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { AuthProvider } from "./AuthContext";
import { ProductProvider } from "./ProductsContext";
import { CartProvider } from "./CartContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <ProductProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CartProvider>
    </ProductProvider>
  </AuthProvider>
);
