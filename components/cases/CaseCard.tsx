import { ApiCase } from "@/lib/stortinget/types/case";
import Link from "next/link";

type Props = {
  caseSource: ApiCase;
};

function CaseCard({ caseSource }: Props) {
  return (
    <Link href={`/sak/${caseSource.id}`}>
      {" "}
      <div
        className="flex flex-col w-full flex-1 border-2 min-h-24 rounded-2xl p-4 hover:border-(--border-hover) justify-between
      group"
      >
        <div className="flex flex-row justify-between">
          <p>ID: {caseSource.id}</p>
          <p>{caseSource.sist_oppdatert_dato}</p>
        </div>

        <p className="group-hover:text-(--border-hover)">
          {caseSource.korttittel}
        </p>
      </div>
    </Link>
  );
}
export default CaseCard;
