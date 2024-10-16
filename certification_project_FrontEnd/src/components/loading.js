import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export default function Loading() {
  const isLoading = useSelector(state=>state.Laoding.isLoading);
  const [open, setOpen] = React.useState(isLoading);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    setOpen(isLoading);
  }, [isLoading]);
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CircularProgress color="warning" />
      </Box>
    </Modal>
  );
}