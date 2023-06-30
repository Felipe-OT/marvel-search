"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useCharacter from "@/src/hooks/useCharacter";
import CharacterInfoAccordion from "@/src/components/accordion/characterInfoAccordion";
import LineDivisor from "@/src/components/divisors/lineDivisor";
import {
  getCharacterBasicInfo,
  getCharacterInfo,
} from "@/src/lib/getCharacterInfo";

type DataFetch = {
  comics: string;
  events: string;
  series: string;
};

type BasicInfo = {
  name: string;
  image: string;
  description: string;
};

type ContentType = {
  comics: [];
  events: [];
  series: [];
};

const CharacterInfo = ({ params }: { params: { id: string } }) => {
  const { characterData } = useCharacter();

  const [basicData, setBasicData] = useState<BasicInfo>();
  const [content, setContent] = useState<ContentType>({
    comics: [],
    events: [],
    series: [],
  });

  const [dataSearchOffset, setDataSearchOffset] = useState({
    comics: "0",
    events: "0",
    series: "0",
  });

  const characterInfo = async (search: string) => {
    const offset = search as keyof DataFetch;

    const data = await getCharacterInfo(
      params.id,
      search,
      dataSearchOffset[offset]
    );
    console.log(data);
    setContent((prevContent) => ({
      ...prevContent,
      [search]: { ...prevContent.comics, data },
    }));
  };

  useEffect(() => {
    getBasicData();
  }, []);

  async function getBasicData() {
    const res = await getCharacterBasicInfo(params.id);
    setBasicData(res);
  }

  return (
    <div className="container mx-auto flex flex-col pt-20 mb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0 }}
        className="bg-[#1A2037]/70 p-20 rounded-3xl backdrop-blur-[20px] flex flex-col gap-y-20"
      >
        <div className="flex gap-x-10">
          {basicData && (
            <Image
              priority
              className="rounded-lg"
              width={170}
              height={220}
              src={basicData?.image + "/portrait_fantastic.jpg"}
              alt="heroi"
            />
          )}
          <div className="flex flex-col gap-y-5 mt-5 max-w-[900px]">
            <h1 className="text-5xl">{basicData?.name}</h1>
            <p
              className="text-xl"
              dangerouslySetInnerHTML={{
                __html: basicData?.description
                  ? basicData?.description
                  : "Sem descrição",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-y-6">
          <CharacterInfoAccordion
            title={"Comics"}
            content={content.comics}
            getContent={() => characterInfo("comics")}
          />
          <LineDivisor />
          <CharacterInfoAccordion
            title={"Events"}
            content={content.events}
            getContent={() => characterInfo("events")}
          />
          <LineDivisor />
          <CharacterInfoAccordion
            title={"Series"}
            content={content.series}
            getContent={() => characterInfo("series")}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterInfo;
