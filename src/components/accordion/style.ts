import { styled } from "styled-components";
import { motion } from "framer-motion";

export const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccordionTitleWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  column-gap: 0.75rem;
  align-items: center;
  cursor: pointer;
  margin-bottom: 2.5rem;
  > div {
    transition: all;
    transition-duration: 300ms;
    ${(props) =>
      props.isOpen == true
        ? "transform: rotate(180deg) scaleX(-1) "
        : "transform: rotate(0)"}
  }

  > span {
    font-size: 1.25rem /* 20px */;
    line-height: 1.75rem; /* 28px */
  }
`;

export const AccordionContentWrapper = styled(motion.div)`
  overflow: hidden;
`;

export const AccordionCardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 2.5rem;

  @media (min-width: 768px) {
    padding-left: 1.25rem /* 20px */;
    padding-right: 1.25rem /* 20px */;
  }
`;

export const AccordionItemCard = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex: 1 1 0%;
  column-gap: 0.75rem;
  min-width: 330px;
  max-width: 418px;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    row-gap: 1.25rem;
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;

    @media (min-width: 1024px) {
      max-width: 275px;
    }
    @media (min-width: 1280px) {
      max-width: none;
    }
  }
`;

export const SeeMoreBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 1.25rem /* 20px */;
  padding-bottom: 1.25rem /* 20px */;

  > span {
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
    font-weight: 700;
  }
`;

export const LoadContentAnimationWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
`;
