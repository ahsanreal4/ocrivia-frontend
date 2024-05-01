export const ApiRoutes = {
  Auth: {
    GetProfile: "/auth/profile",
  },
  NoAuth: {
    Login: "/auth/login",
    Register: "/auth/signup",
  },
} as const;
