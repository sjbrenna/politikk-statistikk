"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

type Props = {
  subjects: string[];
  content: string;
  handleSubjectChange: React.Dispatch<React.SetStateAction<string>>;
};

function SubjectDropdown({ subjects, content, handleSubjectChange }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-background border 
          border-accent overflow-hidden w-full 
           whitespace-nowrap lg:h-10 h-10 text-foreground
           flex flex-row hover:bg-muted-foreground
          "
        >
          {content}
          <ArrowDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {subjects.map((subjectName, i) => {
          return (
            <DropdownMenuItem
              key={i}
              className="border-b group hover:bg-div-hover"
              onClick={() => {
                handleSubjectChange(subjectName);
              }}
            >
              <p
                className="wrap-break-word text-xl
              text-foreground group-hover:text-link-hover"
              >
                {subjectName}
              </p>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SubjectDropdown;
