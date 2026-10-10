import Link from "next/link";

type Props = {
  caseId: string;
  shortTitle: string;
};

export default function CaseCard({ caseId, shortTitle }: Props) {
  return (
    <Link
      href={`/sak/${caseId}`}
      className="
        group flex min-w-0 items-center gap-4
        rounded-md border bg-card px-4 py-3
        transition-colors hover:bg-muted/50
      "
    >
      <span className="shrink-0 text-sm font-medium text-muted-foreground">
        Sak {caseId}
      </span>

      <span className="h-5 w-px shrink-0 bg-border" />

      <span className="min-w-0 truncate font-medium group-hover:text-link-hover">
        {shortTitle}
      </span>

      <span className="ml-auto shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
