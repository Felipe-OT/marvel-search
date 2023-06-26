"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getResults from "@/src/lib/getResults";
import useSearch from "@/src/hooks/useSearch";
import SearchInput from "@/src/components/inputs/SearchInput";
import { motion, AnimatePresence } from "framer-motion";
import CharacterCard from "@/src/components/cards/characterCard";

interface IHeroType {
  id: number;
  name: string;
  thumbnail: { path: string };
  comics: { available: string };
  events: { available: string };
  series: { available: string };
}

function ResultPage() {
  const { setSearchValue, searchValue } = useSearch();
  const [results, setResults] = useState([]);

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-0 py-28">
      <div className="container mx-auto flex flex-col gap-y-10 justify-center items-center">
        <motion.div
          className={`flex flex-col w-full justify-center items-center`}
        >
          <AnimatePresence mode={"popLayout"}>
            <motion.div
              layout
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <SearchInput
                searchCharacter={() => SearchAgain()}
                setSearchValue={setSearchValue}
              />
            </motion.div>

            <motion.div
              animate={{ transition: { duration: 0.5, delay: 0.3 } }}
              className={`grid grid-cols-1 gap-5 md:gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-center w-fit ${
                results.length > 0 && "mt-16"
              }`}
            >
              <AnimatePresence  mode={"popLayout"} initial={false}>
                {results?.map((hero: IHeroType) => (
                  <CharacterCard key={hero.id} hero={hero}/>
                ))}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default ResultPage;
