/**
 * Toast提示组件
 * 用于显示操作反馈
 */
import React from 'react';

const Toast = ({ message, visible, type = 'success' }) => {
  if (!visible) return null;

  const bgColor = type === 'success' ? 'bg-[#10B981]' : 'bg-[#FF6B6B]';

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] animate-fade-in">
      <div className={`${bgColor} text-white px-6 py-3 rounded-xl shadow-xl text-sm font-medium`}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
