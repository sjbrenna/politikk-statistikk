import { AppSubjectVote } from "@/lib/AppTypes/AppPoliticianSubjectVotes";

type Props = {
  subjectEntries: AppSubjectVote[];
  type: "for" | "against";
};

function SubjectVoteRanking({ subjectEntries, type }: Props) {
  //Render by percent, not total votes
  return (
    <div className="flex-col flex-1">
      {subjectEntries.map((entry, index) => (
        <div key={entry.subjectId}>
          {type === "for" ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{index + 1}</span>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{entry.subjectName}</p>

                <p className="text-sm text-muted-foreground">
                  {entry.votesFor} for · {entry.votesAgainst} mot
                </p>
              </div>

              <span className="text-lg font-semibold">
                {(
                  (entry.votesFor / (entry.votesFor + entry.votesAgainst)) *
                  100
                ).toFixed(2)}
                %
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{index + 1}</span>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{entry.subjectName}</p>

                <p className="text-sm text-muted-foreground">
                  {entry.votesFor} for · {entry.votesAgainst} mot
                </p>
              </div>

              <span className="text-lg font-semibold">
                {(
                  (entry.votesAgainst / (entry.votesFor + entry.votesAgainst)) *
                  100
                ).toFixed(2)}
                %
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default SubjectVoteRanking;
