import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";

const DeleteDialog = ({ open, onClose, onConfirm, title = "Delete Lecture" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: "#1a1a2e",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          color: "#f0f4ff",
          "& .MuiDialogContentText-root": { color: "#b0bcd8" },
        },
      }}
    >
      <DialogTitle sx={{ color: "#f0f4ff" }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this lecture? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button
          onClick={onClose}
          sx={{ color: "#a0a8c0", textTransform: "none", borderRadius: "8px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            background: "#ef4444",
            textTransform: "none",
            borderRadius: "8px",
            "&:hover": { background: "#dc2626" },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;