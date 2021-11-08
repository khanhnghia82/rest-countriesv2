import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Image(props) {
  const country = useSelector(state => state.Countries.country);      

  return (
    <ImagePane>
      <img
        src={country ? country.flag : 'https://via.placeholder.com/300x200?text=Image+Error'}
        alt={country ? country.name : ''}
      />
  </ImagePane>
  );
}
export default React.memo(Image);

const ImagePane = styled.div`
  max-width: 400px;
  width: 100%;
  height: 100%;
  margin-bottom: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.2);
  img {
    width: 100%;
    height: 100%;
  }
`;
