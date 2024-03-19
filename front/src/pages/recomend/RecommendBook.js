import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 이미지 파일 import
import img1 from "../../assets/book/img1.PNG";
import img2 from "../../assets/book/img2.PNG";
import img3 from "../../assets/book/img3.PNG";
import img4 from "../../assets/book/img4.PNG";
import img5 from "../../assets/book/img5.PNG";
import img6 from "../../assets/book/img6.PNG";
import img7 from "../../assets/book/img7.PNG";
import img8 from "../../assets/book/img8.PNG";
import img9 from "../../assets/book/img9.PNG";
import img10 from "../../assets/book/img10.PNG";
import left from "../../assets/book/left.png";
import right from "../../assets/book/right.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
const titles = [
  "제목1",
  "제목2",
  "제목3",
  "제목4",
  "제목5",
  "제목6",
  "제목7",
  "제목8",
  "제목9",
  "제목10",
]; // 샘플 제목

const RecommendBook = () => {
  const [index, setIndex] = useState(0);
  const constraintsRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    const handleResize = () => {
      if (constraintsRef.current) {
        const containerWidth = constraintsRef.current.offsetWidth;
        const imageWidth = containerWidth / 5; // 한 이미지의 너비
        constraintsRef.current.scrollLeft = imageWidth * index;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [index, windowWidth]);

  const moveRight = () => {
    setIndex((prevIndex) => (prevIndex + 5) % images.length);
  };

  const moveLeft = () => {
    setIndex((prevIndex) => (prevIndex - 5 + images.length) % images.length);
  };

  const getImageSize = () => {
    if (windowWidth >= 1100) {
      return { width: "w-240", height: "h-350" };
    } else if (windowWidth >= 768) {
      return { width: "w-48", height: "h-64" };
    } else {
      return { width: "w-40", height: "h-56" };
    }
  };

  const { width, height } = getImageSize();

  return (
    <div>
      <div className="flex flex-col p-20 relative">
        <div className="flex flex-col items-start space-y-2">
          <p className="mb-4 pl-4 text-2xl font-black">신간 베스트셀러 순위</p>
          {index > 0 && (
            <button onClick={moveLeft} className="slides border-2 rounded-full">
              <img className="w-10 rounded-full" src={left} alt="왼쪽" />
            </button>
          )}
          <div className="overflow-hidden" ref={constraintsRef}>
            <AnimatePresence>
              <motion.div
                className="flex space-x-4"
                key={index}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-start ${
                      i < index || i >= index + 5 ? "hidden" : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt={`book-${i}`}
                      className={`object-cover ${width} ${height}`}
                    />
                    <div className="text-sm font-black mt-2 text-left">
                      {titles[i]}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          {index < images.length - 5 && (
            <button
              onClick={moveRight}
              className="slides border-2 rounded-full"
            >
              <img className="w-10 rounded-full" src={right} alt="오른쪽" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendBook;
