import styled, { keyframes } from "styled-components";
import { bounce } from "react-animations";

export const Bounce = styled.div`
  animation: 7s ${keyframes`${bounce}`} infinite;
`;
