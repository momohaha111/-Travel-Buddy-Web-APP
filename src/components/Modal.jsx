/**
 * Modal弹窗组件
 * 通用弹窗
 */
import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-[310px]',
    md: 'max-w-[330px]',
    lg: 'max-w-[340px]',
    xl: 'max-w-[340px]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className={`bg-white rounded-2xl w-full ${sizeClasses[size]} max-h-[80vh] overflow-y-auto animate-fade-in`}>
        {/* 头部 */}
        {title && (
          <div className="flex items-center justify-between p-2.5 border-b border-gray-100">
            <h3 className="text-xs font-bold text-[#333]">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* 内容 */}
        <div className="p-2.5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
