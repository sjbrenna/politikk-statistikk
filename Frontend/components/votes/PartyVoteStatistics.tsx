//Component to render how parties vote on a certain subject.
//How to calculate the stats given the votes?
//Retrieve caseIDs with the mathcing subjectid
//Get all vote records for those caseIds.
//For each politician in  the vote record, associate with party
//Then count each vote based on party affiliation for each voting

import { SpringPartyVote } from "@/lib/springApi/springPartyVotes";
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
import { AppPartyVote } from "@/lib/AppTypes/AppPartyVotes";

type Props = {
  partyVotes: AppPartyVote[];
};

function PartyVoteStatistics({ partyVotes }: Props) {
  const ratio = ({
    votesFor,
    votesAgainst,
  }: {
    votesFor: number;
    votesAgainst: number;
  }) => {
    const total = votesFor + votesAgainst;
    return total === 0 ? 0 : Math.round((votesFor / total) * 100);
  };

  const partyVoteArray = Array.from(partyVotes).sort(
    (a, b) => ratio(b) - ratio(a),
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
          {partyVoteArray.map((vote, index) => {
            const voteRatio = ratio(vote);
            const total = vote.votesFor + vote.votesAgainst;
            return (
              <TableRow key={vote.partyId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-row items-center gap-x-2">
                    <Image
                      src={getPartyLogo(vote.partyId as PartyResourceId)}
                      alt={`${vote.partyId} logo`}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                    {vote.partyId}
                  </div>
                </TableCell>
                <TableCell>
                  {vote.votesFor} av {total} stemmer
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="w-full hidden md:block">
                      <PercentBar activePercent={voteRatio} />
                    </div>
                    {voteRatio}%
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
