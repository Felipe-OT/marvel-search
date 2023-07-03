import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  CardButton,
  CardImage,
  CardInfo,
  CharCardInfoContent,
  CharCardInfoQuantityBox,
  CharName,
} from "./styles";
import { FlexRowBetween } from "@/src/app/styles";

interface IHeroType {
  hero: {
    id: number;
    name: string;
    thumbnail: { path: string };
    comics: { available: string };
    events: { available: string };
    series: { available: string };
  };
  click: () => void;
}

const CharacterCard = ({ hero, click }: IHeroType) => {
  return (
    <motion.li
      key={hero.id}
      layout
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5, delay: 0.3, scale: 0.8 },
      }}
      exit={{ opacity: 0 }}
    >
      <CardButton onClick={click}>
        <CardImage
          width={170}
          height={220}
          src={hero.thumbnail.path + "/portrait_uncanny.jpg"}
          alt="heroi"
        />
        <CardInfo>
          <CharName>{hero.name}</CharName>
          <CharCardInfoContent>
            <FlexRowBetween>
              <span>Comics</span>
              <CharCardInfoQuantityBox type={"comics"}>
                <span>{hero.comics.available}</span>
              </CharCardInfoQuantityBox>
            </FlexRowBetween>
            <FlexRowBetween>
              <span>Events</span>
              <CharCardInfoQuantityBox type={"events"}>
                <span>{hero.events.available}</span>
              </CharCardInfoQuantityBox>
            </FlexRowBetween>
            <FlexRowBetween>
              <span>Series</span>
              <CharCardInfoQuantityBox type={"series"}>
                <span>{hero.series.available}</span>
              </CharCardInfoQuantityBox>
            </FlexRowBetween>
          </CharCardInfoContent>
        </CardInfo>
      </CardButton>
    </motion.li>
  );
};

export default CharacterCard;
