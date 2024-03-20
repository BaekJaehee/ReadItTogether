import React from 'react';

const DetailBook = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-4">책하은 남시를 바꾸다</h1>
        <p className="text-gray-600">서울동, 에세이/인문학</p>
        <p className="text-gray-600">김영사, 2024년 01월 12일</p>
        <p className="text-gray-600">334p</p>
      </div>
      <div className="max-w-2xl">
        <p className="text-gray-700 mb-4">
          엄새주의 사소가 소렴화주의의 인가가 석물 훔 모르다. 생물 법한 그의 와나라한 흘시가 "글평출 내리트고 섭이가로 댈목 주이서실 것이다.
          그러나 출리이 시리던 서리던 "글평출 낫낟도 뗘캇흥까". 시간도 방방도 된다는 이유로 더 나은 삯에 대한 삯직을 이예로 떠싸도 뎌까. 
          젊편 철무엘 두뻊으로 날아 곳과 사람의 시간의 재뿔을 화휠과 세뱍을 아늘지롸 뿌어와 교수영 괴로운 곧수가 근년 마에 흘자의 에세이
          연력책으삾 과린다는 세평을 입솟은, 휠은 체력수므로 칚리에 삶채이의 외대에 삶령이하다. 이에에 법치를 여
          횁과가 오늘까" 우이하다.
          우리는 철 사람의 대출물 이량마지고 무드 번의이 흐념지이 되는 삯각 남새생 석류헤주는 삯간의 횔좋 제렛하게 휠 것이다.
        </p>
      </div>
      <div className="flex items-center mb-8">
        <div className="flex items-center mr-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>
        <p className="text-gray-600">
          제가 젆뭄 인엊드서 볻엿 윾여라 난번 서번돌이 확섣엿 뽕려, 대서를 볼냰마나 감서가 휘서가 나되 하일 삯서주는 그린 머햿 햿출 ? 그렌 줄 읺엿
          번사뺴햇던 밭읺 역햫 귬려랴 지뭄 뜰 볗님나마 릿별늬 ?뼘겨 번는 갆긒 귬려 그럈 구석 사밭 냇댜루며 졷니다 머햿 갇싹에 삯서주는 낪뒈운
          고 밒애 앵서인 험릿를음 남서 이옇께 곽을 휠 같뜽없고 ? 서서선 서굳 내 머린는 볻엿 번서가로 휠 인어새저 뭥앨의 새롆 뭄 궋서힜 땉싷 - 봓
          번서번에 잇늫는 릿땅이- 싸린 이늅니다. 끗꾸끗
        </p>
      </div>
    </div>
  );
};

export default DetailBook;