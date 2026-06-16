import { fetchCurrentParties } from "@/lib/stortinget/stortingetFetches";
import PartyLogoButton from "./PartyLogoButton";
import { prisma } from "@/prisma/prisma";

async function PartyLogos() {
  try {
    const parties = await prisma.party.findMany();
    console.log(parties);
    return (
      <div className="flex flex-row justify-between">
        {parties.map((party) => (
          <PartyLogoButton
            key={party.id}
            partyId={party.id}
            logoUrl={party.logoURL}
          />
        ))}
      </div>
    );
  } catch (error) {
    return <div className="text-4xl">Error: Kunne ikke hente partier</div>;
  }
}

export default PartyLogos;
