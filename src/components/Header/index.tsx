import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { theme } from "../../styles/theme";
import Logo from "../../assets/logo.svg";
import { FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Badge } from "@mui/material";
import { Search } from "./Search";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    color: "white",
    fontWeight: "bold",
    top: "6px",
    right: "6px",
    width: "20px",
    height: "24px",
    boderRadius: "7px",
  },
}));

interface HeaderProps {
  handleCartOpen: () => void;
}

export const Header = ({ handleCartOpen }: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const { cart, loadCart } = useCart();
  const { user, accessToken, signOut } = useAuth();

  useEffect(() => {
    loadCart(user.id, accessToken);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          background: theme.palette.grey[50],
          height: "80px",
          justifyContent: "center",
          boxShadow: "none",
          alignItems: "center",
        }}
        position="static"
      >
        <Toolbar
          sx={{
            width: "100%",
            maxWidth: "lg",
            marginX: { lg: "115px" },
          }}
        >
          <Box
            sx={{
              display: { xs: showSearch ? "none" : "block" },
              md: "block",
              backgroundImage: `url(${Logo})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              width: "240px",
              height: "36px",
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Search showSearch={showSearch} setShowSearch={setShowSearch} />

          <StyledBadge badgeContent={cart.length} color="primary">
            <IconButton onClick={handleCartOpen}>
              <FaShoppingCart color={theme.palette.grey[400]} size="25px" />
            </IconButton>
          </StyledBadge>
          <IconButton onClick={signOut}>
            <MdLogout color={theme.palette.grey[400]} size="25px" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
