/**
 * 手机模拟器框架组件
 * 桌面端展示375px宽度的手机界面，移动端全屏展示
 * 固定尺寸：375px × 812px
 */
import React from 'react';
import BottomNav from './BottomNav';

const PhoneFrame = ({ children, showNav = true }) => {
  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8 overflow-hidden">
      <div className="relative w-[375px] h-[812px] bg-black rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-gray-900">
        {/* 手机刘海 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-50"></div>

        {/* 状态栏 */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] z-40 flex items-center justify-between px-8 pt-2">
          <span className="text-black text-xs font-medium">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
            </svg>
          </div>
        </div>

        {/* 屏幕内容区域 */}
        <div className={`w-full h-[812px] bg-[#F5F7FA] overflow-y-auto pt-12 scrollbar-hide ${showNav ? 'pb-16' : ''}`}>
          {children}
        </div>

        {/* 底部导航栏 */}
        {showNav && <BottomNav />}
      </div>
    </div>
  );
};

export default PhoneFrame;
