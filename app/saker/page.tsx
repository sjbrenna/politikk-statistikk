import CasePageClient from "@/components/CasePageClient";
import { prisma } from "@/prisma/prisma";

async function CasesPage() {
  const subjects = await prisma.subject.findMany();

  return <CasePageClient subjects={subjects} />;
}

export default CasesPage;
