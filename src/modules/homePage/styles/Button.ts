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
  background-color: #263238;
  border-color: transparent;
  &:hover {
    background-color: white;
    color: #263238;
    border: 2px solid #263238;
  }
`;

export const ButtonOutline = styled.button`
  color: #263238;
  font-size: 16px;
  height: 50px;
  font-family: 'Montserrat';
  min-width: 150px;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  background-color: white;
  border: 2px solid #263238;
  &:hover {
    background-color: #263238;
    color: white;
  }
`;
