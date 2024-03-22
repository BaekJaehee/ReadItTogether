import React from "react";

import AddShelf from "../../components/button/AddShelf";
import CreateCard from "../../components/button/CreateCard";
import CreateComments from "../../components/comments/CreateComments";
import Comments from "../../components/comments/Comments";

import img1 from "../../assets/book/img1.PNG";

const DetailBook = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center px-44 py-20">
        <img className="w-[400px] h-[580px] rounded-lg" src={img1} alt="" />
        <div className="flex-col text-gray-600 font-bold pl-10 ">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl w-full font-bold mb-4">책 제목</h1>
              <p>작가명 · 장르/장르</p>
              <p>출판사 · 202XX 202XX12일</p>
              <p>페이지 수</p>
            </div>
            <div className="flex-col">
              <div className="mb-2">
                {/* 책장 추가 모달 */}
                <AddShelf />
              </div>
              <div className="mb-2">
                {/* 카드 작성 모달 */}
                <CreateCard />
              </div>
            </div>
          </div>

          <p className="text-2xl mt-10 mb-2">책 소개</p>
          <p className="max-w-2xl text-gray-700 text-sm w-[500px] h-[180px] overflow-y-auto">
            {/* 책 소개 내용 */}
            <b>미스터리 제왕의 2024년 최신작 <br/>괴짜 페르소나 『블랙 쇼맨』의 귀환<br/>100억을 두고 벌이는 치열한 심리 게임</b><br/><br/> 히가시노 게이고가 선보이는 새로운 시리즈. 일본에서 『블랙 쇼맨과 각성하는 여자들』로 발표된 소설집을 작가와의 긴밀한 편집 회의 끝에 두 권의 단편집으로 국내에서 출간한다. 앞선 『블랙 쇼맨과 환상의 여자』에서 불특정 다수가 오가며 사연을 만드는 비밀의 바 트랩핸드의 실체가 드러났다면, 신작 『블랙 쇼맨과 운명의 바퀴』에서는 한발 더 나아가 진정한 행복을 찾는 이들의 일생일대의 선택을 돕는 사연이 시원스레 밝혀진다. <br/><br/> 데뷔 후 40년간 성실하게 작품을 출간해 온 히가시노 게이고는 명실공히 인기 작가로 다양한 장르를 넘나들며 수많은 독자를 사로잡았다. 능수능란한 필력으로 에도가와 란포상, 일본추리작가협회상, 나오키상, 본격미스터리대상 등 이름만 들어도 알 만한 일본 대표 문학상을 모조리 석권하고, 최다 수의 영상물 원작자로서 문학성과 대중성을 두루 갖춘 그의 작품세계에 새롭게 등장한 블랙 쇼맨은 어떤 의미일까. 팬데믹을 기점으로 등장한 블랙 쇼맨은 정통 미스터리 문법에서 벗어나 코지 미스터리, 휴먼 미스터리의 경계를 오가며 작가 스스로도 “지금 내가 가장 집중하고 있는 캐릭터”라 할 만큼 다채로운 방식으로 사건을 해결해 나간다. 투박한 설정에 무심한 면모가 더해진 다케시가 인생에서 맞닥뜨릴 법한 크고 작은 고민에 빠진 사람들을 한 치의 망설임도 없이 명쾌하게 구해내는 과정이 색다른 쾌감으로 다가온다. 
          </p>
          <div className="flex mt-6">
            <div className="text-2xl mr-2">평점</div>
            <div className="flex items-center mr-4">
              {/* 평점 */}
            </div>
          </div>
          <CreateComments />
        </div>
      </div>
      <Comments />
    </div>
  );
};


export default DetailBook;
