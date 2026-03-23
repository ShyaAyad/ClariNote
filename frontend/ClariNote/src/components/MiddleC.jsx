import Typography from "@mui/material/Typography";
import { useUserStore } from "../store/user.store.js";
import Lectures from "./Lectures";
import SearchInput from "./SearchInput";
import { useState } from "react";

const MiddleC = () => {
  const user = useUserStore((state) => state.user);
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div style={{ width: "100%" }}>
      <SearchInput setSearchResults={setSearchResults} />
      <Typography variant="h5" sx={{ marginTop: "20px" }}>
        My Lectures
      </Typography>
      <Typography
        variant="h6"
        sx={{ marginBottom: "20px", fontWeight: "300", fontFamily: "" }}
      >
        Welcome back, {user.name}!
      </Typography>
      <Lectures searchResults={searchResults} />
    </div>
  );
};

export default MiddleC;
