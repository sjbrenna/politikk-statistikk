import ContentCard from "@/components/pageLayout/ContentCard";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import PartyLogoButton from "@/components/PartyLogoButton";
import {
  getPartyColor,
  getPartyLogo,
  getPartyName,
  PartyResourceId,
  partyResources,
} from "@/lib/stortinget/parties/partyResources";
import { baseApi } from "@/lib/stortinget/stortingetClient";
import { prisma } from "@/prisma/prisma";
import Image from "next/image";
import Link from "next/link";
type Props = {
  params: Promise<{ personId: string }>;
};

async function page({ params }: Props) {
  const personId = (await params).personId;
  const politician = await prisma.politician.findUnique({
    where: {
      id: personId,
    },
  });
  const birthdayArray = politician?.birthday.split("-");
  const govRole = await prisma.governmentRole.findUnique({
    where: {
      politicianId: personId,
    },
  });
  console.log(govRole);
  if (!politician) {
    throw new Error("Could not find politician");
  }
  const personImageUrl =
    baseApi + `personbilde?personid=${personId}&storrelse=stort`;
  const partyColor = getPartyColor(
    politician.partyId as keyof typeof partyResources,
  );
  return (
    <ContentContainer mode="half">
      <ContentCard mode="horizontal">
        <div
          className={`relative bg-white border-4 p-2 aspect-3/4 lg:w-48 sm:w-32 rounded-2xl`}
          style={{ borderColor: partyColor }}
        >
          <Image
            src={personImageUrl}
            alt="personbilde"
            fill
            className="rounded-2xl"
            sizes="(max-width: 250px) 100vw"
          />
        </div>
        <div className="flex-1 rounded-2xl border-2 flex flex-col p-2 gap-y-4">
          <div className="text-2xl font-bold">
            {politician.firstName + " " + politician.lastName}
          </div>
          <div className="text-2xl flex flex-row items-center gap-x-2">
            Parti:{" "}
            <div className="relative size-12 bg-white border-2 rounded-full">
              <Image
                src={getPartyLogo(politician.partyId as PartyResourceId)}
                fill
                alt="logo"
                sizes={"(max-width: 32px) 100vw, 64px"}
                className="object-contain rounded-2xl"
              />
            </div>
            <Link
              href={`/partier/${politician.partyId}`}
              className="text-2xl hover:text-(--link-hover) flex flex-row items-center gap-x-2"
            >
              {getPartyName(politician.partyId as PartyResourceId)}
            </Link>
          </div>
          {birthdayArray && (
            <div className="text-2xl">
              Fødselsdato:{" "}
              {birthdayArray[2] +
                "." +
                birthdayArray[1] +
                "." +
                birthdayArray[0]}
            </div>
          )}
          {govRole && (
            <div className="gap-y-4 flex flex-col text-2xl">
              <p>Regjeringsposisjon: {govRole.title}</p>
              <p>Departement: {govRole.department}</p>
            </div>
          )}
        </div>
      </ContentCard>
    </ContentContainer>
  );
}

export default page;
