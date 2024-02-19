import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import lockIcon from "../assets/lock.svg";
import CustomCard from "../components/CustomCard";
import CustomMessage from "../components/CustomMessage";
import { useGetMessagesForChannelQuery } from "../store/services/channelsAPI";
import { RootState } from "../store/store";

const MessageList = () => {
  const { lastMessage } = useWebSocket("ws://localhost:3001");

  const messageEndRef = useRef<null | HTMLDivElement>(null);

  const isChannelSelected = useSelector(
    (state: RootState) => state.messageBoard.isChannelSelected
  );
  const selectedChannel = useSelector(
    (state: RootState) => state.messageBoard.selectedChannel
  );

  const {
    data: messages,
    isLoading,
    refetch,
  } = useGetMessagesForChannelQuery(selectedChannel, {
    skip: !isChannelSelected || !selectedChannel,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      refetch();
    }
  }, [lastMessage, refetch]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      className="message-list-layout"
      sx={{ width: isChannelSelected ? "60vw" : "85vw", marginLeft: "15vw" }}
    >
      <Box className="message-list-header">
        <img src={lockIcon} alt="lock" />
        <Typography variant="customH1">Messages</Typography>
      </Box>
      <Box className="message-list-thread">
        {isLoading ? (
          <CircularProgress />
        ) : !messages || messages.length === 0 ? (
          <CustomCard
            shouldRender={
              !isChannelSelected || !messages || messages.length === 0
            }
            message={
              !isChannelSelected
                ? "No channel is selected, select a channel from navigation menu to get started and join the channel!"
                : "Oops...Selected channel seems to be empty! Maybe start a thread by yourself?"
            }
          />
        ) : (
          messages.map((message) => (
            <CustomMessage key={message.id} {...message} />
          ))
        )}
        <div ref={messageEndRef} />
      </Box>
    </Box>
  );
};

export default MessageList;
