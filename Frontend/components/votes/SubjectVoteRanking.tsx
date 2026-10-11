import { Subject } from "@/prisma/generated/client";

type Props = {
  subjectEntries: { subject: Subject; for: number; against: number }[];
  type: "for" | "against";
};

function SubjectVoteRanking({ subjectEntries, type }: Props) {
  //Render by percent, not total votes
  return (
    <div className="flex-col flex-1">
      {subjectEntries.map((entry, index) => (
        <div key={entry.subject.id}>
          {type === "for" ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{index + 1}</span>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{entry.subject.name}</p>

                <p className="text-sm text-muted-foreground">
                  {entry.for} for · {entry.against} mot
                </p>
              </div>

              <span className="text-lg font-semibold">
                {((entry.for / (entry.for + entry.against)) * 100).toFixed(2)}%
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{index + 1}</span>

              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{entry.subject.name}</p>

                <p className="text-sm text-muted-foreground">
                  {entry.for} for · {entry.against} mot
                </p>
              </div>

              <span className="text-lg font-semibold">
                {((entry.against / (entry.for + entry.against)) * 100).toFixed(
                  2,
                )}
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
