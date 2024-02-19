import { Avatar, Box, Typography } from "@mui/material";

type Message = {
  id: string;
  text: string;
  user: string;
  timestamp: number;
};

const generateAvatarColor = (username: string): string => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 55%, 60%)`;
  return color;
};

const CustomMessage = ({ user, text, timestamp }: Message) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 2,
        width: "100%",
      }}
    >
      <Box sx={{ marginRight: 2 }}>
        <Avatar sx={{ bgcolor: generateAvatarColor(user) }}>
          {user[0].toUpperCase()}
        </Avatar>
      </Box>
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "baseline",
          }}
        >
          <Typography sx={{ fontWeight: 600 }} variant="customL1SemiBold">
            {user}
          </Typography>
          <Typography sx={{ fontSize: 12 }} variant="customL2">
            {new Date(timestamp).toLocaleString([], {
              month: "numeric",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>
        <Typography variant="customL1">{text}</Typography>
      </Box>
    </Box>
  );
};

export default CustomMessage;
