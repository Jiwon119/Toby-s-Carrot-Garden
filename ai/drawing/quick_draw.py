import numpy as np
from classes.dataset import CLASSES
import torch
from PIL import Image
import redis
import os
from pathlib import Path
from dotenv import load_dotenv
from io import BytesIO
import traceback

dotenv_path = Path(".env")
load_dotenv(dotenv_path=dotenv_path)

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")

def analyze_object(image_data, member_id, quiz_id, correct_answer):
    try:
        # Load model
        model = torch.load("trained_models/whole_model_quickdraw", map_location=lambda storage, loc: storage)
        model.eval()

        image = Image.open(BytesIO(image_data)).convert('L')

        # Preprocess the image
        image = image.resize((28, 28))
        image = np.array(image, dtype=np.float32)[None, None, :, :]
        image = torch.from_numpy(image)

        # Perform inference
        logits = model(image)

        top_values, top_indices = torch.topk(logits[0], k=5)

        result = 0

        for value, index in zip(top_values, top_indices):
            print(
                f"인덱스: {index}  값: {CLASSES[index]} 유사도: {value}",
                flush=True)
            if correct_answer == CLASSES[index]:
                result = 100

        try:
            r = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=0)
            r.set(f'quiz_answer_{member_id}_{quiz_id}', result)
            r.expire(f'quiz_answer_{member_id}_{quiz_id}', 60)
            r.close()
            print("redis 저장 완료", flush=True)

        except Exception as e:
            print("redis 에러 ", e, flush=True)

    except Exception as e:
        print("모델 에러 발생 ", e, flush=True)
        err_msg = traceback.format_exc()
        print(err_msg, flush=True)




