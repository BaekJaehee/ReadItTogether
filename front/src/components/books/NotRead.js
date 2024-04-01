const NotRead = ({ bookshelfInfo, handleClickBook, handleUpdateBookshelf }) => {
  return (
    <div className="grid grid-cols-5 gap-5">
      {bookshelfInfo.map((book) => (
        <div key={book.bookId} className="text-center">
          <div className="m-3 cursor-pointer" onClick={() => handleClickBook(book.bookId)}>
            <img src={book.cover} alt={book.title} className="w-48 h-72" />
            <p className="m-1 font-bold">{book.title}</p>
          </div>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
            onClick={() => handleUpdateBookshelf(book.bookId)}
          >
            읽은 책으로
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotRead;
