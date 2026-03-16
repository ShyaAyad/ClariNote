import { Button, Input, TextField, Typography, Box } from "@mui/material";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { uploadLecture } from "../API/api.js";
import { useState } from "react";

const UploadLecture = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      if (!title || !file) {
        alert("Please provide both title and pdf file.");
        return;
      }
      setUploading(true);
      const res = await uploadLecture(title, file);
      console.log(res.data);
    } catch (error) {
      console.error("Error uploading lecture: ", error.response.data);
    }finally{
      setUploading(false);
    }
  };
  
  return (
    <form
      onSubmit={handleUpload}
      style={{
        width: "100%",
      }}
    >
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
      <Box
        sx={{
          border: "1px dashed rgba(99,179,237,0.3)",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
          mb: 2,
          background: "rgba(99,179,237,0.03)",
          "&:hover": {
            background: "rgba(99,179,237,0.06)",
            borderColor: "rgba(99,179,237,0.5)",
          },
          transition: "all 0.2s ease",
        }}
      >
        <UploadFileRoundedIcon
          sx={{ color: "#63b3ed", fontSize: "2rem", mb: 1 }}
        />
        <Typography sx={{ color: "#606880", fontSize: "13px", mb: 1 }}>
          {file ? file.name : "Choose a PDF file"}
        </Typography>
        <Input
          type="file"
          inputProps={{ accept: ".pdf" }}
          onChange={(e) => setFile(e.target.files[0])}
          sx={{
            color: "#a0a8c0",
            "& input::file-selector-button": {
              background: "rgba(99,179,237,0.1)",
              color: "#63b3ed",
              border: "1px solid rgba(99,179,237,0.3)",
              borderRadius: "6px",
              padding: "4px 12px",
              cursor: "pointer",
            },
          }}
        />
      </Box>

      <Button
        variant="contained"
        type="submit"
        sx={{
          py: 1.2,
          borderRadius: "10px",
          background: uploading
            ? "rgba(99,179,237,0.1)"
            : "linear-gradient(135deg, #3b82f6, #6366f1)",
          color: uploading ? "#63b3ed" : "#fff",
          border: uploading ? "1px solid rgba(99,179,237,0.3)" : "none",
          fontWeight: 600,
          width: "100%",
          textTransform: "none",
          fontSize: "14px",
          boxShadow: uploading ? "none" : "0 4px 20px rgba(99,102,241,0.35)",
          "&:hover:not(:disabled)": {
            background: "linear-gradient(135deg, #2563eb, #4f46e5)",
          },
        }}
        startIcon={<UploadFileRoundedIcon />}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </Button>
    </form>
  );
};

export default UploadLecture;
