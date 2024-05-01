import axios, { AxiosInstance } from "axios";
import { ContentTypes } from "../types/content.types";
import { getAuthToken } from "./localStorage";

type IAxiosProps = {
  Authorization?: string;
};

type IAxiosCustomHeaders = {
  "Content-Type"?: "application/json" | string;
};

export const getAxiosInstance = async (
  isAuth: boolean = false,
  customHeaders: IAxiosCustomHeaders = {
    "Content-Type": ContentTypes.ApplicationJson,
  }
): Promise<AxiosInstance> => {
  let props: IAxiosProps = {};

  if (isAuth) props.Authorization = getAuthToken();

  const headers = { ...props, ...customHeaders };

  const instance = axios.create({
    baseURL: "http://localhost:3000",
    headers,
  });

  return instance;
};
