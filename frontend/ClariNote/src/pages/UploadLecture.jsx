import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

const UploadLecture = () => {
  const handleUpload = () => {
    console.log("Upload file here");
  };
  return (
    <form onSubmit={handleUpload}>
      <Typography variant="h5">Upload a pdf</Typography>
      <Input type="file" />
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
