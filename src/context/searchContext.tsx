"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";



export interface SearchContextProp {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>
}

export const SearchContext = createContext<SearchContextProp | null>(null);

export function SearchProvider({ children }:{children: ReactNode}) {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
}
