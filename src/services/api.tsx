import axios from "axios";

let baseURL = "/";
if (process.env.NODE_ENV === "production") {
  baseURL = "https://ec2-3-80-48-3.compute-1.amazonaws.com";
}

export const api = axios.create({ baseURL, withCredentials: true });
