"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/app/server-actions/users";

function LogOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction();

    //implement passing of request to logout

    if (!errorMessage) {
      toast.success("Logget ut");
      router.push("/");
    } else {
      toast.error("Error", {
        description: errorMessage,
      });
    }
    setLoading(false);
  };

  return (
    <Button className="w-fit p-4 lg:h-12" onClick={handleLogout}>
      {loading ? <Loader2 className="animate-spin" /> : "Logg Ut"}
    </Button>
  );
}

export default LogOutButton;
