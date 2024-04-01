import React from "react";
import UpdateBook from "../../api/book/bookshelf/UpdateBook";

const Read = ({ bookshelfInfo, handleClickBook, updateBookshelfInfo }) => {
  const switchBook = async (bookId) => {
    try {
      await UpdateBook(bookId);
      updateBookshelfInfo(); // 상태 업데이트 후 다시 데이터 요청
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        {bookshelfInfo.map((book) => (
          <div key={book.bookId} className="text-center">
            <div className="m-3 cursor-pointer" onClick={() => handleClickBook(book.bookId)}>
              <img src={book.cover} alt={book.title} className="w-48 h-72" />
              <p className="m-1 font-bold">{book.title}</p>
            </div>
              <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full" onClick={() => { switchBook(book.bookId); }}>
                읽을 책으로
              </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
