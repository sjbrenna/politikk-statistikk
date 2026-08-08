"use client";

import {
  ArrowLeft,
  Calendar,
  Hash,
  LucideSquareArrowOutUpRight,
} from "lucide-react";
import ContentContainer from "../pageLayout/ContentContainer";
import PageTitle from "../pageLayout/PageTitle";
import { useContext } from "react";
import { CasesProviderContext } from "@/app/providers/casesProvider";
import {
  ApiDetailedCaseResponse,
  CASE_STATUS,
} from "@/lib/stortinget/types/case";
import {
  ApiVotingOverview,
  ApiVotingResult,
  ApiVotingSuggestionOverview,
} from "@/lib/stortinget/types/voting";
import InfoRow from "../InfoRow";
import ContentCard from "../pageLayout/ContentCard";
import SubjectButton from "../SubjectButton";
import CaseVotingMissing from "./CaseVotingMissing";
import CaseVote from "./CaseVote";
import Link from "next/link";

type Props = {
  sourceCase: ApiDetailedCaseResponse;
  votingOverview: ApiVotingOverview | null;
  votingResult: ApiVotingResult | null;
  votingSuggestionOverview: ApiVotingSuggestionOverview[] | [];
};

export default function CasePageClient({
  sourceCase,
  votingOverview,
  votingResult,
  votingSuggestionOverview,
}: Props) {
  console.log(votingSuggestionOverview);

  const cases = useContext(CasesProviderContext).cases;
  const subjects = sourceCase.emne_liste;
  const caseDate = cases.find(
    (p) => p.id === sourceCase.id,
  )!.sist_oppdatert_dato;
  return (
    <ContentContainer mode="half">
      <PageTitle
        header={
          <Link
            href={"/saker"}
            className="infoLink flex flex-row flex-wrap text-xl"
          >
            <ArrowLeft /> Tilbake til oversikten over saker
          </Link>
        }
        title={sourceCase.korttittel}
      >
        <div className="flex flex-col gap-y-2 *">
          <InfoRow icon={<Calendar />}>Sist behandlet: {caseDate}</InfoRow>
          <InfoRow icon={<Hash />}>ID: {sourceCase.id}</InfoRow>
          <InfoRow>Status: {CASE_STATUS[sourceCase.status]}</InfoRow>
          <InfoRow icon={<LucideSquareArrowOutUpRight />}>
            <a
              href={`https://www.stortinget.no/no/Saker-og-publikasjoner/Saker/Sak/?p=${sourceCase.id}`}
              className="underline hover:text-link-hover min-w-0 wrap-break-word"
            >
              Full dokumentasjon på Stortingets side
            </a>
          </InfoRow>
        </div>
      </PageTitle>
      {subjects.length > 0 && (
        <ContentCard header="Sakens temaer">
          <div className="flex flex-row flex-wrap gap-2">
            {subjects.map((subject) => (
              <SubjectButton
                key={subject.id}
                subjectName={subject.navn}
                subjectId={subject.id}
              />
            ))}
          </div>
        </ContentCard>
      )}
      {sourceCase.kortvedtak && (
        <ContentCard header={<p>Hva ble vedtatt</p>}>
          <p>{sourceCase.kortvedtak}</p>
        </ContentCard>
      )}
      <ContentCard centered={true}>
        {votingOverview ? (
          votingOverview.sak_votering_liste.map((voting, index) => (
            <CaseVote
              key={index}
              sourceVote={voting}
              index={index}
              suggestionText={
                votingSuggestionOverview.find(
                  (p) => p.votering_id === voting.votering_id,
                )!.voteringsforslag_liste[0].forslag_tekst
              }
            />
          ))
        ) : (
          <CaseVotingMissing />
        )}
      </ContentCard>
    </ContentContainer>
  );
}
