import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  getPartyLogo,
  PartyResourceId,
} from "@/lib/stortinget/parties/partyResources";

type Props = {
  partyId: string;
};

function PartyLogoButton({ partyId }: Props) {
  return (
    <Button
      key={partyId}
      asChild
      size="icon"
      className="sm:size-18 size-10 relative rounded-full flex items-center justify-center"
      variant={"white"}
    >
      <Link href={`/partier/${partyId.toUpperCase()}`}>
        <Image
          src={getPartyLogo(partyId as PartyResourceId)}
          alt={partyId}
          className="object-fill sm:p-3 p-2"
          fill
          sizes="(min-width: 640px) 72px, 40px"
        />
      </Link>
    </Button>
  );
}

export default PartyLogoButton;
