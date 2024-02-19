export type Channel = { id: string; name: string };
export type Message = {
  id: string;
  text: string;
  user: string;
  timestamp: number;
};
export type ChannelMessages = Record<string, Message[]>;
