import AppsIcon from "@mui/icons-material/Apps";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DevicesIcon from "@mui/icons-material/Devices";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomCard from "../components/CustomCard";
import { usePostMessageToChannelMutation } from "../store/services/channelsAPI";
import {
  setIsChannelSelected,
  setSelectedChannel,
  setText,
} from "../store/states/stateSlices";
import { RootState } from "../store/store";

const Editor = () => {
  const dispatch = useDispatch();

  const isChannelSelected = useSelector(
    (state: RootState) => state.messageBoard.isChannelSelected
  );
  const userName = useSelector(
    (state: RootState) => state.messageBoard.userName
  );
  const text = useSelector((state: RootState) => state.messageBoard.text);
  const selectedChannel = useSelector(
    (state: RootState) => state.messageBoard.selectedChannel
  );

  const [postMessageToChannel, { isLoading, isSuccess, isError }] =
    usePostMessageToChannelMutation();

  const handleClose = () => {
    dispatch(setIsChannelSelected(false));
    dispatch(setSelectedChannel(""));
    dispatch(setText(""));
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;

    await postMessageToChannel({
      channelName: selectedChannel,
      text: text,
      user: userName,
    });
    if (isSuccess || !isError) {
      dispatch(setText(""));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents the default action of adding a new line
      handleSubmit();
    }
  };

  return (
    <>
      {isChannelSelected && (
        <Box className="editor-layout">
          <Box className="editor-layout-header">
            <Box className="editor-layout-channel">
              {selectedChannel === "General" ? (
                <ChatBubbleOutlineIcon style={{ color: "#e1eeff" }} />
              ) : selectedChannel === "Random" ? (
                <AppsIcon style={{ color: "#e1eeff" }} />
              ) : (
                <DevicesIcon style={{ color: "#e1eeff" }} />
              )}
              <Typography variant="customH1">
                {selectedChannel.charAt(0).toUpperCase() +
                  selectedChannel.slice(1)}
              </Typography>
            </Box>
            <Box sx={{ justifyContent: "flex-end" }}>
              <Box className="editor-close-button">
                <IconButton color="error" onClick={handleClose}>
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box className="editor-layout-contents">
            <CustomCard
              shouldRender={true}
              message="Write something to get started, send button would be enabled once you write something"
            />
          </Box>
          <Box className="editor-input">
            <TextField
              onKeyDown={handleKeyDown}
              value={text}
              onChange={(e) => dispatch(setText(e.target.value))}
              placeholder="Type a message ..."
              multiline
              rows={8}
              fullWidth
              autoFocus
              variant="outlined"
              sx={{ overflowY: "auto" }}
            />
            <Button
              onClick={handleSubmit}
              disabled={text === "" || isLoading}
              endIcon={<SendOutlinedIcon />}
              variant="text"
            >
              Send
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Editor;
