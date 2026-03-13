import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function Lectures() {
  const handleUpload = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleUpload}>
      <Button
        variant="contained"
        type="submit"
        sx={{ marginBottom: "15px" }}
        startIcon={<UploadFileRoundedIcon />}
      >
        Upload lecture
      </Button>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
        </Stack>
      </Box>
    </form>
  );
}
