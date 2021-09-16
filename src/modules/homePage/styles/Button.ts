import styled from '@emotion/styled';

export const Button = styled.button`
  color: white;
  font-size: 16px;
  height: 50px;
  font-family: 'Montserrat';
  min-width: 150px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: #7a39e0;
  border-color: transparent;
  &:hover {
    background-color: white;
    color: #7a39e0;
    border: 2px solid #7a39e0;
  }
`;

export const ButtonOutline = styled.button`
  color: #7a39e0;
  font-size: 16px;
  height: 50px;
  font-family: 'Montserrat';
  min-width: 150px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: white;
  border: 2px solid #7a39e0;
  &:hover {
    background-color: #7a39e0;
    color: white;
  }
`;
