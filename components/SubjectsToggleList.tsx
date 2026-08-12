import ContentContainer from "./pageLayout/ContentContainer";
import SubjectButton from "./SubjectButton";

type Props = {
  toggledSubjects: number[];
  onSubjectsChange: React.Dispatch<React.SetStateAction<number[]>>;
};

function SubjectsToggleList({ toggledSubjects, onSubjectsChange }: Props) {
  return <div></div>;
}

export default SubjectsToggleList;
