import { motion } from "framer-motion";
import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;

  @media (min-width: 640px) {
    max-width: 640px;
  }
  @media (min-width: 768px) {
    max-width: 768px;
  }
  @media (min-width: 1024px) {
    max-width: 1024px;
  }
  @media (min-width: 1280px) {
    max-width: 1280px;
  }
  @media (min-width: 1536px) {
    max-width: 1536px;
  }
`;

export const HomePageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 1rem /* 16px */;
  padding-right: 1rem /* 16px */;
  padding-top: 7rem /* 112px */;
  padding-bottom: 7rem /* 112px */;

  @media (min-width: 640px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const HomeInputContainer = styled(Container)`
  margin-left: auto;
  margin-right: auto;
`;

export const HomeInputWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 2.5rem;
  justify-content: center;
  align-items: center;
`

export const FlexRowBetween = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
