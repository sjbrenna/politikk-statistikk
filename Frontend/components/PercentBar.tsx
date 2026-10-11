import { Progress } from "./ui/progress";

type Props = {
  activePercent: number;
};

function PercentBar({ activePercent }: Props) {
  return <Progress value={activePercent} />;
}
export default PercentBar;
