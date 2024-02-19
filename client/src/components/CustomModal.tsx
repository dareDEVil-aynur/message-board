import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalOpen,
  setIsSuccess,
  setUserName,
} from "../store/states/stateSlices";
import { RootState } from "../store/store";

interface CustomModalProps {
  open: boolean;
}

const CustomModal = ({ open }: CustomModalProps) => {
  const dispatch = useDispatch();
  const userName = useSelector(
    (state: RootState) => state.messageBoard.userName
  );

  const handleSubmit = () => {
    if (userName.trim() !== "") {
      dispatch(setUserName(userName));
      dispatch(setIsModalOpen(false));
      dispatch(setIsSuccess(true));
      setTimeout(() => {
        dispatch(setIsSuccess(false));
      }, 3000);
    }
  };

  return (
    <Modal open={open}>
      <Box className="modal-box">
        <Typography variant="customH1" color="primary.main">
          Welcome to the Message Board!
        </Typography>
        <Typography variant="customL1" sx={{ mb: 2 }}>
          Enter your username (real or anonymous) to join the message board.
        </Typography>
        <TextField
          fullWidth
          label="User Name"
          value={userName}
          onChange={(e) => dispatch(setUserName(e.target.value))}
          variant="outlined"
          InputLabelProps={{ style: { color: "white" } }}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendOutlinedIcon />}
          onClick={handleSubmit}
          disabled={!userName.trim()}
          sx={{
            "&.Mui-disabled": {
              backgroundColor: "grey",
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default CustomModal;
