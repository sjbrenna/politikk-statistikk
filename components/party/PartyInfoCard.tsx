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

async function PartyInfoCard({ PoliticianCount, partyId }: Props) {
  return (
    <ContentCard>
      <div className="flex flex-row gap-x-4 flex-1">
        <div className="w-64 border-r-4">
          <div className="size-48 relative bg-white rounded-full">
            <Image
              src={getPartyLogo(partyId)}
              alt="logo"
              fill
              sizes="(max-width: 150px) 100vw"
              className="rounded-2xl scale-70"
            />
          </div>
        </div>
        <div className="flex-1 text-2xl flex justify-center items-center break-all">
          {`${getPartyName(partyId)} har ${PoliticianCount} representant${PoliticianCount > 1 && "er"} på Stortinget`}
        </div>
      </div>
    </ContentCard>
  );
}

export default PartyInfoCard;
