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
      className="lg:size-18 relative rounded-full p-0 flex items-center justify-center"
      variant="white"
    >
      <Link href={`/partier/${partyId.toUpperCase()}`}>
        <Image
          src={getPartyLogo(partyId as PartyResourceId)}
          alt={partyId}
          className="object-contain p-4 rounded-2xl"
          fill
          sizes={"(max-width: 64px) 100vw, 64px"}
        />
      </Link>
    </Button>
  );
}

export default PartyLogoButton;
