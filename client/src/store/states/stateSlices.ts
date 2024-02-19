import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Channel = { id: string; name: string };
export type Message = {
  id: string;
  text: string;
  user: string;
  timestamp: number;
};

interface MessageBoardState {
  isChannelSelected: boolean;
  selectedChannel: string;
  userName: string;
  isModalOpen: boolean;
  isSuccess: boolean;
  channels: Channel[];
  text: string;
  isLoading: boolean;
}

const initialState: MessageBoardState = {
  isChannelSelected: false,
  selectedChannel: "",
  userName: "",
  isModalOpen: true,
  isSuccess: false,
  channels: [],
  text: "",
  isLoading: false,
};

const messageBoardSlice = createSlice({
  name: "messageBoard",
  initialState,
  reducers: {
    setIsChannelSelected: (state, action: PayloadAction<boolean>) => {
      state.isChannelSelected = action.payload;
    },
    setSelectedChannel: (state, action: PayloadAction<string>) => {
      state.selectedChannel = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setIsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setIsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
    setChannels: (state, action: PayloadAction<Channel[]>) => {
      state.channels = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setIsChannelSelected,
  setSelectedChannel,
  setUserName,
  setIsModalOpen,
  setIsSuccess,
  setChannels,
  setText,
  setIsLoading,
} = messageBoardSlice.actions;
export default messageBoardSlice.reducer;
