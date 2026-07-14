"use client";
import { Politician } from "@/lib/stortinget/types/politician";
import ContentCard from "../pageLayout/ContentCard";
import { Input } from "../ui/input";
import useDebounce from "@/app/hooks/useDebounce";
import { useState } from "react";
import Link from "next/link";

type Props = {
  PoliticianList: Politician[];
};

function PartyPoliticianList({ PoliticianList }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery);

  let repList = PoliticianList;

  const query = debouncedQuery.toLowerCase();

  if (query !== "") {
    repList = PoliticianList.filter((rep) => {
      const fullName = rep.firstName + " " + rep.lastName;
      return fullName.toLowerCase().includes(query);
    });
  }

  return (
    <ContentCard>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row w-full justify-between pl-4 text-2xl font-bold">
          Representanter
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Søk etter representant..."
            className="w-1/2 self-end"
          />
        </div>
        {repList && (
          <div className="w-full h-full lg:max-h-128 overflow-auto border-2 rounded-2xl mt-4 flex flex-col gap-y-2">
            {repList.map((rep) => (
              <Link
                href={`/person/${rep.id}`}
                key={rep.id}
                className="navLink pl-4"
              >
                {rep.firstName} {rep.lastName}
              </Link>
            ))}
          </div>
        )}
      </div>
    </ContentCard>
  );
}

export default PartyPoliticianList;
