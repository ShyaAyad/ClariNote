import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { UploadFileRounded, PictureAsPdfRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import * as api from "../API/api.js";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      <Box>
        <Stack spacing={2}>
          {lectures.map((lecture, id) => (
            <Item
              key={id}
              onClick={() => navigate(`/lecture/${lecture.id}`)}
              sx={{
                cursor: "pointer",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                color: "#f0f4ff",
                transition: "all 0.2s ease",
                "&:hover": {
                  background: "rgba(99,179,237,0.08)",
                  border: "1px solid rgba(99,179,237,0.25)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                },
              }}
            >
              <PictureAsPdfRounded />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {lecture.title}
                <Typography sx={{ fontWeight: "200", color: "gray" }}>
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
