"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CharacterInfoAccordion from "@/src/components/accordion/characterInfoAccordion";
import {
  getCharacterBasicInfo,
  getCharacterInfo,
} from "@/src/lib/getCharacterInfo";
import {
  CharacterBasicInfo,
  CharacterInfoAccordionWrapper,
  CharacterInfoBoard,
  CharacterInfoContainer,
  CloseBtn,
} from "./styles";
import { useRouter } from "next/navigation";

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

const CharacterInfo = ({ params }: { params: { id: string } }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
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
  };

  async function getBasicData() {
    const res = await getCharacterBasicInfo(params.id);
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
        <CharacterInfoContainer>
          <CharacterInfoBoard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0 }}
          >
            <CloseBtn onClick={() => router.back()}>
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.997559 0.871216L9.65956 9.53323M9.65958 0.871216L0.997579 9.53323"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </CloseBtn>
            <CharacterBasicInfo>
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
              <div>
                <h1>{basicData?.name}</h1>
                <p
                  dangerouslySetInnerHTML={{
                    __html: basicData?.description
                      ? basicData?.description
                      : "Sem descrição",
                  }}
                />
              </div>
            </CharacterBasicInfo>
            <CharacterInfoAccordionWrapper>
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
            </CharacterInfoAccordionWrapper>
          </CharacterInfoBoard>
        </CharacterInfoContainer>
      )}
    </>
  );
};

export default CharacterInfo;
