import InfoRow from "@/components/InfoRow";
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
          className={`relative bg-white border-4 p-2 aspect-3/4 lg:w-48 sm:w-32 rounded-2xl
            min-w-32`}
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
        <div className="flex-1 rounded-2xl border-2 flex flex-col p-2 gap-y-4 ">
          <div className="text-2xl flex flex-row justify-between items-center flex-wrap">
            <p className="font-bold">
              {politician.firstName + " " + politician.lastName}
            </p>

            <div className="text-2xl flex flex-row items-center gap-x-2">
              <div
                className="relative size-12 bg-white border-2 rounded-full min-w-12 min-h-12
              shrink-0"
              >
                <Image
                  src={getPartyLogo(politician.partyId as PartyResourceId)}
                  fill
                  alt="logo"
                  sizes={"(min-width: 32px) 100vw"}
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
          </div>

          {birthdayArray && (
            <InfoRow>
              Fødselsdato:{" "}
              {birthdayArray[2] +
                "." +
                birthdayArray[1] +
                "." +
                birthdayArray[0]}
            </InfoRow>
          )}
          {govRole && (
            <InfoRow>
              <div>
                <div>
                  <p className="font-semibold">Regjeringsposisjon:</p>
                  {govRole.title}
                </div>
                <div>
                  <p className="font-semibold">Departement:</p>
                  {govRole.department}
                </div>
              </div>
            </InfoRow>
          )}
        </div>
      </ContentCard>
    </ContentContainer>
  );
}

export default page;
