import React, { useState, useEffect } from "react";

// isRead 1

const Read = ({ bookshelfInfo, handleClickBook, handleScroll  }) => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-5">
        {Object.values(bookshelfInfo).map((book) => (
          <div key={book.bookId} className="text-center">
            <div className="m-3 cursor-pointer" onClick={() => handleClickBook(book.bookId)}>
              <img src={book.cover} alt={book.title} className="w-48 h-72" />
              <p className="m-1 font-bold">{book.title}</p>
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full">읽을 책으로</button>
          </div>
        ))}
      </div>
      <div ref={handleScroll}></div>
    </div>
  )
}

export default Read;