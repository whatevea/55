import axios from "axios";
import { loggedInData } from "../config/authData";
import { authorizationHeader } from "../service/AuthorizationHeader";

const headers = authorizationHeader();

const http = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/`,
  headers: headers.headers,
});

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${loggedInData().token}`,
    },
  });
};

// Export both http and uploadFile
export default http;
