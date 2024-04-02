import React, { useEffect, useState } from "react";
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

const AudioBtnNS = styled.button`
  z-index: 1000;
  width: 3vw;
  height: 3vw;
  background-image: url("/Image/button/no-sound.png");
  background-size: 100% 100%;
  background-color: transparent;
  border: none;
  &:focus,
  &:hover {
    outline: none;
    background-color: transparent;
  }
`;

const AudioBtnS = styled.button`
  z-index: 1000;
  width: 3vw;
  height: 3vw;
  background-image: url("/Image/button/sound.png");
  background-size: 100% 100%;
  background-color: transparent;
  border: none;
  &:focus,
  &:hover {
    outline: none;
    background-color: transparent;
  }
`;

const AudioArea = styled.div`
  position: absolute;
  top: calc(1%);
  left: calc(1%);
  margin: calc(2%);
`;

interface Scene {
  sceneId: number;
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
}

const StoryClear = ({ index, placeName }) => {
  const sceneList = useSelector<RootState, Scene[]>((state: RootState) => {
    if (placeName === "hospital") {
      return state.hospital.sceneList;
    } else if (placeName === "school") {
      return state.school.sceneList;
    } else if (placeName === "mart") {
      return state.mart.sceneList;
    } else if (placeName === "police") {
      return state.police.sceneList;
    } else {
      return [];
    }
  });
  const [placeId, setPlaceId] = useState<number>(0);

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      console.log("audioRef is null");
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    if (placeName === "hospital") {
      setPlaceId(1);
    } else if (placeName === "school") {
      setPlaceId(2);
    } else if (placeName === "mart") {
      setPlaceId(3);
    } else if (placeName === "police") {
      setPlaceId(4);
    }
  }, [placeName]);

  return (
    <ClearContainer>
      <AudioArea>
        <AudioPlayer
          ref={audioRef}
          controls
          autoPlay
          preload="metadata"
          hidden
          onEnded={handleAudioEnded}
        >
          <source src={sceneList[index].voice} type="audio/mpeg" />
        </AudioPlayer>
        {isPlaying ? (
          <AudioBtnS onClick={handleTogglePlay}></AudioBtnS>
        ) : (
          <AudioBtnNS onClick={handleTogglePlay}></AudioBtnNS>
        )}
      </AudioArea>
      <StoryClearContent>{sceneList[index].content}</StoryClearContent>
      <ClearWebcamArea>
        <ClearWebcam placeId={placeId} />
      </ClearWebcamArea>
    </ClearContainer>
  );
};

export default StoryClear;