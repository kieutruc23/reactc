import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface AuthSignup {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthSignin {
  email: string;
  password: string;
}

const authApi = createApi({
  reducerPath: "auth",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL_API,
  }),
  endpoints: (builder) => ({
    signin: builder.mutation<{message: string, acessToken: string, user: {} }, AuthSignin>({
      query: (credentials) => ({
        url: "signin",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation<{message: string, acessToken: string, user: {} }, AuthSignup>({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
    }),
     }),
});

export const {
  useSigninMutation,
  useSignupMutation,
} = authApi;
export const authReducer = authApi.reducer;
export default authApi;
