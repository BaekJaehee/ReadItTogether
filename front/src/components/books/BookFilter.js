import React, { useState } from "react";

const genres = ["판타지", "로맨스", "SF", "무협", "추리/미스터리", "공포/스릴러", "역사", "한국문학", "영미문학", "일본문학", "중국문학"];

const BookFilter = ({ onFilterChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleGenreChange = (event) => {
    // 이벤트에서 value와 checked 상태를 가져옵니다.
    const { value, checked } = event.target;

    // 체크된 경우, 선택된 장르에 추가합니다.
    // 체크 해제된 경우, 해당 장르를 선택된 장르에서 제거합니다.
    const newSelectedGenres = checked
      ? [...selectedGenres, value]
      : selectedGenres.filter((genre) => genre !== value);

    // 업데이트된 장르 목록으로 상태를 업데이트합니다.
    setSelectedGenres(newSelectedGenres);
    onFilterChange({ genres: newSelectedGenres });
  };

  return (
    <div className="p-4 bg-white w-1/3">
      {/* <div className="flex flex-wrap gap-2"> */}
      <div className="grid grid-cols-3 gap-2">
        {genres.map((genre) => (
          <div key={genre} className="flex items-center">
            <input
              id={genre}
              type="checkbox"
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={handleGenreChange}
              className="w-4 h-4"
            />
            <label
              htmlFor={genre}
              className="ml-2 text-sm font-medium text-gray-900"
            >
              {genre}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookFilter;
