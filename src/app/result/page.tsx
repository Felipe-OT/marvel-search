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
      setSearchError({msg: '', status: 200});
    }
  };

  const SearchAgain = async () => {
    fetchData()
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

  useEffect(() => {
    console.log(searchError)
  },[searchError])

  return (
    <motion.div
      className={`flex min-h-screen flex-col items-center justify-center px-4 sm:px-0 py-28  ${
        pageOpacity ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div
        className={`container mx-auto flex flex-col  ${
          results.length > 0 && "gap-y-10"
        }  justify-center items-center`}
      >
        <LayoutGroup>
          <motion.div
            layout="position"
            key={"inputKey"}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full relative items-center gap-y-3"
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
          </motion.div>
          <motion.ul
            key={"resultList"}
            className={`grid grid-cols-1 gap-5 md:gap-10 md:gap-x-16 sm:grid-cols-2 lg:grid-cols-3 justify-center w-fit  ${
              results.length > 0 && "mt-16"
            }`}
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
          </motion.ul>
        </LayoutGroup>
      </div>
    </motion.div>
  );
}

export default ResultPage;
