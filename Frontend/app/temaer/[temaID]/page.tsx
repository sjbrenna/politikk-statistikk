import SubjectClient from "@/components/clients/SubjectClient";
import mapPartyVotes from "@/lib/Mappers/mapPartyVotes";
import { SpringPartyVotes } from "@/lib/springApi/springPartyVotes";
import { Voting } from "@/prisma/generated/enums";
import { prisma } from "@/prisma/prisma";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ temaID: number }>;
};

async function SubjectPage({ params }: Props) {
  const temaID = Number((await params).temaID);

  const subject = await prisma.subject.findFirst({
    where: {
      id: temaID,
    },
  });

  if (!subject) {
    notFound();
  }

  const caseIds = new Set<string>(
    (
      await prisma.caseSubject.findMany({
        where: {
          subjectId: subject.id,
        },
        select: {
          caseMetadataId: true,
        },
      })
    ).map((metadata) => metadata.caseMetadataId),
  );
  const response = await fetch(
    "https://politikk-statistikk-production.up.railway.app/api/party-votes/get-parties-votes-for-subject/" +
      subject.id,
  );
  if (!response.ok) {
    throw new Error("Request failed: " + response.status);
  }

  const partyVotes = mapPartyVotes(await response.json());

  if (!partyVotes) {
    notFound();
  }

  return (
    <SubjectClient
      subject={subject}
      caseIds={caseIds}
      partyVotes={partyVotes.votes}
    />
  );
}

export default SubjectPage;
