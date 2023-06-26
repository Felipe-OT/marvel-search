"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getResults from "@/src/lib/getResults";
import useSearch from "@/src/hooks/useSearch";
import SearchInput from "@/src/components/inputs/SearchInput";
import { motion, AnimatePresence } from "framer-motion";

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
                  <motion.button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.5, delay: 0.3, scale: 0.8 },
                    }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl flex flex-row group/card h-[220px] max-w-[340px] overflow-hidden"
                    key={hero.id}
                  >
                    <Image
                      className="saturate-0 group-hover/card:saturate-100 transition-all duration-300"
                      width={170}
                      height={220}
                      src={hero.thumbnail.path + "/portrait_uncanny.jpg"}
                      alt="heroi"
                    />

                    <div className="h-full bg-[#353535] bg-opacity-50 group-hover/card:bg-[#970000]/40 backdrop-blur-sm px-3 sm:px-[6px] md:px-[10px] py-5 w-[170px] flex flex-col justify-between items-center transition-all duration-300">
                      <span className="text-center text-lg sm:text-base md:text-lg font-bold">
                        {hero.name}
                      </span>
                      <div className="w-full flex flex-col gap-y-2 font-bold">
                        <div className="flex flex-row justify-between ">
                          <span>Comics</span>
                          <div className="p-[5px] bg-white/40 group-hover/card:bg-fuchsia-500 rounded-lg min-w-[29px] h-[29px] flex justify-center items-center font-bold  transition-all duration-300">
                            <span>{hero.comics.available}</span>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <span>Eventos</span>
                          <div className="p-[5px] bg-white/40 group-hover/card:bg-red-500 rounded-lg min-w-[29px] h-[29px] flex justify-center items-center font-bold  transition-all duration-300">
                            <span>{hero.events.available}</span>
                          </div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <span>Séries</span>
                          <div className="p-[5px] bg-white/40 group-hover/card:bg-blue-500 rounded-lg min-w-[29px] h-[29px] flex justify-center items-center font-bold  transition-all duration-300">
                            <span>{hero.series.available}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
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
