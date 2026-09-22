import PoliticianClient from "@/components/clients/PoliticianClient";

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

  const votes: VoteRecord[] = await prisma.voteRecord.findMany({
    where: {
      politicianID: personId,
    },
  });

  if (!politician) {
    return notFound();
  } else {
    return (
      <PoliticianClient
        votes={votes}
        politician={politician}
        govRole={govRole}
      />
    );
  }
}

export default page;
