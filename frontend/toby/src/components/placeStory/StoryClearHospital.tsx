import React, { useEffect } from "react";
import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import ClearWebcam from "../ClearWebCam";

const ClearContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  object-fit: contain;
  overflow: hidden;
`;

const StoryClearContent = styled.div`
  font-size: 3rem;
  text-align: center;
`;

const ClearWebcamArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  object-fit: contain;
  overflow: hidden;
`;

const AudioPlayer = styled.audio`
  position: absolute;
`;

const AudioBtn = styled.button`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

type StoryClearProps = {
  index: number;
};

interface Scene {
  sceneId: number;
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
}

const StoryClear = ({ index }: StoryClearProps) => {
  console.log("index", index);
  const [quizId, setQuizId] = React.useState<number>(0);
  const placeId = 2;
  const sceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.hospital.sceneList
  );
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    } else {
      console.log("audioRef is null");
    }
  };

  useEffect(() => {
    setQuizId(sceneList[index].sceneId);
    console.log("sceneList", sceneList);
  }, [sceneList, index]);

  return (
    <ClearContainer>
      <AudioPlayer ref={audioRef} controls preload="metadata" hidden>
        <source src={sceneList[index].voice} type="audio/mpeg" />
      </AudioPlayer>
      <AudioBtn onClick={handlePlay}>재생</AudioBtn>
      <StoryClearContent>{sceneList[index].content}</StoryClearContent>
      <ClearWebcamArea>
        <ClearWebcam placeId={placeId} />
      </ClearWebcamArea>
    </ClearContainer>
  );
};

export default StoryClear;
