import { Subject } from "@/prisma/generated/client";

type Props = {
  subjectEntries: { subject: Subject; for: number; against: number }[];
  type: "for" | "against";
};

function SubjectVoteRanking({ subjectEntries, type }: Props) {
  return (
    <div>
      {subjectEntries.map((entry, index) => (
        <p key={entry.subject.id}>
          {type === "for"
            ? `${index + 1}: ${entry.subject.name} - ${entry.for}`
            : `${index + 1}: ${entry.subject.name} - ${entry.against}`}
        </p>
      ))}
    </div>
  );
}
export default SubjectVoteRanking;
