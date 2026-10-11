import { useState } from "react";

type Props<T> = {
  items: T[];
  pageSize: number;
};

function usePagination<T>({ items, pageSize }: Props<T>) {
  const [curPage, setCurPage] = useState(1);

  const startIndex = (curPage - 1) * pageSize;
  const itemsToShow = items.slice(startIndex, startIndex + pageSize);
  return {
    curPage,
    setCurPage,
    itemsToShow,
  };
}

export default usePagination;
