/**
 * 首页
 * 核心搜索入口、AI推荐目的地、热门搭子信息流
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDestinations, mockUsers } from '../data/mockData';
import PhoneFrame from '../components/PhoneFrame';
import RingProgress from '../components/RingProgress';

const Home = () => {
  const navigate = useNavigate();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [searchParams, setSearchParams] = useState({
    destination: '',
    travelDate: '',
    peopleCount: 1,
    budget: '',
    tags: [],
    gender: '',
    ageRange: '',
    schoolFilter: '',
  });

  const handleSearch = () => {
    // 保存搜索参数到 localStorage
    localStorage.setItem('searchParams', JSON.stringify(searchParams));
    navigate('/search');
  };

  const handleTagToggle = (tag) => {
    setSearchParams(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const interestTags = ['摄影', '美食', '户外', '文化', '探店'];

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <PhoneFrame>
        {/* 头部 */}
        <div className="bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] text-white p-3 pb-5">
          <h1 className="text-lg font-bold mb-0.5">大学生找旅行搭子，来踹！</h1>
          <p className="text-xs opacity-90 mb-3">AI智能匹配，找到同频旅伴</p>

          {/* 搜索框 */}
          <div
            className="bg-white rounded-full px-3 py-2.5 flex items-center shadow-lg cursor-pointer"
            onClick={() => navigate('/search')}
          >
            <span className="text-lg mr-2">🔍</span>
            <span className="flex-1 text-gray-400 text-xs">
              {searchParams.destination || '搜索目的地、搭子...'}
            </span>
          </div>
        </div>

        {/* AI推荐目的地 */}
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg text-[#333]">🌟 AI推荐目的地</h2>
            <span className="text-sm text-[#4A90E2]">查看全部</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {mockDestinations.map((dest) => (
              <div
                key={dest.id}
                className="flex-shrink-0 w-32 bg-white rounded-xl overflow-hidden shadow-card"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-20 object-cover"
                />
                <div className="p-2">
                  <h3 className="font-bold text-sm text-[#333]">{dest.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{dest.tags.join('·')}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-400 text-xs">⭐</span>
                    <span className="text-xs text-gray-600 ml-1">{dest.popularity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 热门搭子 */}
        <div className="px-4 py-3">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-lg text-[#333]">🔥 热门搭子</h2>
            <span
              className="text-sm text-[#4A90E2]"
              onClick={() => navigate('/search')}
            >
              更多
            </span>
          </div>
          <div className="space-y-3">
            {mockUsers.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl p-3 shadow-card flex items-center gap-2.5"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-[#333]">{user.name}</span>
                    <span className="text-[10px] text-gray-400">{user.gender}</span>
                    <span className="text-[10px] text-gray-400">{user.age}岁</span>
                    {user.mbti && (
                      <span className="bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] text-white px-1.5 py-0.5 rounded text-[9px] font-medium">
                        {user.mbti}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {user.school} · {user.destination} · {user.travelDate}
                  </p>
                  <div className="flex gap-1 mt-0.5">
                    {user.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6] px-1.5 py-0.5 rounded text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <RingProgress score={Math.floor(Math.random() * 20 + 80)} size={40} />
              </div>
            ))}
          </div>
        </div>


        {/* 底部占位，避免内容被导航遮挡 */}
        <div className="h-20"></div>
      </PhoneFrame>
    </div>
  );
};

export default Home;
