from typing import Optional
from surprise import Dataset, Reader
import pandas as pd
import aiomysql

# 데이터베이스 연결 정보 설정
DATABASE_CONFIG = {
    'host': 'j10d206.p.ssafy.io',
    'port': 3306,
    'user': 'root',
    'password': '1234',
    'db': 'ssafy',
}

class Database:
    def __init__(self):
        self.pool: Optional[aiomysql.Pool] = None

    async def connect(self):
        self.pool = await aiomysql.create_pool(**DATABASE_CONFIG)

    async def disconnect(self):
        self.pool.close()
        await self.pool.wait_closed()

    @property
    def is_connected(self):
        return self.pool is not None and not self.pool._closed

    async def fetch_comments(self):
        async with self.pool.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute("SELECT member_id, book_id, rating, created_at FROM comments")
                comments = await cur.fetchall()
                return comments

    async def load_ratings_from_db(self):
        ratings = await self.fetch_ratings()  # 평점 데이터 조회

        # pandas DataFrame으로 변환
        ratings_df = pd.DataFrame(ratings)

        # surprise Reader 객체 정의
        reader = Reader(rating_scale=(1, 5))  # 평점의 범위가 1에서 5라고 가정

        # surprise 데이터셋으로 로드
        ratingsDataset = Dataset.load_from_df(ratings_df[['member_id', 'book_id', 'rating']], reader)

        return ratingsDataset


database = Database()
