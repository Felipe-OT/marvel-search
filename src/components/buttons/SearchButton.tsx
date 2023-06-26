import React from "react";
import * as S from "./styles";

function SearchButton({ children }: { children: React.ReactNode }) {
  return (
    <S.SearchButton type="submit" className="group/search">
      {children}
    </S.SearchButton>
  );
}

export default SearchButton;
