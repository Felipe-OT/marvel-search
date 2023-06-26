"use client";

import SearchInput from "../components/inputs/SearchInput";
import { useRouter } from 'next/navigation'
import { NextRouter } from "next/router";
import useSearch from "../hooks/useSearch";
import { useState } from "react";

export default function Home() {
  const {setSearchValue} = useSearch()
  const router = useRouter()

  const searchCharacter = () => {
    router.push('result')
  }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-0 py-28">
      <div className="container mx-auto flex flex-col gap-y-10 justify-center items-center">
        <SearchInput searchCharacter={() => searchCharacter()} setSearchValue={setSearchValue}/>
      </div>
    </div>
  );
}
