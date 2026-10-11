import ContentCard from "../pageLayout/ContentCard";

function CaseVotingMissing() {
  return (
    <div className="flex flex-col flex-wrap gap-y-2">
      <div className="w-full border-b-2 p-2 font-semibold text-xl">
        Saken har ingen voteringer
      </div>
      <p className="p-2">
        Ingen voteringer har blitt registrert i Stortingets datasett.{" "}
      </p>
    </div>
  );
}

export default CaseVotingMissing;
