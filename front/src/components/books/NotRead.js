import deleteButton from "../../assets/profile/delete.png";

const NotRead = ({ books, handleClickBook, handleUpdateBookshelf, handleDeleteBookshelf }) => {
  return (
    <div className="grid grid-cols-5 gap-5">
      {books.map((book) => (
        <div key={book.bookId} className="text-center relative group">
          <div className="absolute right-2 top-2 p-2 cursor-pointer opacity-0 group-hover:opacity-100" 
               onClick={() => handleDeleteBookshelf(book.bookshelfId)}>
            <img className="w-4 h-4" src={deleteButton} alt="삭제버튼" />
          </div>
          <div className="m-3 cursor-pointer" onClick={() => handleClickBook(book.bookId)}>
            <img src={book.cover} alt={book.title} className="flex w-48 h-72 items-center justify-center" />
            <p className="m-1 font-bold">{book.title}</p>
          </div>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full mt-2"
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
