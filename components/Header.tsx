import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { getUser } from "@/lib/supabase/server";
import { DarkModeToggle } from "@/components/ui/darkModeToggle";
import { logOutAction } from "@/app/server-actions/users";
import LogOutButton from "./LogOutButton";
import ProfileButton from "./ProfileButton";

async function Header() {
  const user = await getUser();
  return (
    <div
      className="bg-popover shadow-xl
    border-b-2 relative flex h-24 w-full items-center justify-between gap-4 sm:px-3"
    >
      <div className="flex flex-row *:flex *:flex-row gap-4 items-center *:items-center *:hover:text-ace">
        <Link href={"/"} className="navLink">
          <Image
            src="/flagg.png"
            alt="flagg"
            height={40}
            width={40}
            loading="eager"
            className="m-1 h-auto w-auto"
          />
          <p>Politikk Statistikk</p>
        </Link>
        <Link href={"/partier"} className="navLink">
          Partier
        </Link>
        <Link href={"/temaer"} className="navLink">
          Temaer
        </Link>
      </div>
      <div className="gap-x-2 flex flex-row">
        <Button hidden={user !== null}>
          <Link href={"/sign-up"}>Registrer Bruker</Link>
        </Button>
        <div className="flex flex-row gap-x-4">
          {user ? (
            <>
              <ProfileButton userId={user.id} />
              <LogOutButton />
            </>
          ) : (
            <Button>
              <Link href={"/login"}>Logg Inn</Link>
            </Button>
          )}
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Header;
