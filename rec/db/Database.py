# database.py
from databases import Database
from typing import List

# 데이터베이스 연결 정보 설정
DATABASE_URL = "mysql://root:!A123456bc@34.64.150.109/ssafy"

# Database 인스턴스 생성
database = Database(DATABASE_URL)

async def fetch_members() -> List[dict]:
    query = "SELECT * FROM member"
    return await database.fetch_all(query)

async def fetch_comments() -> List[dict]:
    query = "SELECT member_id, book_id, rating FROM comment"
    return await database.fetch_all(query)
