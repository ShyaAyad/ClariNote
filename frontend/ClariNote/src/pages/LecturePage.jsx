import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
  Skeleton,
} from "@mui/material";
import { ArrowBack, AutoAwesome, BookOutlined } from "@mui/icons-material";
import * as api from "../API/api.js";

export default function LecturePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lecture, setLecture] = useState(null);
  const [summary, setSummary] = useState("");
  const [loadingLecture, setLoadingLecture] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.getLecture(id);
      const content = res.data.data;
      setLecture(content);
      setLoadingLecture(false);
    };
    fetch();
  }, [id]);

  const summarize = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const summarizeContent = await api.summarizeLecture(id);
      setSummary(summarizeContent.data);
    } finally{
      setIsLoading(false);
    }
  };

  if (loadingLecture) return <CircularProgress />;

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
        padding: { xs: "16px", sm: "32px" },
        fontFamily: "'Georgia', serif",
      }}
    >
      <Box sx={{ maxWidth: "760px", margin: "0 auto" }}>
        <IconButton
          onClick={() => navigate("/")}
          sx={{
            mb: 3,
            color: "#a0a8c0",
            border: "1px solid rgba(160,168,192,0.2)",
            borderRadius: "10px",
          }}
        >
          <ArrowBack fontSize="small" />
        </IconButton>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "700",
              color: "#f0f4ff",
              lineHeight: 1.3,
              fontSize: { xs: "1.6rem", sm: "2rem" },
              letterSpacing: "-0.02em",
              mb: 1,
            }}
          >
            {lecture.title}
          </Typography>
          <Typography
            sx={{
              color: "#606880",
              fontSize: "13px",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {lecture.created_at.substr(0, 10)}
          </Typography>
        </Box>

        {/* Summarize button */}
        <Button
          onClick={summarize}
          disabled={isLoading}
          startIcon={
            isLoading ? null : (
              <AutoAwesome sx={{ fontSize: "16px !important" }} />
            )
          }
          sx={{
            mb: 3,
            px: 3,
            py: 1.2,
            borderRadius: "10px",
            background: isLoading
              ? "rgba(99,179,237,0.1)"
              : "linear-gradient(135deg, #3b82f6, #6366f1)",
            color: isLoading ? "#63b3ed" : "#fff",
            border: isLoading ? "1px solid rgba(99,179,237,0.3)" : "none",
            fontWeight: 600,
            fontSize: "14px",
            letterSpacing: "0.02em",
            textTransform: "none",
            boxShadow: isLoading ? "none" : "0 4px 20px rgba(99,102,241,0.35)",
            transition: "all 0.2s ease",
            "&:hover:not(:disabled)": {
              background: "linear-gradient(135deg, #2563eb, #4f46e5)",
              boxShadow: "0 6px 24px rgba(99,102,241,0.5)",
              transform: "translateY(-1px)",
            },
            "&:disabled": { cursor: "not-allowed" },
          }}
        >
          {isLoading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  border: "2px solid rgba(99,179,237,0.3)",
                  borderTopColor: "#63b3ed",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                  "@keyframes spin": { to: { transform: "rotate(360deg)" } },
                }}
              />
              Generating summary...
            </Box>
          ) : (
            "Summarize"
          )}
        </Button>

        {isLoading && (
          <Box
            sx={{
              mb: 3,
              background: "rgba(99,179,237,0.05)",
              border: "1px solid rgba(99,179,237,0.15)",
              borderRadius: "14px",
              padding: "24px",
            }}
          >
            <Typography
              sx={{
                color: "#63b3ed",
                fontSize: "12px",
                fontFamily: "'Courier New', monospace",
                mb: 2,
                letterSpacing: "0.08em",
              }}
            >
              ✦ AI SUMMARY
            </Typography>
            <Skeleton
              variant="text"
              sx={{ bgcolor: "rgba(99,179,237,0.1)", borderRadius: 1, mb: 1 }}
            />
            <Skeleton
              variant="text"
              sx={{
                bgcolor: "rgba(99,179,237,0.1)",
                borderRadius: 1,
                mb: 1,
                width: "85%",
              }}
            />
            <Skeleton
              variant="text"
              sx={{
                bgcolor: "rgba(99,179,237,0.1)",
                borderRadius: 1,
                width: "70%",
              }}
            />
          </Box>
        )}

        {!isLoading && summary?.summary && (
          <Box
            sx={{
              mb: 3,
              background: "rgba(99,179,237,0.06)",
              border: "1px solid rgba(99,179,237,0.2)",
              borderRadius: "14px",
              padding: "24px",
              animation: "fadeSlideUp 0.4s ease",
              "@keyframes fadeSlideUp": {
                from: { opacity: 0, transform: "translateY(10px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Typography
              sx={{
                color: "#63b3ed",
                fontSize: "12px",
                fontFamily: "'Courier New', monospace",
                mb: 2,
                letterSpacing: "0.08em",
              }}
            >
              ✦ AI SUMMARY
            </Typography>
            <Typography
              sx={{ color: "#c8d6f0", lineHeight: 1.75, fontSize: "15px" }}
            >
              {summary.summary}
            </Typography>
          </Box>
        )}

        {/* Lecture content */}
        <Box
          sx={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            padding: "28px",
          }}
        >
          <Typography
            sx={{
              color: "#606880",
              fontSize: "11px",
              fontFamily: "'Courier New', monospace",
              mb: 2,
              letterSpacing: "0.1em",
            }}
          >
            CONTENT
          </Typography>
          <Typography
            sx={{ color: "#b0bcd8", lineHeight: 1.85, fontSize: "15px" }}
          >
            {lecture.content}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
