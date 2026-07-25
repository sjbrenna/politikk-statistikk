import CasePageClient from "@/components/cases/CasePageClient";
import { fetchCase } from "@/lib/stortinget/stortingetFetches";

type Props = {
  params: Promise<{
    caseId: string;
  }>;
};

export default async function CasePage({ params }: Props) {
  const { caseId } = await params;

  const sourceCase = await fetchCase(caseId);

  return <CasePageClient sourceCase={sourceCase} />;
}
