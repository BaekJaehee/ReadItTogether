from fastapi import FastAPI
from db.database import fetch_comments, database
from surprise import Dataset, Reader
from surprise.model_selection import train_test_split
from surprise import SVD, accuracy
from typing import List
from collections import defaultdict

import asyncio
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인에서의 접근 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 메소드 허용 (GET, POST 등)
    allow_headers=["*"],  # 모든 헤더 허용
)

@app.on_event("startup")
async def startup():
    if not database.is_connected:
        await database.connect()

@app.on_event("shutdown")
async def shutdown():
    if database.is_connected:
        await database.disconnect()


async def load_data_for_svd() -> Dataset:
    comments = await fetch_comments()
    # 데이터 형식 준비: user, item, rating
    data = [(comment['member_id'], comment['book_id'], float(comment['rating'])) for comment in comments]

    reader = Reader(rating_scale=(1, 10))  # 데이터셋에 맞게 평점 스케일 조정
    dataset = Dataset.load_from_df(pd.DataFrame(data, columns=['user', 'item', 'rating']), reader)

    return dataset


async def train_and_predict():
    dataset = await load_data_for_svd()

    trainset = dataset.build_full_trainset()
    algo = SVD()
    algo.fit(trainset)

    # 예제 예측: user_id 및 item_id에 대한 평점 예측
    user_id = '123'  # 예제 user_id
    item_id = '456'  # 예제 item_id
    rating_prediction = algo.predict(user_id, item_id)

    print(f"예측 평점: {rating_prediction.est}")


async def get_recommendations_for_every_user(comments, num_recommendations=5):
    # 데이터 준비
    data = [(comment['member_id'], comment['book_id'], float(comment['rating'])) for comment in comments]
    reader = Reader(rating_scale=(1, 10))
    dataset = Dataset.load_from_df(pd.DataFrame(data, columns=['user', 'item', 'rating']), reader)

    # SVD 모델 훈련
    trainset = dataset.build_full_trainset()
    algo = SVD()
    algo.fit(trainset)

    # 모든 사용자에 대한 추천 생성
    recommendations = defaultdict(list)
    for user_id in trainset.all_users():
        user = trainset.to_raw_uid(user_id)
        # 사용자가 평가하지 않은 모든 도서에 대한 예측 생성
        user_ratings = [algo.predict(user, trainset.to_raw_iid(item_id)).est for item_id in trainset.all_items()]
        # 가장 높은 평점을 받은 도서 선택
        top_ratings_indices = sorted(range(len(user_ratings)), key=lambda i: user_ratings[i], reverse=True)[
                              :num_recommendations]
        recommended_book_ids = [trainset.to_raw_iid(item_id) for item_id in top_ratings_indices]
        recommendations[user] = recommended_book_ids

    return recommendations


@app.get("/predict")
async def predict_rating(user_id: str, item_id: str):
    dataset = await load_data_for_svd()
    trainset = dataset.build_full_trainset()
    algo = SVD()
    algo.fit(trainset)

    rating_prediction = algo.predict(user_id, item_id)
    return {"estimated_rating": rating_prediction.est}


@app.get("/comments")
async def get_comments():
    comments = await fetch_comments()
    return comments


@app.get("/recommendations")
async def recommendations():
    comments = await fetch_comments()
    recommendations = await get_recommendations_for_every_user(comments, num_recommendations=5)
    return recommendations
