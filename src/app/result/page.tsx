"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getResults from "@/src/lib/getResults";
import useSearch from "@/src/hooks/useSearch";
import SearchInput from "@/src/components/inputs/SearchInput";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import CharacterCard from "@/src/components/cards/characterCard";
import PageWrapper from "@/src/components/wrapper/page-wrapper";
import useCharacter from "@/src/hooks/useCharacter";
import { InputWrapper, ResultListWrapper, ResultsContainer, ResultsPage } from "./styles";

interface IHeroType {
  id: number;
  name: string;
  description: string;
  thumbnail: { path: string };
  comics: { available: string };
  events: { available: string };
  series: { available: string };
}

type SearchError = {
  msg: string;
  status: number;
};

function ResultPage() {
  const { setSearchValue, searchValue } = useSearch();
  const { setCharacterData, characterData } = useCharacter();
  const [results, setResults] = useState([]);
  const [searchError, setSearchError] = useState<SearchError>();
  const [pageOpacity, setPageOpacity] = useState(true);
  const router = useRouter();



  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {

    const resultData = await getResults(searchValue);
    if (resultData.status == 500) {
      setSearchError({ msg: resultData.msg, status: resultData.status });
      setResults([]);
    } else {
      setResults(resultData);
      setSearchError({ msg: "", status: 200 });
    }
  };

  const SearchAgain = async () => {
    fetchData();
  };

  const goToInfoPage = (
    characterId: number,
    characterName: string,
    characterImage: string,
    characterDescription: string
  ) => {
    setCharacterData({
      characterName: characterName,
      characterImage: characterImage,
      characterDescription: characterDescription,
    });
    setPageOpacity(false);
    setTimeout(() => {
      router.push(`result/character-info/${characterId}`);
    }, 250);
  };


  return (
    <ResultsPage pageOpacity={pageOpacity}>
      <ResultsContainer
        gapY={results.length > 0 ? '2.5rem' : '0'}
      >
        <LayoutGroup>
          <InputWrapper
            layout="position"
            key={"inputKey"}
            transition={{ duration: 0.5 }}
          >
            <SearchInput
              value={searchValue}
              searchCharacter={() => SearchAgain()}
              setSearchValue={setSearchValue}
            />
            {searchError?.status == 500 && (
              <div>
                <span>{searchError.msg}</span>
              </div>
            )}
          </InputWrapper>
          <ResultListWrapper
            key={"resultList"}
            mt={results.length > 0 ? "4rem" : '0'}
          >
            {Array.isArray(results) && (
              <AnimatePresence mode="wait">
                {results?.map((hero: IHeroType) => (
                  <CharacterCard
                    key={hero.id}
                    hero={hero}
                    click={() =>
                      goToInfoPage(
                        hero.id,
                        hero.name,
                        hero.thumbnail.path,
                        hero.description
                      )
                    }
                  />
                ))}
              </AnimatePresence>
            )}
          </ResultListWrapper>
        </LayoutGroup>
      </ResultsContainer>
    </ResultsPage>
  );
}

export default ResultPage;
