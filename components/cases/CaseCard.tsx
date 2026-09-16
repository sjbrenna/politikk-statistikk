import { ApiCase } from "@/lib/stortinget/types/case";
import Link from "next/link";
import SubjectButton from "../SubjectButton";
import VoteIndicator from "../votes/VoteIndicator";
import { Voting } from "@/prisma/generated/enums";

type Props = {
  caseSource: ApiCase;
  vote?: Voting;
};

function CaseCard({ caseSource, vote }: Props) {
  return (
    <div
      className="flex flex-col w-full flex-1 border-2 min-h-24 rounded-2xl p-4 
        hover:border-(--border-hover) justify-between
      group
      bg-background
      "
    >
      <div className="flex flex-row justify-between border-b-2 items-center pb-2">
        <p>ID: {caseSource.id}</p>
        {vote && <VoteIndicator vote={vote} />}
        <p>{caseSource.sist_oppdatert_dato}</p>
      </div>
      <Link href={`/sak/${caseSource.id}`}>
        <p className="hover:text-link-hover hover:underline wrap-break-word pt-2">
          {caseSource.korttittel}
        </p>
      </Link>
      {caseSource.emne_liste.length !== 0 && (
        <div className="w-full mt-8 flex flex-col sm:flex-row flex-wrap">
          {caseSource.emne_liste.map((subject, i) => {
            return (
              <SubjectButton
                key={i}
                subjectId={subject.id}
                subjectName={subject.navn}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
export default CaseCard;
