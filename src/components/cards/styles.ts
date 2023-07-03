import Image from "next/image";
import { styled } from "styled-components";

interface CharCardInfoQuantityBoxProps {
  type: "comics" | "events" | "series";
}

export const CardButton = styled.button`
  display: flex;
  flex-direction: row;
  max-width: 340px;
  height: 220px;
  border-radius: 0.75rem;
  overflow: hidden;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 170px;
  height: 100%;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  background-color: #35353550;
  backdrop-filter: blur(10px);
  transition: all;
  transition-duration: 300ms;

  ${CardButton}:hover & {
    background-color: #97000040;
  }

  @media (min-width: 640px) {
    padding-left: 0.35rem;
    padding-right: 0.35rem;
  }

  @media (min-width: 768px) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
`;

export const CardImage = styled(Image)`
  filter: saturate(0);
  transition: all;
  transition-duration: 300ms;

  ${CardButton}:hover & {
    filter: saturate(1);
  }
`;

export const CharName = styled.div`
  text-align: center;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;

  @media (min-width: 640) {
    font-size: 1rem /* 16px */;
    line-height: 1.5rem;
  }

  @media (min-width: 768px) {
    font-size: 1.125rem /* 18px */;
    line-height: 1.75rem /* 28px */;
  }
`;

export const CharCardInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  width: 100%;
  font-weight: 700;
`;

export const CharCardInfoQuantityBox = styled.div<CharCardInfoQuantityBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 29px;
  height: 29px;
  padding: 5px;
  background-color: rgb(255 255 255 / 0.4);
  border-radius: 0.5rem;
  font-weight: 700;
  transition: all;
  transition-duration: 300ms;

  ${CardButton}:hover & {
    background-color: ${(props) =>
      props.type == "comics"
        ? "rgb(217 70 239)"
        : props.type == "events"
        ? "rgb(239 68 68)"
        : "rgb(59 130 246)"};
  }
`;
