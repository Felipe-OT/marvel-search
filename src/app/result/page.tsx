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

function ResultPage() {
  const { setSearchValue, searchValue } = useSearch();
  const { setCharacterData, characterData } = useCharacter();
  const [results, setResults] = useState([]);
  const [pageOpacity, setPageOpacity] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const resultData = await getResults(searchValue);
      setResults(resultData);
    };
    fetchData();
  }, []);

  const SearchAgain = async () => {
    const resultData = await getResults(searchValue);
    setResults(resultData);
  };

  useEffect(() => {
    console.log(results)
  },[results])

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
      router.push("result/character-info/" + characterId);
    }, 300);
  };

  return (
    <motion.div
      className={`flex min-h-screen flex-col items-center justify-center px-4 sm:px-0 py-28 ${
        pageOpacity ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div className="container mx-auto flex flex-col gap-y-10 justify-center items-center">
        <LayoutGroup>
          <motion.div
            layout="position"
            key={"inputKey"}
            transition={{ duration: 0.5 }}
            className="w-full flex"
          >
            <SearchInput
              value={searchValue}
              searchCharacter={() => SearchAgain()}
              setSearchValue={setSearchValue}
            />
          </motion.div>
          <motion.ul
            key={"resultList"}
            className={`grid grid-cols-1 gap-5 md:gap-10 md:gap-x-16 sm:grid-cols-2 lg:grid-cols-3 justify-center w-fit ${
              results.length > 0 && "mt-16"
            }`}
          >
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
          </motion.ul>
        </LayoutGroup>
      </div>
    </motion.div>
  );
}

export default ResultPage;
