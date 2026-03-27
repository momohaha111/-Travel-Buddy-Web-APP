/**
 * 雷达图组件
 * 用于展示各维度匹配得分
 */
import React from 'react';

const RadarChart = ({ data, labels }) => {
  const size = 160;
  const center = size / 2;
  const radius = 45;
  const maxScore = 40;

  const getPolygonPoints = (values) => {
    const points = [];
    const angleStep = (Math.PI * 2) / values.length;

    values.forEach((value, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const r = (value / maxScore) * radius;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      points.push(`${x},${y}`);
    });

    return points.join(' ');
  };

  const getBackgroundPoints = () => {
    const points = [];
    const angleStep = (Math.PI * 2) / labels.length;

    labels.forEach((_, index) => {
      const angle = angleStep * index - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      points.push(`${x},${y}`);
    });

    return points.join(' ');
  };

  const getLabelPosition = (index) => {
    const angleStep = (Math.PI * 2) / labels.length;
    const angle = angleStep * index - Math.PI / 2;
    const r = radius + 12;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const values = data.map(d => d.value);
  const polygonPoints = getPolygonPoints(values);
  const backgroundPoints = getBackgroundPoints();

  return (
    <div className="radar-chart flex flex-col items-center">
      <svg width={size} height={size}>
        <polygon
          points={backgroundPoints}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="1"
        />
        <polygon
          points={polygonPoints}
          fill="rgba(139, 92, 246, 0.2)"
          stroke="#8B5CF6"
          strokeWidth="1.5"
        />
        {labels.map((label, index) => {
          const pos = getLabelPosition(index);
          const textAnchor = pos.x > center ? 'start' : pos.x < center ? 'end' : 'middle';
          return (
            <text
              key={label}
              x={pos.x}
              y={pos.y}
              fontSize="8"
              fill="#666"
              textAnchor={textAnchor}
              dominantBaseline="middle"
            >
              {label}
            </text>
          );
        })}
        {data.map((item, index) => {
          const angleStep = (Math.PI * 2) / labels.length;
          const angle = angleStep * index - Math.PI / 2;
          const r = (item.value / maxScore) * radius;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return (
            <text
              key={index}
              x={x}
              y={y}
              fontSize="7"
              fill="#8B5CF6"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {item.value}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default RadarChart;
