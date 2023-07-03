"use client";

import SearchInput from "../components/inputs/SearchInput";
import { useRouter } from "next/navigation";
import useSearch from "../hooks/useSearch";
import { motion } from "framer-motion";
import { HomeInputContainer, HomeInputWrapper, HomePageWrapper } from "./styles";

export default function Home() {
  const { setSearchValue, searchValue } = useSearch();
  const router = useRouter();

  const searchCharacter = () => {
    router.push("result");
  };

  return (
    <HomePageWrapper>
      <HomeInputContainer>
        <HomeInputWrapper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0 }}
        ></HomeInputWrapper>
        <SearchInput
          value={searchValue}
          searchCharacter={() => searchCharacter()}
          setSearchValue={setSearchValue}
        />
      </HomeInputContainer>
    </HomePageWrapper>
  );
}
