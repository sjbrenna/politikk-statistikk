import CaseOverviewPageClient from "@/components/clients/CaseOverviewPageClient";
import { prisma } from "@/prisma/prisma";

async function CasesPage() {
  const subjects = await prisma.subject.findMany();
  const sortedSubjects = subjects
    ? subjects.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        return 1;
      })
    : [];
  const subjectNames = sortedSubjects.map((subject) => subject.name);
  return <CaseOverviewPageClient subjects={subjectNames} />;
}

export default CasesPage;
