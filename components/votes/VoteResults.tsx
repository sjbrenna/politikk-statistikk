type Props = {
  supports: number;
  against: number;
  absent: number;
};
function VoteResults({ supports, against, absent }: Props) {
  return (
    <div className="flex flex-wrap flex-row justify-between w-[50%] gap-2">
      <div className="flex flex-col flex-1 justify-between text-2xl">
        <p>For</p>
        <p className="text-accepted">{supports}</p>
      </div>
      <div className="flex flex-col flex-1 justify-between text-2xl">
        <p>Mot</p>
        <p className="text-rejected">{against}</p>
      </div>
      <div className="flex flex-col flex-1 justify-between text-2xl">
        <p>Ikke tilstede</p>
        <p className="text-absent">{absent}</p>
      </div>
    </div>
  );
}

export default VoteResults;
