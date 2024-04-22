import { loggedInData } from "../config/authData";

export const authorizationHeader = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loggedInData().token}`,
    },
  };
};
