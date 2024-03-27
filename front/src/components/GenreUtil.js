const genreMapping = {
  1: '액션',
  2: '호러',
  3: '미스터리',
  4: '판타지',
  5: '역사',
  6: '로맨스',
  7: 'SF',
  8: '한국문학',
  9: '한국단편',
  10: '영미단편',
  11: '영미문학',
  12: '일본단편',
  13: '일본문학',
  14: '중국문학',
  15: '스페인문학',
  16: '북유럽문학',
  17: '라틴문학',
  18: '러시아문학',
  19: '동유럽문학',
  20: '독일문학',
  21: '프랑스문학'
};

export const getGenreNameByIndex = (index) => {
  return genreMapping[index + 1] || ''; // 인덱스가 1부터 시작하므로 +1 해줍니다.
};
