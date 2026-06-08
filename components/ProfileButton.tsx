"use client";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  userId: String;
};

function ProfileButton({ userId }: Props) {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push(`/user/${userId}`);
  };

  return (
    <div>
      <Button onClick={handleProfileClick}>
        <User className="size-4" />
      </Button>
    </div>
  );
}

export default ProfileButton;
