import React, { useRef } from "react";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";
import { submitQuiz2 } from "../../apis/drawingApi";

const StoryDrawingModalContainer = styled.div`
  display: flex;
  position: absolute;
  top: 50%; /* 부모 요소의 50% 위치에 배치 */
  left: 50%; /* 부모 요소의 50% 위치에 배치 */
  transform: translate(-50%, -50%); /* 요소의 가로와 세로 중앙 정렬 */
  width: 80%;
  height: 80%;
  border: 2px solid black;
  background-color: #aeaeae;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalArea = styled.div`
  display: flex;
  border: 2px solid black;
`;

const CloseBtn = styled.button`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-image: url("경로/이미지.png");
  background-size: cover; /* 이미지를 버튼에 맞게 크기 조정 */

  border: none; /* 기본 버튼 스타일 제거 */
`;
const StoryDrawingModal = ({ isOpen, onClose, quizId }) => {
  const signaturePadRef = useRef(null);

  const handleSaveDrawing = async () => {
    if (signaturePadRef.current && isOpen) {
      const canvas = signaturePadRef.current.getCanvas();
      if (canvas) {
        console.log("있다");
        const dataUrl = canvas.toDataURL("image/png");
        const blob = await (await fetch(dataUrl)).blob();

        const formData = new FormData();
        formData.append("analysisImage", blob, "drawing.png");
        formData.append("quizId", quizId); // quizId를 formData에 추가

        try {
          await submitQuiz2(formData); // 서버에 formData 전송
          console.log("이미지 전송 성공");
          onClose(); // 모달 닫기
        } catch (error) {
          console.error("이미지 전송 실패", error);
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <StoryDrawingModalContainer>
      <ModalArea>
        <SignatureCanvas
          ref={signaturePadRef}
          penColor="black"
          canvasProps={{
            width: 500, // 적절한 크기 설정
            height: 400, // 적절한 크기 설정
            className: "signature-canvas",
          }}
        />
      </ModalArea>
      <CloseBtn onClick={handleSaveDrawing}>다 그렸어요</CloseBtn>
    </StoryDrawingModalContainer>
  );
};

export default StoryDrawingModal;
