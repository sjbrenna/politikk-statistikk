import SubjectClient from "@/components/clients/SubjectClient";
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

  return <SubjectClient subject={subject} />;
}

export default SubjectPage;
