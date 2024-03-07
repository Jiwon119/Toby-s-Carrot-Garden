import React from "react";
import styled from "styled-components";

const HospitalContainer = styled.div`
  display: grid;
  place-items: center;
  grid-template-rows: 4fr 3fr 1fr 1fr 2fr;
`;

const Hospital = () => {
  return (
    <HospitalContainer>
      <div></div>
      <div>
        <img
          src="src\assets\images\components\Storyframe.png"
          alt="storyframe"
          style={{
            width: "100vw",
          }}
        />
      </div>
      <div></div>
      <div></div>
      <div></div>
    </HospitalContainer>
  );
};

export default Hospital;
