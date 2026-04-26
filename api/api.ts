import axios from "axios";

export const instance = axios.create({
  baseURL: "http://YOUR_IP:5000/api"
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};