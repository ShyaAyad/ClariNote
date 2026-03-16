import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { searchLecture } from "../API/api.js";
import { useState } from "react";

const SearchInput = ({ setSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults(null);
      return;
    }

    try {
      const resp = await searchLecture(searchQuery);
      console.log(resp.data.searchResult);
      setSearchResults(resp.data.searchResult);

    } catch (error) {
      console.log("Failed to return lecture", error);
    }
  };

  return (
    <TextField
      value={searchQuery}
      placeholder="Search lecture..."
      variant="outlined"
      fullWidth
      size="small"
      onChange={(e) => {
        setSearchQuery(e.target.value);
        if (e.target.value === "") setSearchResults(null);
      }}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.secondary" }} />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: "#f5f5f5",
          "& fieldset": {
            border: "none",
          },
          "&:hover fieldset": {
            border: "none",
          },
          "&.Mui-focused fieldset": {
            border: "1.5px solid #1976d2",
          },
        },
      }}
    />
  );
};

export default SearchInput;
