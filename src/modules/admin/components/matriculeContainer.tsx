import styled from '@emotion/styled';

const MatContainer = styled.div`
  margin: 10px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  > p {
    margin: 0px;
    font-weight: bold;
  }
}
`;

export const MatriculeContainer = ({ matricule }: { matricule: string }) => {
  return (
    <MatContainer>
      <p>{matricule} </p>
    </MatContainer>
  );
};
