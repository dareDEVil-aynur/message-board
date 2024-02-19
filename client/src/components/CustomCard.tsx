import ForumIcon from "@mui/icons-material/Forum";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";

interface StatusCardProps {
  shouldRender: boolean;
  message: string;
}

const CustomCard = ({ shouldRender, message }: StatusCardProps) => {
  const content = (
    <Box className="flex-layout">
      <ForumIcon fontSize="large" sx={{ color: "primary.main" }} />
      <Typography variant="customL1" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );

  return (
    <>
      {shouldRender && (
        <Card
          sx={{
            bgcolor: "#141d33",
            "&:hover": {
              boxShadow: 6,
            },
          }}
        >
          <CardContent>{content}</CardContent>
        </Card>
      )}
    </>
  );
};

export default CustomCard;
