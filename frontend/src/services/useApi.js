/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import axios from "axios";

let apiSingleton = null;

const useApi = () => {
  if (!apiSingleton) {
    apiSingleton = axios.create({
      baseURL: import.meta.env.VITE_APP_API_URL,
    });
  }
  return apiSingleton;
};

export default useApi;
