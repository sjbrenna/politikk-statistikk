//Component to render how parties vote on a certain subject.
//How to calculate the stats given the votes?
//Retrieve caseIDs with the mathcing subjectid
//Get all vote records for those caseIds.
//For each politician in  the vote record, associate with party
//Then count each vote based on party affiliation for each voting

import { PartyVoting } from "@/lib/StatCalculations/SubjectPartyVote";
import ContentCard from "../pageLayout/ContentCard";
import PercentBar from "../PercentBar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  getPartyLogo,
  PartyResourceId,
} from "@/lib/stortinget/parties/partyResources";
import Image from "next/image";

type Props = {
  partyVotesProps: PartyVoting;
};

function PartyVoteStatistics({ partyVotesProps }: Props) {
  const partyVoteArray = Array.from(partyVotesProps.partyVotes.entries()).sort(
    ([_, partyVoteA], [__, partyVoteB]) =>
      partyVoteB.for / (partyVoteB.for + partyVoteB.against) -
      partyVoteA.for / (partyVoteA.for + partyVoteA.against),
  );

  return (
    <ContentCard header={<p>Rankering</p>}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Parti</TableHead>
            <TableHead>Stemmer for</TableHead>
            <TableHead>Prosent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partyVoteArray.map(([partyId, partyVote], index) => {
            const total = partyVote.for + partyVote.against;
            const activePercent = total > 0 ? (partyVote.for / total) * 100 : 0;
            return (
              <TableRow key={partyId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-row items-center gap-x-2">
                    <Image
                      src={getPartyLogo(partyId as PartyResourceId)}
                      alt={`${partyId} logo`}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                    {partyId}
                  </div>
                </TableCell>
                <TableCell>
                  {partyVote.for} av {partyVote.against + partyVote.for} stemmer
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="w-full hidden md:block">
                      <PercentBar activePercent={activePercent} />
                    </div>
                    {activePercent.toFixed(0)}%
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ContentCard>
  );
}

export default PartyVoteStatistics;
