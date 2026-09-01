import SubjectOverviewClient from "@/components/clients/SubjectOverviewClient";
import { prisma } from "@/prisma/prisma";

async function page() {
  const [mainSubjects, subSubjects] = await Promise.all([
    prisma.subject.findMany({
      where: { isMainSubject: true },
    }),
    prisma.subject.findMany({
      where: { isMainSubject: false },
    }),
  ]);

  const sortedMainSubjects = mainSubjects.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });

  const sortedSubSubjects = subSubjects.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <SubjectOverviewClient
      mainSubjects={sortedMainSubjects}
      subSubjects={sortedSubSubjects}
    />
  );
}

export default page;
