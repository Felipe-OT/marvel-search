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
  comics: { data: any[] };
  events: { data: any[] };
  series: { data: any[] };
};

type SearchParams = {
  offsetSearch: "comics" | "events" | "series";
};

const CharacterInfo = ({ params }: { params: { id: string } }) => {
  const [mounted, setMounted] = useState(false);
  const [basicData, setBasicData] = useState<BasicInfo>();
  const [offsetParameter, setOffsetParameter] = useState<
    "comics" | "events" | "series"
  >();
  const [content, setContent] = useState<ContentType>({
    comics: { data: [] },
    events: { data: [] },
    series: { data: [] },
  });

  const [dataSearchOffset, setDataSearchOffset] = useState({
    comics: 0,
    events: 0,
    series: 0,
  });

  const characterInfo = async (
    search: "comics" | "events" | "series",
    offsetSearch: number
  ) => {
    const offset = search as keyof DataFetch;
    const data = await getCharacterInfo(params.id, search, offsetSearch);
    setContent((prevContent) => ({
      ...prevContent,
      [search]: {
        ...prevContent[search],
        data: prevContent[search].data
          ? [...prevContent[search].data, ...data]
          : data,
      },
    }));
    console.log('first')
  };

  async function getBasicData() {
    const res = await getCharacterBasicInfo(params.id);
    console.log(res);
    setBasicData(res);
  }

  const getMoreData = async (search: "comics" | "events" | "series") => {
    setDataSearchOffset((prevContent) => ({
      ...prevContent,
      [search]: prevContent[search] + 20,
    }));
    setOffsetParameter(search);
    await characterInfo(search, dataSearchOffset[search] + 20);
  };

  useEffect(() => {
    getBasicData();
  }, []);

  return (
    <>
      {basicData && (
        <div className="container mx-auto flex flex-col pt-20 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0 }}
            className="bg-[#1A2037]/25 px-5 py-10 md:p-20 rounded-xl backdrop-blur-[20px] flex flex-col gap-y-20"
          >
            <div className="flex flex-col md:flex-row  items-center gap-x-10">
              {basicData && (
                <Image
                  priority
                  className="rounded-lg"
                  width={170}
                  height={220}
                  src={basicData?.image + "/portrait_uncanny.jpg"}
                  alt="heroi"
                />
              )}
              <div className="flex flex-col gap-y-5 mt-5 max-w-[900px] text-center md:text-left">
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
                offset={() => getMoreData("comics")}
                getContent={() => characterInfo("comics", 0)}
              />

              <CharacterInfoAccordion
                title={"Events"}
                content={content.events}
                offset={() => getMoreData("events")}
                getContent={() => characterInfo("events", 0)}
              />

              <CharacterInfoAccordion
                title={"Series"}
                content={content.series}
                offset={() => getMoreData("series")}
                getContent={() => characterInfo("series", 0)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CharacterInfo;
