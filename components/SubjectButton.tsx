import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  subjectId: number;
  subjectName: string;
};

function SubjectButton({ subjectId, subjectName }: Props) {
  return (
    <Link href={"/temaer/" + subjectId.toString()}>
      <Button>{subjectName}</Button>
    </Link>
  );
}

export default SubjectButton;
