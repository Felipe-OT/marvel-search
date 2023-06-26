import styled from "styled-components";
import React from "react";
import { motion } from 'framer-motion';

export const SearchInputContainer = styled(motion.div)`
  width: 100%;
  max-width: 600px;
  background: rgba(31, 56, 92, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(5px);
  border-radius:  50PX;
  padding-right: 0.75rem;
  padding-left: 1.5rem;
  padding-block: 0.5rem;
  margin-inline: auto;
`;

export const SearchForm = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`
export const StyledSearchInput = styled.input`
    color: white;
    display: flex;
    width: 100%;
    background-color: transparent;
    border-width: 0px;
     &:focus {
        outline-width: 0px;
     }
     &::placeholder{
        color: #858ba7;
     }
`