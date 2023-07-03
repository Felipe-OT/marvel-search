import { motion } from "framer-motion";
import { styled } from "styled-components";

export const ResultsContainer = styled(motion.div)<{ pageOpacity: boolean }>`
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
