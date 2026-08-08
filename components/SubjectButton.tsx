import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  subjectId: number;
  subjectName: string;
};

function SubjectButton({ subjectId, subjectName }: Props) {
  return (
    <Link href={"/temaer/" + subjectId.toString()}>
      <Button className="flex h-auto min-w-0 flex-wrap whitespace-normal">
        {subjectName}
      </Button>
    </Link>
  );
}

export default SubjectButton;
