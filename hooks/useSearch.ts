import { useState } from "react";

function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  return {
    searchQuery,
    setSearchQuery,
  };
}

export default useSearch;
