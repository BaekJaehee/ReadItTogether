import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DoughnutChart = ({ genreCountData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (genreCountData.length === 0) return; // 데이터가 없을 경우 렌더링하지 않음

    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');

    // 차트 생성
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: genreCountData.map(data => data.genre),
        datasets: [{
          data: genreCountData.map(data => data.count),
          backgroundColor: getRandomColors(genreCountData.length)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }, [genreCountData]);

  // 임의의 색상 생성
  const getRandomColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  };

  return <canvas ref={chartRef} />;
};

export default DoughnutChart;