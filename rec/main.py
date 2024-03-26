from fastapi import FastAPI
from db.Database import database

from BookUserData import BookUserData
from surprise import SVD
from Evaluator import Evaluator

import random
import numpy as np

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def LoadBookData():
    ml = BookUserData()
    print("Loading book ratings...")
    data = ml.loadMovieLensLatestSmall()
    print("\nComputing book popularity ranks so we can measure novelty later...")
    rankings = ml.getPopularityRanks()
    return (ml, data, rankings)



(ml, evaluationData, rankings) = LoadBookData()
evaluator = Evaluator(evaluationData, rankings)
SVDAlgorithm = SVD()

@app.on_event("startup")
async def startup():
    evaluator.AddAlgorithm(SVDAlgorithm, "SVD")
    print("API 준비 완료")
    if not database.is_connected:
        await database.connect()

@app.on_event("shutdown")
async def shutdown():
    if database.is_connected:
        await database.disconnect()
@app.get("/recommendations")
async def get_recommendations():
    recommendations = evaluator.SampleTopNRecs(ml)
    return {"recommendations": recommendations}
