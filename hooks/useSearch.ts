import { useState } from "react";

//Filter based on passed filter function.
type Props<T> = {
  filterFunc: (item: T, query: string) => boolean;
  items: T[];
};

function useSearch<T>({ filterFunc, items }: Props<T>) {
  const [searchQuery, setSearchQuery] = useState("");

  //filter input, return filtered input
  const filteredItems = items.filter((item) => filterFunc(item, searchQuery));

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
  };
}

export default useSearch;
