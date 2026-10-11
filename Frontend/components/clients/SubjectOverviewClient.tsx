"use client";

import { Subject } from "@/prisma/generated/client";
import ContentContainer from "../pageLayout/ContentContainer";
import PageTitle from "../pageLayout/PageTitle";
import ContentCard from "../pageLayout/ContentCard";
import { useMemo, useState } from "react";
import SearchInput from "../SearchInput";
import SubjectOverviewCard from "../SubjectOverviewCard";
import useDebounce from "@/hooks/useDebounce";

type Props = {
  mainSubjects: Subject[];
  subSubjects: Subject[];
};

function SubjectOverviewClient({ mainSubjects, subSubjects }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const subjectHierarchy = useMemo(() => {
    const hierarchy = new Map<Subject, Subject[]>();

    mainSubjects.forEach((subject) => {
      hierarchy.set(subject, []);
    });

    subSubjects.forEach((subject) => {
      const parent = mainSubjects.find(
        (parentSubject) => parentSubject.id == subject.parentId,
      );
      if (parent) {
        hierarchy.get(parent)?.push(subject);
      }
    });

    return hierarchy;
  }, [mainSubjects, subSubjects]);
  const debouncedQuery = useDebounce(searchQuery);

  const filterSubjects = (subjects: [Subject, Subject[]][]) => {
    let filtered = subjects.filter(
      ([mainSub, subSubs]) =>
        mainSub.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        subSubs.some((subject) =>
          subject.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
        ),
    );
    return filtered;
  };

  return (
    <ContentContainer mode="half">
      <PageTitle
        header={
          <div className="flex flex-col gap-y-4">
            <p className="pageTitle self-center ">Temaer</p>
            <p>
              Temaene er hentet fra Stortingets API. Tema-hierarkiet er
              organisert basert på struktureringen fra API-et.
            </p>
          </div>
        }
      />
      <ContentCard
        header={<div className="cardTitle">Finn hoved- eller undertema</div>}
      >
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Søk etter tema..."
        />
      </ContentCard>
      <ContentCard centered={true} className="pt-4">
        {" "}
        {subjectHierarchy.size !== 0 &&
          filterSubjects(Array.from(subjectHierarchy.entries())).map(
            ([keySubject, subSubjects], index) => (
              <SubjectOverviewCard
                key={index}
                sourceSubject={keySubject}
                subSubjects={subSubjects}
              />
            ),
          )}
      </ContentCard>
    </ContentContainer>
  );
}

export default SubjectOverviewClient;
