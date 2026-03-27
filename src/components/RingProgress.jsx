/**
 * 环形进度条组件
 * 用于展示匹配度百分比
 */
import React from 'react';

const RingProgress = ({ score, size = 60, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;
  
  // 根据分数确定颜色
  const getColor = () => {
    if (score >= 85) return '#10B981'; // 绿色
    if (score >= 60) return '#FF6B6B'; // 橙红色
    return '#9CA3AF'; // 灰色
  };
  
  const color = getColor();
  
  return (
    <div className="ring-progress inline-flex items-center justify-center">
      <svg width={size} height={size}>
        <circle
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            strokeLinecap: 'round',
          }}
          className="progress-ring"
        />
      </svg>
      <span className="absolute text-sm font-bold" style={{ color }}>
        {score}%
      </span>
    </div>
  );
};

export default RingProgress;
