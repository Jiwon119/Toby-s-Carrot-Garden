import React from "react";
import styled from "styled-components";

import { useState } from "react";

const PhoneContainer = styled.div``;

const Screen = styled.div``;

const KeypadBtnArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

const Phone = () => {
  const [phoneNum, setPhoneNum] = useState<string>("");

  const handleNumClick = (num: string) => {
    setPhoneNum(phoneNum + num);
  };

  const handleCallClick = () => {
    console.log("Call", phoneNum);
    setPhoneNum("");
  };

  const handleClearClick = () => {
    setPhoneNum("");
  };

  return (
    <PhoneContainer>
      <Screen>
        <p>{phoneNum}</p>
      </Screen>
      <KeypadBtnArea>
        <button
          onClick={() => {
            handleNumClick("1");
          }}
        >
          1
        </button>
        <button
          onClick={() => {
            handleNumClick("2");
          }}
        >
          2
        </button>
        <button
          onClick={() => {
            handleNumClick("3");
          }}
        >
          3
        </button>
        <button
          onClick={() => {
            handleNumClick("4");
          }}
        >
          4
        </button>
        <button
          onClick={() => {
            handleNumClick("5");
          }}
        >
          5
        </button>
        <button
          onClick={() => {
            handleNumClick("6");
          }}
        >
          6
        </button>
        <button
          onClick={() => {
            handleNumClick("7");
          }}
        >
          7
        </button>
        <button
          onClick={() => {
            handleNumClick("8");
          }}
        >
          8
        </button>
        <button
          onClick={() => {
            handleNumClick("9");
          }}
        >
          9
        </button>
        <button
          onClick={() => {
            handleNumClick("#");
          }}
        >
          #
        </button>
        <button
          onClick={() => {
            handleNumClick("0");
          }}
        >
          0
        </button>
        <button
          onClick={() => {
            handleNumClick("*");
          }}
        >
          *
        </button>
        <button onClick={handleCallClick}>video</button>
        <button onClick={handleCallClick}>call</button>
        <button onClick={handleClearClick}>clear</button>
      </KeypadBtnArea>
    </PhoneContainer>
  );
};

export default Phone;
