import axios from "axios";

let baseURL = "/";
if (process.env.NODE_ENV === "production") {
  baseURL = "http://ec2-3-80-48-3.compute-1.amazonaws.com:8080";
}

export const api = axios.create({ baseURL, withCredentials: true });
