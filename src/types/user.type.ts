import { Roles } from "./roles.types";

export type UserType = {
  _id: string;
  email: string;
  name: string;
  chats: [];
};

export type Chat = {
  _id: string;
  name: string;
  messages: Message[];
  fileUrl?: string;
  fileContent?: string;
};

export type Message = {
  role: Roles;
  content: string;
};
