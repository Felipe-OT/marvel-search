import { Container } from "@/src/app/styles";
import { motion } from "framer-motion";
import { styled } from "styled-components";

export const CharacterInfoContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  margin-bottom: 2.5rem;
  margin-left: auto;
  margin-right: auto;
`;

export const CharacterInfoBoard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 0.75rem;
  background-color: rgb(26 32 55 / 0.25);
  padding-left: 1.25rem /* 20px */;
  padding-right: 1.25rem /* 20px */;
  padding-top: 2.5rem /* 40px */;
  padding-bottom: 2.5rem /* 40px */;
  border-radius: 0.75rem;
  backdrop-filter: blur(20px);
  row-gap: 5rem;

  @media (min-width: 768px) {
    padding: 5rem;
  }
`;

export const CloseBtn = styled.button`
  position: absolute;
  right: 2.5rem;
  top: 2.5rem;
  padding: 0.75rem;
  border-radius: 100%;
  background-color: rgba(24, 42, 63, 0.35);

  &:hover {
    background-color: rgba(0, 0, 0, 0.35);
  }
;
`

export const CharacterBasicInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  column-gap: 2.5rem;
  text-align: center;

  > div {
    display: flex;
    flex-direction: column;
    row-gap: 1.25rem;
    margin-top: 1.25rem;
    max-width: 900px;

    > h1 {
      font-size: 3rem /* 48px */;
      line-height: 1;
    }

    > p {
      font-size: 1.25rem /* 20px */;
      line-height: 1.75rem /* 28px */;
    }
  }

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
  }
`;

export const CharacterInfoAccordionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
`