import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex w-full items-center justify-center">
      <div>
        <p className="font-extrabold text-4xl">404: Siden finnes ikke</p>
        <Link href="/" className="infoLink">
          Tilbake til hjemmesiden
        </Link>
      </div>
    </div>
  );
}
