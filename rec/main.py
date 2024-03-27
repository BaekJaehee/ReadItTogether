from sqlalchemy import create_engine
from sqlalchemy.exc import NoResultFound
from sqlalchemy.orm import sessionmaker
from fastapi import FastAPI, HTTPException, UploadFile, File
import pandas as pd
from io import StringIO
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from models.Model import Comment, Book

# 동기 엔진 및 세션 생성
SYNC_DB_URL = "mysql+pymysql://root:1234@j10d206.p.ssafy.io/ssafy"
engine = create_engine(SYNC_DB_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

app = FastAPI()

@app.post("/upload-reviews/")
def upload_reviews(file: UploadFile = File(...)):  # 동기 함수
    db = SessionLocal()
    try:
        if file.content_type != 'text/csv':
            raise HTTPException(status_code=400, detail="File must be a CSV.")

        content = file.file.read()
        df = pd.read_csv(StringIO(content.decode('utf-8')))

        for index, row in df.iterrows():
            isbn = row['isbn']
            member_id = row['member_id']
            rating = row['rating']
            comment_text = row['comment']
            try:
                book_tuple = db.query(Book.book_id).filter(Book.isbn == isbn).first()
                if not book_tuple:
                    raise ValueError(f"ISBN {isbn}에 해당하는 책을 찾을 수 없습니다.")
                book_id = book_tuple[0]
                new_comment = Comment(member_id=member_id, book_id=book_id, rating=rating, comment=comment_text)
                db.add(new_comment)

            except Exception as inner_e:
                logger.exception(f"책 조회 중 에러 발생: {inner_e}")
                # 필요한 경우, 여기서 더 구체적인 예외 처리를 수행할 수 있습니다.

        # 커밋은 모든 작업이 성공적으로 완료된 후에 수행
        db.commit()
    except HTTPException as http_e:
        # HTTPException은 FastAPI가 클라이언트에게 적절한 HTTP 응답을 생성하도록 합니다.
        raise http_e
    except Exception as e:
        db.rollback()
        logger.exception("리뷰 업로드 중 예외 발생")
        raise HTTPException(status_code=500, detail="An error occurred while uploading reviews.")
    finally:
        db.close()

    return {"message": "Reviews successfully uploaded and processed."}

