import {
  FormControl,
  IconButton,
  Input,
  InputBase,
  Stack,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { BlockList } from "net";
import { useState } from "react";

interface SearchProps {
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
}

export const Search = ({ showSearch, setShowSearch }: SearchProps) => {
  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);

  return (
    <>
      <IconButton
        onClick={() => setShowSearch(true)}
        sx={{
          display: {
            sm: "none",
            xs: showSearch ? "none" : "Block",
          },
        }}
      >
        <FaSearch size={18} color={theme.palette.grey[400]} />
      </IconButton>
      <Box
        component="form"
        sx={{
          marginLeft: "14px",
          border: `2px solid`,
          borderColor: focus
            ? theme.palette.grey[600]
            : theme.palette.grey[100],
          padding: "10px",
          borderRadius: "8px",
          display: {
            sm: "Block",
            xs: showSearch ? "Block" : "none",
          },
        }}
      >
        <Stack flexDirection="row">
          <InputBase
            placeholder="Digitar Pesquisa"
            onFocus={() => toggle()}
            onBlur={() => {
              toggle();
              setShowSearch(false);
            }}
          />
          <IconButton
            type="submit"
            sx={{
              width: "53px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: theme.palette.primary.main,
              "&::placeholder": {
                color: "red",
              },
            }}
          >
            <FaSearch size={18} color="white" />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
};
