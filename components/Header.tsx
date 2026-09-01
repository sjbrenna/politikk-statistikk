"use client";

import Image from "next/image";
import Link from "next/link";
import { DarkModeToggle } from "@/components/ui/darkModeToggle";
import { useEffect, useState } from "react";
import { List } from "lucide-react";
import { usePathname } from "next/navigation";

function Header() {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();

  const isActive = (href: string) =>
    pathName === href || pathName.startsWith(`${href}/`);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setOpen(false);
      }
    };

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div
        className={`bg-popover shadow-xl
    border-b-4   flex min-h-24 w-full items-center 
    justify-between gap-4 sm:px-3`}
      >
        <div className="flex flex-row gap-8 items-center *:items-center *:hover:text-ace min-w-0 ">
          <Link href={"/"} className="navLink flex flex-row">
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
          <div className="hidden lg:flex gap-x-4  pl-4">
            <Link
              href={"/saker"}
              className={`navLink ${isActive("/saker") && "text-link-hover"}`}
            >
              Saker
            </Link>
            <Link
              href={"/temaer"}
              className={`navLink ${isActive("/temaer") && "text-link-hover"}`}
            >
              Temaer
            </Link>
            <Link
              href={"/regjeringen"}
              className={`navLink ${isActive("/regjeringen") && "text-link-hover"}`}
            >
              Regjeringen
            </Link>
          </div>
        </div>
        <div className="lg:inline hidden">
          <DarkModeToggle />
        </div>
        <>
          <div
            className=" rounded-2xl border-2 mr-4 p-2
      hover:bg-muted lg:hidden block"
            onClick={() => setOpen((prev) => !prev)}
          >
            <List className="size-8" />
          </div>
        </>
      </div>
      <div
        className={`${open ? "flex flex-row pl-4 justify-between" : "hidden"} h-24 w-full bg-popover items-center`}
      >
        <div className="flex flex-row gap-x-4">
          <Link
            href={"/saker"}
            className={`navLink ${isActive("/saker") && "text-link-hover"}`}
          >
            Saker
          </Link>
          <Link
            href={"/temaer"}
            className={`navLink ${isActive("/temaer") && "text-link-hover"}`}
          >
            Temaer
          </Link>
          <Link
            href={"/regjeringen"}
            className={`navLink ${isActive("/regjeringen") && "text-link-hover"}`}
          >
            Regjeringen
          </Link>
        </div>
        <div className="mr-6">
          <DarkModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Header;
