import { create } from "zustand";
import api from "./api/api";
const useMyStor = create(() => {
  const ls_strin = localStorage.getItem("auth");

  if (!ls_strin) {
    return {
      token: "",
      user: null,
    };
  }
  const ls = JSON.parse(ls_strin);

  api.defaults.headers.Authorization = `Bearer ${ls.token}`;
  return {
    token: ls.token,
    user: ls.user,
  };
});
export default useMyStor;
