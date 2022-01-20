import { IconButton, InputBase, Stack } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Box } from "@mui/system";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useProducts } from "../../contexts/ProductsContext";

interface SearchData {
  nameOrCategory: string;
}

interface SearchProps {
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
}

export const Search = ({ showSearch, setShowSearch }: SearchProps) => {
  const [focus, setFocus] = useState(false);
  const { searchProduct } = useProducts();

  const handleSearch = ({ nameOrCategory }: SearchData) => {
    searchProduct(nameOrCategory);
  };

  const { register, handleSubmit } = useForm<SearchData>();

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
        onSubmit={handleSubmit(handleSearch)}
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
            {...register("nameOrCategory")}
            onFocus={() => setFocus(!focus)}
            onBlur={() => {
              setFocus(!focus);
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
