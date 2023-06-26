import React, { ChangeEvent, FormEvent } from "react";
import magIcon from "@/public/mag.svg";
import Image from "next/image";
import { SearchInputContainer, SearchForm, StyledSearchInput } from "./styles";
import SearchButton from "../buttons/SearchButton";
import { ISearchInput } from "@/src/types/types";
import { motion } from "framer-motion";

function SearchInput({ searchCharacter, setSearchValue }: ISearchInput) {
  return (
    <SearchInputContainer>
      <SearchForm
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          searchCharacter();
        }}
      >
        <StyledSearchInput
          type="text"
          placeholder="Pesquise aqui o herói ou vilão"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
        <SearchButton>
          <Image
            className="group-hover/search:scale-110 transition-all"
            src={magIcon}
            alt="search button"
          />
        </SearchButton>
      </SearchForm>
    </SearchInputContainer>
  );
}

export default SearchInput;
