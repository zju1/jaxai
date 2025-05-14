import { useAuthStore } from "@/store/auth";
import axios from "axios";

export function usePost() {
  const { token } = useAuthStore();

  return (withToken: boolean = false) =>
    async (url: string, { arg }: { arg: any }) => {
      const response = await axios.post(url, arg, {
        headers: withToken && token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    };
}

export function useGet() {
  const { token } = useAuthStore();

  return (withToken: boolean = false) =>
    async (url: string) => {
      const response = await axios.get(url, {
        headers: withToken && token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    };
}
