import React, { useState } from "react";

const genres = [
  "액션", "호러", "미스터리", "판타지", "로맨스", "SF", 
  "한국문학", "한국단편", "영미문학", "영미단편", "일본문학", "일본단편", 
  "중국문학", "스페인문학", "북유럽문학", "라틴문학", "러시아문학", "동유럽문학", 
  "독일문학", "프랑스문학"
];

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
