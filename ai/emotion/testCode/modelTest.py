from kafka import KafkaConsumer
import base64
import json
import numpy as np
import cv2

# 카프카 서버 설정
bootstrap_servers = ["host.docker.internal:9092"]

# 카프카 토픽
str_topic_name = 'Topic1'

# 카프카 소비자 group1 생성
str_group_name = 'group1'
consumer = KafkaConsumer(str_topic_name, bootstrap_servers=bootstrap_servers,
                         auto_offset_reset='earliest',  # 가장 처음부터 소비
                         enable_auto_commit=True,
                         group_id=str_group_name,
                         value_deserializer=lambda x: json.loads(x.decode('utf-8')),
                         consumer_timeout_ms=60000  # 타임아웃지정(단위:밀리초)
                         )

face_classifier = cv2.CascadeClassifier('./haarcascade_frontalface_default.xml')

for message in consumer:
    print(message)
    # Kafka 메시지에서 이미지 데이터 추출
    image_data_base64 = message.value['image']
    image_data = base64.b64decode(image_data_base64)

    # 이미지를 numpy 배열로 변환
    nparr = np.frombuffer(image_data, np.uint8)

    # OpenCV로 이미지 로드
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # 이미지를 그레이스케일로 변환
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 얼굴 검출
    faces = face_classifier.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)
        roi_gray = gray[y:y + h, x:x + w]
        roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)

        # 감정 분석
        # 이 부분은 모델을 사용하여 감정을 분석하는 코드를 추가해야 합니다.

    # 결과 이미지 저장
    cv2.imwrite('result_image.jpg', image)

print("Image analysis complete. Result saved.")
