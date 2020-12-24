import styled from "styled-components";

export const Container = styled.div`
  background-color: ${props => props.backgroundColor || "#FFFFFF"};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Text = styled.p`
  font-size: 64pt;
  text-transform: uppercase;
  color: ${props => props.color || "#303030"};
  margin: 0px;
`;
export const Description = styled.p`
  font-size: 12pt;
  text-transform: uppercase;
  color: ${props => props.color || "#303030"};
  margin: 0px;
`;
export const Button = styled.p`
  font-size: 12pt;
  color: ${props => props.color || "#303030"};
  margin-top: 8px;
`;
