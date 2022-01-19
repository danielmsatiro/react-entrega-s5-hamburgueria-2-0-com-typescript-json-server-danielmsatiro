import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { AuthProvider } from "./AuthContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AuthProvider>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </AuthProvider>
);
