import styled from '@emotion/styled';
import { PRIMARY } from 'src/shared/colors';

export const Button = styled.button`
  color: white;
  font-size: 16px;
  height: 50px;
  font-family: 'Montserrat';
  min-width: 150px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${PRIMARY};
  border-color: transparent;
  &:hover {
    background-color: white;
    color: ${PRIMARY};
    border: 2px solid ${PRIMARY};
  }
`;

export const ButtonOutline = styled.button`
  color: ${PRIMARY};
  font-size: 16px;
  height: 50px;
  font-family: 'Montserrat';
  min-width: 150px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: white;
  border: 2px solid ${PRIMARY};
  &:hover {
    background-color: ${PRIMARY};
    border: 2px solid white;
    color: white;
  }
`;
