import { useState } from "react";
import useDebounce from "./useDebounce";

//Filter based on passed filter function.
type Props<T> = {
  filterFunc: (item: T, query: string) => boolean;
  items: T[];
};

function useSearch<T>({ filterFunc, items }: Props<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery);

  //filter input, return filtered input
  const filteredItems = items.filter((item) =>
    filterFunc(item, debouncedQuery),
  );

  return {
    searchQuery,
    setSearchQuery,
    filteredItems,
  };
}

export default useSearch;
