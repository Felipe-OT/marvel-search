import Image from "next/image";
import React, { useEffect, useState } from "react";

const CharacterInfoAccordion = ({ title, content, getContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(content.data);
  }, [content]);

  const formateDate = (date:string) => {
    const formated = date.slice(0, 10).replace(/-/g, ' / ')
    return formated
  }


  return (
    <div className="flex flex-col gap-y-10 ">
      <div
        className="flex flex-row gap-x-3 items-center cursor-pointer"
        onClick={() => {
          getContent();

          setIsOpen(!isOpen);
        }}
      >
        <span className="text-xl">{title}</span>
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.15771 3.33333H8.11605C8.86749 3.33333 9.58816 3.63184 10.1195 4.1632C10.6509 4.69455 10.9494 5.41522 10.9494 6.16667V14.6667"
              stroke="#4067B4"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className={`${!isOpen && "hidden"}`}>
        <div className="flex flex-row flex-wrap justify-start gap-10 md:px-5">
          {content.data?.length > 0
            ? content.data?.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row gap-x-3 flex-1 min-w-[330px] max-w-[418px] items-center"
                >
                  <Image
                    width={100}
                    height={150}
                    src={item.image + "/portrait_medium.jpg"}
                    alt={item.title}
                  />
                  <div className="flex flex-col gap-y-5 lg:max-w-[275px] xl:max-w-none text-lg flex-1">
                    <span>Title: {item.title}</span>
                    <span>Release: {item.date.length > 4 ? formateDate(item.date) : item.date}</span>
                  </div>
                </div>
              ))
            : "Sem conteúdo"}
        </div>
      </div>
    </div>
  );
};

export default CharacterInfoAccordion;
