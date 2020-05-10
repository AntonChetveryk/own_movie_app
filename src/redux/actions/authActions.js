import Cookies from "universal-cookie";

const cookies = new Cookies();

export const updateAuth = (payload) => {
  return { type: "UPDATE_AUTH", payload };
};
