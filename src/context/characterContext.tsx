"use client";

import {
  ReactNode,
  createContext,
  useState,
} from "react";

type Character = {
  characterName: string;
  characterImage: string;
  characterDescription: string;
};

export interface CharacterContextProp {
  characterData?: Character;
  setCharacterData: (character: Character) => void;
}

export const CharacterContext = createContext<CharacterContextProp | undefined>(
  undefined
);

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [characterData, setCharacterData] =
    useState<Character>();

  return (
    <CharacterContext.Provider value={{ characterData, setCharacterData }}>
      {children}
    </CharacterContext.Provider>
  );
}
