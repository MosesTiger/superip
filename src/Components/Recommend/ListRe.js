import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ListItem = styled.div`
  padding: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
`;

function ListRe() {
  const items = ["목록1", "목록2", "목록3", "목록4"];

  return (
    <ListContainer>
      {items.map((item, index) => (
        <ListItem key={index}>{item}</ListItem>
      ))}
    </ListContainer>
  );
}

export default ListRe;
