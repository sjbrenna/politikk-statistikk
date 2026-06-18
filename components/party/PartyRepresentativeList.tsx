"use client";

import { Representative } from "@/lib/stortinget/types/representative";
import ContentCard from "../pageLayout/ContentCard";
import { Input } from "../ui/input";
import { Field, FieldLabel } from "../ui/field";
import useDebounce from "@/app/hooks/useDebounce";
import { use, useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  representativeList: Representative[];
};

function PartyRepresentativeList({ representativeList }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery);

  let repList = representativeList;

  const query = debouncedQuery.toLowerCase();

  if (query !== "") {
    repList = representativeList.filter((rep) => {
      const fullName = rep.firstName + " " + rep.lastName;
      return fullName.toLowerCase().includes(query);
    });
  }

  return (
    <ContentCard>
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row w-full justify-between pl-4">
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
                href={`/personer/${rep.firstName}-${rep.lastName}`}
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

export default PartyRepresentativeList;
