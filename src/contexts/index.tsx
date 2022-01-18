import { ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../styles/theme";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
