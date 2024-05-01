export const ApiRoutes = {
  Auth: {
    GetProfile: "/auth/profile",
    GetUserChats: "/chat/user",
    CreateChat: "/chat",
    DeleteChat: "/chat",
    UploadFile: "/chat",
    GetChatMessages: "/chat",
    WriteUserMessage: "/chat/message",
  },
  NoAuth: {
    Login: "/auth/login",
    Register: "/auth/signup",
  },
} as const;
