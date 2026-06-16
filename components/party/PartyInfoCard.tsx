import { prisma } from "@/prisma/prisma";
import ContentCard from "../pageLayout/ContentCard";
import {
  getPartyLogo,
  PartyResourceId,
} from "@/lib/stortinget/parties/partyResources";
import Image from "next/image";

type Props = {
  partyId: PartyResourceId;
};

function PartyInfoCard({ partyId }: Props) {
  console.log(partyId);
  console.log(getPartyLogo(partyId));
  return (
    <ContentCard>
      <Image
        src={getPartyLogo(partyId)}
        alt="error"
        width={64}
        height={64}
      ></Image>
    </ContentCard>
  );
}

export default PartyInfoCard;
