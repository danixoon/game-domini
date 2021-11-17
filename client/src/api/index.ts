import axios, { AxiosRequestConfig } from "axios";

export const request: (
  urL: string,
  method: NonNullable<AxiosRequestConfig["method"]>,
  config?: AxiosRequestConfig
) => ReturnType<typeof axios.request> = async (url, method, config = {}) => {
  const response = await axios.request({
    ...config,
    url: "/api" + url,
    method,
  });
  return response.data.data;
};
