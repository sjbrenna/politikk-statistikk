"use client";

import { ApiVote } from "@/lib/stortinget/types/voting";
import ContentCard from "../pageLayout/ContentCard";
import formatXmlDate from "@/lib/formatXmlDate";
import VoteResults from "./VoteResults";
import { useState } from "react";
import { Button } from "../ui/button";
import { SquareChevronDown, SquareChevronRight } from "lucide-react";

type Props = {
  sourceVote: ApiVote;
  index: number;
  suggestionText: string;
};

function CaseVote({ sourceVote, index, suggestionText }: Props) {
  const [showSuggestion, setShowSuggestion] = useState(false);

  const result =
    sourceVote.votering_resultat_type_tekst === "Enstemmig vedtatt"
      ? "Enstemmig vedtatt"
      : sourceVote.vedtatt
        ? "Vedtatt"
        : "Forkastet";

  return (
    <ContentCard
      header={
        <div
          className="flex flex-row justify-between 
        minorSubTitle flex-wrap"
        >
          <p>
            Votering {index + 1} - {result}
          </p>
          <p>{formatXmlDate(sourceVote.votering_tid)}</p>
        </div>
      }
    >
      <p>Votering ID: {sourceVote.votering_id}</p>
      {result !== "Enstemmig vedtatt" && (
        <VoteResults
          supports={sourceVote.antall_for}
          against={sourceVote.antall_mot}
          absent={sourceVote.antall_ikke_tilstede}
        />
      )}
      <Button
        variant="ghost"
        onClick={() => setShowSuggestion((prev) => !prev)}
        className="flex items-center gap-2"
      >
        {showSuggestion ? (
          <SquareChevronDown className="size-5" />
        ) : (
          <SquareChevronRight className="size-5" />
        )}

        <span className="hover:text-link-hover">
          {showSuggestion ? "Skjul forslagstekst" : "Vis forslagstekst"}
        </span>
      </Button>

      {showSuggestion && (
        <div
          dangerouslySetInnerHTML={{ __html: suggestionText }}
          className="border-2 rounded-xl p-2"
        ></div>
      )}
    </ContentCard>
  );
}

export default CaseVote;
