import CasePageClient from "@/components/cases/CasePageClient";
import {
  fetchCase,
  fetchVotingOverview,
  fetchVotingResult,
  fetchVotingSuggestionOverview,
} from "@/lib/stortinget/stortingetFetches";

type Props = {
  params: Promise<{
    caseId: string;
  }>;
};

export default async function CasePage({ params }: Props) {
  const { caseId } = await params;

  const sourceCase = await fetchCase(caseId);

  const [votingOverview, votingResult] = sourceCase.ferdigbehandlet
    ? await Promise.all([
        fetchVotingOverview(caseId),
        fetchVotingResult(caseId),
      ])
    : [null, null];

  const votingSuggestionOverview =
    votingOverview !== null
      ? await Promise.all(
          votingOverview.sak_votering_liste.map((voting) =>
            fetchVotingSuggestionOverview(voting.votering_id),
          ),
        )
      : [];

  return (
    <CasePageClient
      sourceCase={sourceCase}
      votingOverview={votingOverview}
      votingResult={votingResult}
      votingSuggestionOverview={votingSuggestionOverview}
    />
  );
}
