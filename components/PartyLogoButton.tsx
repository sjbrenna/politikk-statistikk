import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {
  logoUrl: string;
  partyId: string;
};

function PartyLogoButton({ logoUrl, partyId }: Props) {
  return (
    <div>
      <Button className="rounded-full size-16" variant={"white"}>
        <Link href={`/partier/${partyId.toUpperCase()}`}>
          <Image src={logoUrl} alt={partyId} width={48} height={48} />
        </Link>
      </Button>
    </div>
  );
}

export default PartyLogoButton;
