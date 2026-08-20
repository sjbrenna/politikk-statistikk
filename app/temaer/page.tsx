import SubjectOverviewClient from "@/components/clients/SubjectOverviewClient";
import { prisma } from "@/prisma/prisma";

async function page() {
  const mainSubjects = prisma.subject.findMany({
    where: { isMainSubject: true },
  });
  console.log(mainSubjects);
  return <SubjectOverviewClient></SubjectOverviewClient>;
}

export default page;
