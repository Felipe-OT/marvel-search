import { motion } from "framer-motion";
import { styled } from "styled-components";
import { Container } from "../styles";

export const ResultsPage = styled(motion.div)<{ pageOpacity: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-left: 1rem /* 16px */;
  padding-right: 1rem /* 16px */;
  padding-top: 7rem /* 112px */;
  padding-bottom: 7rem /* 112px */;
  opacity: ${(props) => (props.pageOpacity == true ? 1 : 0)};
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-duration: 300ms;

  @media (min-width: 640px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const ResultsContainer = styled(Container)<{ gapY: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: ${(props) => props.gapY};
  margin-left: auto;
  margin-right: auto;
`;

export const InputWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  align-items: center;
  row-gap: 0.75rem;

`;

export const ResultListWrapper = styled(motion.ul)<{mt?: string}>`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.25rem;
  width: fit-content;
  justify-content: center;
  margin-top: ${props => props.mt};

  @media (min-width: 768px) {
    gap: 2.5rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    gap: 2.5rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;
