import { fetchCurrentParties } from "@/lib/stortinget/stortingetFetches";
import PartyLogoButton from "./PartyLogoButton";
import { prisma } from "@/prisma/prisma";

async function PartyLogos() {
  try {
    const parties = await prisma.party.findMany();
    return (
      <div className="flex flex-row flex-wrap w-full items-center gap-x-4 justify-between">
        {parties.map((party) => (
          <PartyLogoButton key={party.id} partyId={party.id} />
        ))}
      </div>
    );
  } catch (error) {
    return <div className="text-4xl">Error: Kunne ikke hente partier</div>;
  }
}

export default PartyLogos;
