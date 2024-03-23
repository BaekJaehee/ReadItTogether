import aiomysql
from typing import Optional

# 데이터베이스 연결 정보 설정
DATABASE_CONFIG = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': 'qwer1234!',
    'db': 'testdb',
}

class Database:
    def __init__(self):
        self.pool: Optional[aiomysql.Pool] = None

    async def connect(self):
        self.pool = await aiomysql.create_pool(**DATABASE_CONFIG)

    async def disconnect(self):
        self.pool.close()
        await self.pool.wait_closed()

    async def fetch_comments(self):
        async with self.pool.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute("SELECT * FROM comments")
                comments = await cur.fetchall()
                return comments

database = Database()
