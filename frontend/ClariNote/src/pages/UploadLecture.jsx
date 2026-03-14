import { Button, Input, TextField, Typography } from "@mui/material";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { uploadLecture } from "../API/api.js";
import { useState } from "react";

const UploadLecture = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      if (!title || !file) {
        alert("Please provide both title and pdf file.");
        return;
      }

      const res = await uploadLecture(title, file);
      console.log("Uploaded file: ", res);
    } catch (error) {
      console.error("Error uploading lecture: ", error.response.data);
    }
  };
  return (
    <form onSubmit={handleUpload}>
      <Typography
        variant="h5"
        sx={{ color: "#f0f4ff", fontWeight: 700, mb: 1 }}
      >
        Upload a pdf
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        sx={{
          margin: "12px 0",
          "& .MuiOutlinedInput-root": {
            color: "#f0f4ff",
            "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
            "&:hover fieldset": { borderColor: "rgba(99,179,237,0.5)" },
            "&.Mui-focused fieldset": { borderColor: "#63b3ed" },
          },
          "& .MuiInputLabel-root": { color: "#606880" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#63b3ed" },
        }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="file"
        inputProps={{ accept: ".pdf" }}
        onChange={(e) => setFile(e.target.files[0])}
        sx={{
          color: "#a0a8c0",
          display: "block",
          mb: 2,
          "& input::file-selector-button": {
            background: "rgba(99,179,237,0.1)",
            color: "#63b3ed",
            border: "1px solid rgba(99,179,237,0.3)",
            borderRadius: "6px",
            padding: "4px 12px",
            cursor: "pointer",
            marginRight: "12px",
          },
        }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ marginBottom: "15px" }}
        startIcon={<UploadFileRoundedIcon />}
      >
        Upload
      </Button>
    </form>
  );
};

export default UploadLecture;
