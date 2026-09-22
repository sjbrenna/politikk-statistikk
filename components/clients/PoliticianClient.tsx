"use client";
import InfoRow from "@/components/InfoRow";
import ContentCard from "@/components/pageLayout/ContentCard";
import ContentContainer from "@/components/pageLayout/ContentContainer";
import Image from "next/image";
import { baseApi } from "@/lib/stortinget/stortingetClient";

import Link from "next/link";
import {
  getPartyColor,
  getPartyLogo,
  getPartyName,
  PartyResourceId,
  partyResources,
} from "@/lib/stortinget/parties/partyResources";
import {
  GovernmentRole,
  Politician,
  Prisma,
  VoteRecord,
} from "@/prisma/generated/client";
import { useContext, useEffect, useState } from "react";
import OverviewCaseList from "../cases/OverviewCaseList";
import FuncPagination from "../FuncPagination";
import { config } from "@/app/config";
import { CasesProviderContext } from "@/app/providers/casesProvider";
import CaseCard from "../cases/CaseCard";
import usePagination from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import SearchInput from "../SearchInput";
import ItemDropdown from "../ItemDropdown";
import VotingStatistics from "../votes/VotingStatistics";

type PoliticianWithCommittees = Prisma.PoliticianGetPayload<{
  include: { committees: true };
}>;
type Props = {
  votes: VoteRecord[];
  politician: PoliticianWithCommittees;
  govRole?: GovernmentRole | null;
};

function PoliticianClient({ votes, politician, govRole }: Props) {
  const dropdownOptions = [
    { label: "Filtrer basert på stemme...", value: null },
    { label: "For", value: "FOR" },
    { label: "Mot", value: "AGAINST" },
    { label: "Ikke tilstede", value: "ABSENT" },
  ];
  const [curVoting, setCurVoting] = useState(dropdownOptions[0].label);
  console.log(votes[1].vote);

  const voteCaseIDs = new Set(votes.map((vote) => vote.caseID));
  const politiciansCases = useContext(CasesProviderContext).cases.filter(
    (baseCase) => voteCaseIDs.has(baseCase.id.toString()),
  );

  let { searchQuery, setSearchQuery, filteredItems } = useSearch({
    filterFunc: (polCase, query) =>
      polCase.korttittel.toLowerCase().includes(query.toLowerCase()),
    items: politiciansCases,
  });

  const committees = politician.committees;

  if (curVoting !== dropdownOptions[0].label) {
    const votingValue = dropdownOptions.find(
      (option) => option.label === curVoting,
    )?.value;

    filteredItems = filteredItems.filter((item) => {
      const vote = votes.find((vote) => vote.caseID === item.id);

      return vote?.vote === votingValue;
    });
  }
  const {
    curPage,
    setCurPage,
    itemsToShow: casesToShow,
  } = usePagination({
    items: filteredItems,
    pageSize: config.pageSize,
  });

  const personImageUrl =
    baseApi + `personbilde?personid=${politician.id}&storrelse=stort`;
  const partyColor = getPartyColor(
    politician.partyId as keyof typeof partyResources,
  );
  const birthdayArray = politician?.birthday.split("-");

  useEffect(() => {
    setCurPage(1);
  }, [searchQuery]);

  return (
    <ContentContainer mode="half" className="mt-4">
      <ContentCard mode="horizontal">
        <div
          className={`relative bg-white border-4 p-2 aspect-3/4 lg:w-48 sm:w-32 rounded-2xl
            min-w-32`}
          style={{ borderColor: partyColor }}
        >
          <Image
            src={personImageUrl}
            alt="personbilde"
            fill
            className="rounded-2xl"
            sizes="(max-width: 250px) 100vw"
            loading="eager"
          />
        </div>
        <div className="flex-1 rounded-2xl border-2 flex flex-col p-2 gap-y-4 ">
          <div className="text-2xl flex flex-row justify-between items-center flex-wrap">
            <p className="font-bold">
              {politician.firstName + " " + politician.lastName}
            </p>

            <div className="text-2xl flex flex-row items-center gap-x-2">
              <div
                className="relative size-12 bg-white border-2 rounded-full min-w-12 min-h-12
              shrink-0"
              >
                <Image
                  src={getPartyLogo(politician.partyId as PartyResourceId)}
                  fill
                  alt="logo"
                  sizes={"(min-width: 32px) 100vw"}
                  className="object-contain rounded-2xl"
                  loading="eager"
                />
              </div>
              <Link
                href={`/partier/${politician.partyId}`}
                className="text-2xl hover:text-link-hover flex flex-row items-center gap-x-2"
              >
                {getPartyName(politician.partyId as PartyResourceId)}
              </Link>
            </div>
          </div>

          {birthdayArray && (
            <InfoRow>
              Fødselsdato:{" "}
              {birthdayArray[2] +
                "." +
                birthdayArray[1] +
                "." +
                birthdayArray[0]}
            </InfoRow>
          )}

          {govRole && (
            <div className="flex flex-col gap-2">
              <InfoRow>
                <div>
                  <p className="font-semibold">Regjeringsposisjon:</p>
                  {govRole.title}
                </div>
              </InfoRow>
              <InfoRow>
                <p className="font-semibold">Departement:</p>
                {govRole.department}
              </InfoRow>
            </div>
          )}
        </div>
      </ContentCard>
      <VotingStatistics votes={votes} />
      <ContentCard header={<p className="cardTitle pl-2">Siste stemmer:</p>}>
        <div
          className="flex flex-col lg:flex-row 
        flex-wrap gap-2 items-center"
        >
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Søk etter tittel på sak..."
          />
          <ItemDropdown
            items={dropdownOptions.map((option) => option.label)}
            selectedItem={curVoting}
            handleItemChange={setCurVoting}
          />
        </div>
        <OverviewCaseList
          propsCases={casesToShow}
          renderCase={(caseItem) => {
            const vote = votes.find((vote) => vote.caseID === caseItem.id);
            if (vote !== undefined) {
              return (
                <CaseCard
                  key={caseItem.id}
                  caseSource={caseItem}
                  vote={vote?.vote}
                />
              );
            }
          }}
        />
        <FuncPagination
          currentPage={curPage}
          handlePageChange={setCurPage}
          totalCases={filteredItems.length}
          pageSize={config.pageSize}
        />
      </ContentCard>
    </ContentContainer>
  );
}

export default PoliticianClient;
