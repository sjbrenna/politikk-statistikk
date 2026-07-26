import CasePageClient from "@/components/cases/CasePageClient";
import {
  fetchCase,
  fetchVoting,
  fetchVotingResult,
} from "@/lib/stortinget/stortingetFetches";

type Props = {
  params: Promise<{
    caseId: string;
  }>;
};

export default async function CasePage({ params }: Props) {
  const { caseId } = await params;

  const sourceCase = await fetchCase(caseId);

  const [votings, caseStatus] = sourceCase.ferdigbehandlet
    ? await Promise.all([fetchVoting(caseId), fetchVotingResult(caseId)])
    : [[], null];

  return <CasePageClient sourceCase={sourceCase} />;
}
