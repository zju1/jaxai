import { redirect } from "next/navigation";
import { useEffect } from "react";

export function Redirect() {
  useEffect(() => {
    redirect("/main");
  }, []);

  return null;
}
