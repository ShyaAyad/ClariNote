import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import { styled } from "@mui/material/styles";
import {UploadFileRounded, PictureAsPdfRounded} from "@mui/icons-material";
import { useEffect, useState } from "react";
import * as api from "../API/api.js";

export default function Lectures() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: "12px 16px",
    color: theme.palette.text.primary,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderRadius: "8px",
    boxShadow: "none",
    border: "1px solid #e0e0e0",
  }));

  const [lectures, setLectuers] = useState([]);

  const fetchLectures = async () => {
    const res = await api.lectures();
    const allLectures = res.data.data;
    setLectuers(allLectures);
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleUpload}>
      <Button
        variant="contained"
        type="submit"
        sx={{ marginBottom: "15px" }}
        startIcon={<UploadFileRounded />}
      >
        Upload lecture
      </Button>
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          {lectures.map((lecture, id) => (
            <Item key={id}>
              <PictureAsPdfRounded />
              <Box sx={{display: "flex", flexDirection: "column"}}>
                {lecture.title}
                <Typography
                  sx={{ fontWeight: "200", color: "gray" }}
                >
                  {lecture.created_at.substr(0, 10)}
                </Typography>
              </Box>
            </Item>
          ))}
        </Stack>
      </Box>
    </form>
  );
}
