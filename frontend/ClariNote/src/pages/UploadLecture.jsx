import { Button, Input, TextField, Typography } from "@mui/material";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import { uploadLecture } from "../API/api.js";
import { useState } from "react";

const UploadLecture = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async(e) => {
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
      <Typography variant="h5">Upload a pdf</Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        sx={{ margin: "12px 0" }}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="file"
        inputProps={{ accept: ".pdf" }}
        onChange={(e) => setFile(e.target.files[0])}
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
