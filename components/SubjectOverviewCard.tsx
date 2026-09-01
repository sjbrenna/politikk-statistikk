"use client";

import { ArrowDown, ArrowRight, Dot } from "lucide-react";
import ContentCard from "./pageLayout/ContentCard";
import { Subject } from "@/prisma/generated/client";
import { useState } from "react";
import SubjectButton from "./SubjectButton";
import Link from "next/link";

type Props = {
  sourceSubject: Subject;
  subSubjects: Subject[];
};

function SubjectOverviewCard({ sourceSubject, subSubjects }: Props) {
  const [open, setOpen] = useState(false);
  const noOfSubSubjects = subSubjects.length;

  return (
    <ContentCard
      className="hover:border-div-hover  w-full group cursor-pointer"
      header={
        <div
          className="flex flex-col sm:flex-row 
        justify-between"
        >
          <Link
            href={"/temaer/" + sourceSubject.id}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row group/mainSubject">
              {" "}
              <p
                className="group-hover/mainSubject:text-link-hover
          group-hover/mainSubject:underline"
              >
                {sourceSubject.name}
              </p>
              <Dot />
              <div
                className="flex flex-row 
                group-hover/mainSubject:text-link-hover
          group-hover/mainSubject:underline"
              >
                Se alle saker
                <ArrowRight />
              </div>
            </div>
          </Link>

          {noOfSubSubjects > 0 && (
            <div className="flex flex-row items-center">
              <p className="text-muted-foreground group-hover:text-link-hover">
                {noOfSubSubjects} tema
              </p>
              {open ? (
                <ArrowDown className="text-muted-foreground group-hover:text-link-hover" />
              ) : (
                <ArrowRight className="text-muted-foreground group-hover:text-link-hover" />
              )}
            </div>
          )}
        </div>
      }
      onClick={() => setOpen((prev) => !prev)}
    >
      {open && (
        <div className="flex flex-row flex-wrap">
          {subSubjects.map((subject, index) => (
            <SubjectButton
              key={index}
              subjectId={subject.id}
              subjectName={subject.name}
            />
          ))}
        </div>
      )}
    </ContentCard>
  );
}

export default SubjectOverviewCard;
