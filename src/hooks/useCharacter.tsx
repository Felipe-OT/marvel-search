import { useContext } from "react";
import { CharacterContext, CharacterContextProp } from "../context/characterContext";

const useCharacter = (): CharacterContextProp => {
  
  const characterContext = useContext(CharacterContext)
  
  if(!characterContext) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  return characterContext

};

export default useCharacter;
