import { config } from "@/app/config";
import PoliticianClient from "@/components/clients/PoliticianClient";
import { PoliticianSubjectVotesResponse } from "@/lib/AppTypes/AppPoliticianSubjectVotes";

import { VoteRecord } from "@/prisma/generated/client";
import { prisma } from "@/prisma/prisma";

import { notFound } from "next/navigation";
type Props = {
  params: Promise<{ personId: string }>;
};

async function page({ params }: Props) {
  const personId = (await params).personId;
  const [politician, govRole] = await Promise.all([
    prisma.politician.findUnique({
      where: {
        id: personId,
      },
      include: { committees: true },
    }),
    prisma.governmentRole.findUnique({
      where: {
        politicianId: personId,
      },
    }),
  ]);

  const [proposals, votes] = await Promise.all([
    prisma.caseProposer.findMany({
      where: {
        politicianId: personId,
      },
    }),
    prisma.voteRecord.findMany({
      where: {
        politicianID: personId,
      },
    }),
  ]);
  const subjectVotesResponse: PoliticianSubjectVotesResponse = await (
    await fetch(
      config.springApiBaseUrl + config.politicianSubjectVotesURL + personId,
    )
  ).json();

  if (!politician) {
    return notFound();
  } else {
    return (
      <PoliticianClient
        votes={votes}
        politician={politician}
        govRole={govRole}
        subjectVotesResponse={subjectVotesResponse}
        proposals={proposals}
      />
    );
  }
}

export default page;
