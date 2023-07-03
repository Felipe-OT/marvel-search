import Image from "next/image";
import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "@/public/animations/loadingAnimation.json";
import { AnimatePresence, motion } from "framer-motion";
import { AccordionCardsWrapper, AccordionContentWrapper, AccordionItemCard, AccordionTitleWrapper, AccordionWrapper, LoadContentAnimationWrapper, SeeMoreBtnWrapper } from "./style";
import LineDivisor from "../divisors/lineDivisor";

type ContentInfo = {
  id: number;
  image: string;
  title: string;
  date: string;
};

type BasicInfo = {
  title: string;
  content: { data: ContentInfo[] };
  getContent: () => void;
  offset: () => void;
};

const CharacterInfoAccordion = ({
  title,
  content,
  getContent,
  offset,
}: BasicInfo) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const formateDate = (date: string) => {
    const formated = date.slice(0, 10).replace(/-/g, " / ");
    return formated;
  };

  useEffect(() => {

    if (isOpen && content.data.length == 0) {
      handleLoadContent();
    }
  }, [isOpen]);

  const handleLoadContent = async () => {
    setLoading(true);
    await getContent();
    setLoading(false);
  };

  const getMoreData = async () => {
    setLoading(true);
    await offset();
    setLoading(false);
  };

  return (
    <AccordionWrapper>
      <AccordionTitleWrapper
        isOpen={isOpen}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span>{title}</span>
        <div>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.40771 11.125L10.9494 14.6667L14.491 11.125"
              stroke="#4067B4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.15771 3.33333H8.11605C8.86749 3.33333 9.58816 3.63184 10.1195 4.1632C10.6509 4.69455 10.9494 5.41522 10.9494 6.16667V14.6667"
              stroke="#4067B4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </AccordionTitleWrapper>
      <AnimatePresence>
        {isOpen && (
          <AccordionContentWrapper
            key={"accordion-content"}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0, transition: { duration: 1 } }}
          >
            <AccordionCardsWrapper>
              {content?.data.map((item: ContentInfo) => (
                <AccordionItemCard
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
                >
                  <Image
                    width={100}
                    height={150}
                    src={item.image + "/portrait_medium.jpg"}
                    alt={item.title}
                  />
                  <div>
                    <span>Title: {item.title}</span>
                    <span>
                      Release:{" "}
                      {item.date?.length > 4
                        ? formateDate(item.date)
                        : item.date}
                    </span>
                  </div>
                </AccordionItemCard>
              ))}
            </AccordionCardsWrapper>
            {loading && (
              <LoadContentAnimationWrapper
                key={"loading"}
                className="w-full flex justify-center"
              >
                <Lottie
                  animationData={LoadingAnimation}
                  loop={true}
                  style={{ width: 100, height: 100, alignSelf: "center" }}
                />
              </LoadContentAnimationWrapper>
            )}
            {!loading && content.data.length > 0 && (
              <SeeMoreBtnWrapper>
                <button onClick={() => getMoreData()}>
                  <span>See more</span>
                </button>
              </SeeMoreBtnWrapper>
            )}
          </AccordionContentWrapper>
        )}
      </AnimatePresence>
      <LineDivisor />
    </AccordionWrapper>
  );
};

export default CharacterInfoAccordion;
