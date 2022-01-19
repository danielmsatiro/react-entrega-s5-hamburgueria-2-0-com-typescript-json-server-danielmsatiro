import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { theme } from "../../styles/theme";
import Logo from "../../assets/logo.svg";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Badge } from "@mui/material";
import { Search } from "./Search";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

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

export const Header = () => {
  const [showSearch, setShowSearch] = useState(false);

  const { signOut } = useAuth();

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
            }}
          >
            <img src={Logo} alt="" />
          </Box>

          <Box sx={{ flexGrow: 1 }} />
          <Search showSearch={showSearch} setShowSearch={setShowSearch} />

          <StyledBadge badgeContent={4} color="primary">
            <IconButton>
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
