import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Channel, Message } from "../states/stateSlices";

export const channelsAPI = createApi({
  reducerPath: "channelsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
  endpoints: (builder) => ({
    getChannels: builder.query<Channel[], void>({
      query: () => "channels",
    }),
    getMessagesForChannel: builder.query<Message[], string>({
      query: (channelName) => `messages/${channelName}`,
    }),
    postMessageToChannel: builder.mutation<
      void,
      { channelName: string; text: string; user: string }
    >({
      query: ({ channelName, ...message }) => ({
        url: `${channelName}/messages`,
        method: "POST",
        body: message,
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useGetMessagesForChannelQuery,
  usePostMessageToChannelMutation,
} = channelsAPI;
