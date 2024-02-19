import AppsIcon from "@mui/icons-material/Apps";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ConnectedTvOutlinedIcon from "@mui/icons-material/ConnectedTvOutlined";
import DevicesIcon from "@mui/icons-material/Devices";
import {
  Alert,
  Box,
  Drawer,
  List,
  ListItemButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../components/CustomModal";
import { useGetChannelsQuery } from "../store/services/channelsAPI";
import {
  setIsChannelSelected,
  setSelectedChannel,
  setText,
} from "../store/states/stateSlices";
import { RootState } from "../store/store";

const Navigation = () => {
  const dispatch = useDispatch();
  const { data: channelsData } = useGetChannelsQuery();

  const isModalOpen = useSelector(
    (state: RootState) => state.messageBoard.isModalOpen
  );
  const userName = useSelector(
    (state: RootState) => state.messageBoard.userName
  );
  const isSuccess = useSelector(
    (state: RootState) => state.messageBoard.isSuccess
  );
  const selectedChannel = useSelector(
    (state: RootState) => state.messageBoard.selectedChannel
  );

  const handleListItemClick = (channel: string) => {
    dispatch(setSelectedChannel(channel));
    dispatch(setIsChannelSelected(true));
    dispatch(setText(""));
  };

  const channelsUI =
    channelsData?.map((channel) => ({
      ...channel,
      icon:
        channel.name === "general"
          ? ChatBubbleOutlineIcon
          : channel.name === "random"
          ? AppsIcon
          : channel.name === "tech"
          ? DevicesIcon
          : null,
      label: channel.name.charAt(0).toUpperCase() + channel.name.slice(1),
    })) || [];

  return (
    <Drawer variant="permanent">
      <Box className="navigation-header">
        <ConnectedTvOutlinedIcon />
        <Typography variant="customH1">Channels</Typography>
      </Box>
      <Box className="navigation-context">
        <List>
          {channelsUI.map(({ name, icon: IconComponent, label }) => (
            <ListItemButton
              key={name}
              className="navigation-list-menu"
              selected={selectedChannel === name}
              onClick={() => handleListItemClick(name)}
            >
              {IconComponent ? <IconComponent /> : null}
              <Typography variant="customL1">{label}</Typography>
            </ListItemButton>
          ))}
        </List>
      </Box>
      <CustomModal open={isModalOpen} />
      <Snackbar open={isSuccess}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {`Username ${userName} saved until the server is restarted!`}
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

export default Navigation;
