import SubjectClient from "@/components/clients/SubjectClient";
import { CalculatePartyVotingOnSubject } from "@/lib/StatCalculations/SubjectPartyVote";
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

  //Get the metadata with cases that have this subject
  //need cases, cases that have specific subject
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

  const partyVotes = await CalculatePartyVotingOnSubject(subject.id);

  if (!partyVotes) {
    notFound();
  }

  console.log("VOTES: ", partyVotes?.partyVotes);

  return (
    <SubjectClient
      subject={subject}
      caseIds={caseIds}
      partyVotes={partyVotes}
    />
  );
}

export default SubjectPage;
