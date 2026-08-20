import ContentCard from "../pageLayout/ContentCard";
import {
  getPartyLogo,
  getPartyName,
  PartyResourceId,
} from "@/lib/stortinget/parties/partyResources";
import Image from "next/image";

type Props = {
  PoliticianCount: number;
  partyId: PartyResourceId;
};

function PartyInfoCard({ PoliticianCount, partyId }: Props) {
  return (
    <ContentCard>
      <div className="flex flex-col items-center lg:flex-row gap-4 flex-1">
        <div className="size-48 lg:size-64 border-b-4 lg:border-r-4 lg:border-b-0 flex flex-row items-center justify-center">
          <div className="size-32 lg:size-48 relative bg-white rounded-full">
            <Image
              src={getPartyLogo(partyId)}
              alt="logo"
              fill
              sizes="(max-width: 150px) 100vw"
              className="rounded-2xl scale-70"
            />
          </div>
        </div>
        <div className="text-2xl flex justify-center items-center wrap-break-word">
          {`${getPartyName(partyId)} har ${PoliticianCount} representant${PoliticianCount > 1 && "er"} på Stortinget`}
        </div>
      </div>
    </ContentCard>
  );
}

export default PartyInfoCard;
