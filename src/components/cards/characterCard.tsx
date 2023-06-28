import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface IHeroType {
  hero: {
    id: number;
    name: string;
    thumbnail: { path: string };
    comics: { available: string };
    events: { available: string };
    series: { available: string };
  };
  click: () => void
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
      <button
        className="rounded-xl flex flex-row group/card h-[220px] max-w-[340px] overflow-hidden"
        onClick={click}
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
      </button>
    </motion.li>
  );
};

export default CharacterCard;
