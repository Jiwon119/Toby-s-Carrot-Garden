import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuizWebCam from "../QuizWebCam";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const StoryQuizDetectionsContainer = styled.div`
  display: grid;
  grid-template-areas:
    "title title"
    "imaage camera";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 5fr;
  height: 100%;
  border: 1px solid black;
`;

const StoryQuizDetectionsTitleArea = styled.div`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

const StoryQuizDetectionsImageArea = styled.div`
  grid-area: imaage;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  object-fit: contain;
  overflow: hidden;
`;

const StoryQuizDetectionCanmeraArea = styled.div`
  grid-area: camera;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  object-fit: contain;
  overflow: hidden;
`;

const ImageArea = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex: 0 0 1;
`;

const ConteentArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  flex: 0 0 12.5%;
`;

const QuizImage = styled.img`
  height: 100%;
  width: auto;
  position: relative;
  display: block;
  border: 1px solid black;
  margin: 0 auto;
`;

const AudioPlayer = styled.audio`
  position: absolute;
`;

const AudioBtn = styled.button<{ isPlaying: boolean }>`
  z-index: 1000;
  width: 3vw;
  height: 3vw;
  background-image: url(${props => props.isPlaying ? "/Image/button/no-sound.png" : "/Image/button/sound.png"});
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
  margin: calc(2%);
`;


interface Scene {
  sceneId: number;
  quizType: string;
  sceneImageUrl: string;
  content: string;
  voice: string;
}

const StoryQuizDetections = ({ imageUrl, quizId, content, index, place }) => {
  // const handleTakePicture = () => {
  //   console.log("Take a picture");
  // };
  const [voiceUrl, setVoiceUrl] = React.useState<string>("");

  const HospitalSceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.hospital.sceneList
  );
  const SchoolSceneList = useSelector<RootState, Scene[]>(
    (state: RootState) => state.school.sceneList
  );
  useEffect(() => {
    if (place == "hospital") {
      const voice = HospitalSceneList[index].voice;
      setVoiceUrl(voice);
    } else if(place == "school") {
      const voice = SchoolSceneList[index].voice;
      setVoiceUrl(voice);
    }
  }, [index, place, HospitalSceneList, SchoolSceneList]);

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
  
  return (
    <StoryQuizDetectionsContainer>
      <AudioArea>
        <AudioPlayer ref={audioRef} controls autoPlay preload="metadata" hidden
                     onEnded={handleAudioEnded}>
          <source src={voiceUrl} type="audio/mpeg" />
        </AudioPlayer>
        <AudioBtn isPlaying={isPlaying} onClick={handleTogglePlay}></AudioBtn>
      </AudioArea>
      <StoryQuizDetectionsTitleArea>
        <h1>StoryQuizDetections</h1>
      </StoryQuizDetectionsTitleArea>
      <StoryQuizDetectionsImageArea>
        <ImageArea>
          <QuizImage src={imageUrl} alt="image" />
        </ImageArea>
        <ConteentArea>{content}</ConteentArea>
      </StoryQuizDetectionsImageArea>
      <StoryQuizDetectionCanmeraArea>
        <QuizWebCam quizId={quizId} />
      </StoryQuizDetectionCanmeraArea>
    </StoryQuizDetectionsContainer>
  );
};

export default StoryQuizDetections;
