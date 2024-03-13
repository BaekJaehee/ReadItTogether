from fastapi import FastAPI

app = FastAPI()

BOOKS = [
    {
        'title': 'Simple Book',
        'author': 'Hyoseon Kwak',
        'category': 'fantasy'
    },
    {
        'title': 'Simple Book2',
        'author': 'Hyoseon Kwak',
        'category': 'horror'
    },
    {
        'title': 'Simple Book3',
        'author': 'Hyoseon Kwak',
        'category': 'mystery'
    }
]


@app.get("/books")
async def read_all_books():
    return BOOKS


@app.get("/books/mybook")
async def read_all_books():
    return {"book_title": "mybook!!"}


@app.get("/books/{dynamic_param}")
async def read_all_books(dynamic_param: str):
    return {"dynamic_param": dynamic_param}
