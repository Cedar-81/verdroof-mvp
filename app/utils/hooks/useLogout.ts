import { del_cookie } from "@/app/actions/delete_cookie";
import { get_cookie } from "@/app/actions/get_cookie";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGeneralContext } from "../contexts/GeneralContext";

interface UseLogoutResult {
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useLogout = (): UseLogoutResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setUserData } = useGeneralContext();

  const logout = async (): Promise<void> => {
    const token = await get_cookie();
    setLoading(true);
    setError(null);

    try {
      if (token && token.trim() != "") {
        const response = await fetch(
          "https://admin.verdroof.com/api/auth/logout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.trim()}`,
            },
            body: null,
          }
        );
      }
    } catch (err) {
      toast.error(err as string);
    } finally {
      await del_cookie();
      setUserData({
        email: "",
        firstname: "",
        lastname: "",
      });
      setLoading(false);
      toast.success("Logout successful");
    }
  };

  return { logout, loading, error };
};

export default useLogout;
