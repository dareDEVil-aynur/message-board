import { Box } from "@mui/material";
import { Provider } from "react-redux";
import "./App.css";
import Editor from "./panels/Editor";
import MessageList from "./panels/MessageList";
import Navigation from "./panels/Navigation";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Box className="root-layout">
        <Navigation />
        <MessageList />
        <Editor />
      </Box>
    </Provider>
  );
}

export default App;
