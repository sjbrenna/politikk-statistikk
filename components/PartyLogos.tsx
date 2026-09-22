import { fetchCurrentParties } from "@/lib/stortinget/stortingetFetches";
import PartyLogoButton from "./PartyLogoButton";

async function PartyLogos() {
  try {
    const parties = await fetchCurrentParties();
    return (
      <div className="flex flex-row flex-wrap w-full items-center gap-2 justify-between">
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
