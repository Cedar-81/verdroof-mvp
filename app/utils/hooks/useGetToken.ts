import { get_cookie } from "@/app/actions/get_cookie";
import { useGeneralContext } from "../contexts/GeneralContext";
import { useEffect } from "react";

export function useGetToken() {
  const { setToken } = useGeneralContext();

  const getToken = async () => {
    const token_str = await get_cookie();
    if (token_str && token_str?.trim() != "") {
      setToken(token_str);
    } else {
      setToken("");
    }
  };

  useEffect(() => {
    getToken();
  }, []);
}
