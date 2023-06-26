"use client";

import SearchInput from "../components/inputs/SearchInput";
import { useRouter } from "next/navigation";
import useSearch from "../hooks/useSearch";
import { motion } from "framer-motion";

export default function Home() {
  const { setSearchValue } = useSearch();
  const router = useRouter();

  const searchCharacter = () => {
    router.push("result");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-0 py-28">
      <div className="container mx-auto flex flex-col gap-y-10 justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          <SearchInput
            searchCharacter={() => searchCharacter()}
            setSearchValue={setSearchValue}
          />
        </motion.div>
      </div>
    </div>
  );
}
