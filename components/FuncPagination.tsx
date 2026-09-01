"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Props = {
  currentPage: number;
  handlePageChange: React.Dispatch<React.SetStateAction<number>>;
  totalCases: number;
  pageSize: number;
};

function FuncPagination({
  currentPage,
  handlePageChange,
  totalCases,
  pageSize,
}: Props) {
  const [inputPage, setInputPage] = useState("");
  const maxPages = Math.ceil(totalCases / pageSize);

  const getPageNumbers = (currentPage: number, maxPages: number) => {
    const pages = [];

    if (currentPage !== 1) {
      pages.push("previous");
    }

    // 3 or fewer pages
    if (maxPages <= 3) {
      pages.push(...Array.from({ length: maxPages }, (_, i) => i + 1));
    }

    // At beginning
    else if (currentPage <= 2) {
      pages.push(1, 2, 3, "ellipsis", maxPages);
    }

    // At end
    else if (currentPage >= maxPages - 1) {
      pages.push(1, "ellipsis", maxPages - 2, maxPages - 1, maxPages);
    }

    // In the middle
    else {
      pages.push(
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        maxPages,
      );
    }

    if (currentPage !== maxPages) {
      pages.push("next");
    }

    return pages;
  };
  const pages = getPageNumbers(currentPage, maxPages);

  return (
    <Pagination>
      <PaginationContent>
        {pages.map((pageNr, i) => {
          switch (pageNr) {
            case "ellipsis":
              return (
                <PaginationItem key={i}>
                  <Popover>
                    <PopoverTrigger>
                      <PaginationEllipsis />
                    </PopoverTrigger>
                    <PopoverContent className="w-20 p-0">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handlePageChange(Number(inputPage));
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <Input
                          type="number"
                          min={1}
                          max={maxPages}
                          className="w-full"
                          value={inputPage}
                          onChange={(e) => setInputPage(e.target.value)}
                        />
                      </form>
                    </PopoverContent>
                  </Popover>
                </PaginationItem>
              );
            case "next":
              return (
                <PaginationItem key={i}>
                  <PaginationNext
                    onClick={() => {
                      handlePageChange(Number(currentPage) + 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </PaginationItem>
              );
            case "previous":
              return (
                <PaginationItem key={i}>
                  <PaginationPrevious
                    onClick={() => {
                      handlePageChange(Number(currentPage) - 1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  />
                </PaginationItem>
              );
            default:
              return (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={pageNr === currentPage}
                    onClick={() => {
                      handlePageChange(Number(pageNr));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {pageNr}
                  </PaginationLink>
                </PaginationItem>
              );
          }
        })}
      </PaginationContent>
    </Pagination>
  );
}

export default FuncPagination;
