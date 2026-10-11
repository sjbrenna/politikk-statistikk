"use client";

import { ApiCase } from "@/lib/stortinget/types/case";
import { createContext } from "react";

type CasesProviderType = {
  cases: ApiCase[];
};

export const CasesProviderContext = createContext<CasesProviderType>({
  cases: [],
});

export function CasesProvider({
  initialCases,
  children,
}: {
  initialCases: ApiCase[];
  children: React.ReactNode;
}) {
  return (
    <CasesProviderContext.Provider value={{ cases: initialCases }}>
      {children}
    </CasesProviderContext.Provider>
  );
}
