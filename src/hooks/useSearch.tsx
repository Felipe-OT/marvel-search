import { useContext } from "react";
import {SearchContext, SearchContextProp } from "../context/searchContext";

const useSearch = (): SearchContextProp => {
  
  const searchContext = useContext(SearchContext)
  
  if(!searchContext) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  return searchContext

};

export default useSearch;
