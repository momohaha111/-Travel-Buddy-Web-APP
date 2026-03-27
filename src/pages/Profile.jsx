/**
 * 个人中心页面 - AI旅行洞察展示
 * 基础信息、AI旅行洞察、功能入口
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUserProfile } from '../data/mockData';
import PhoneFrame from '../components/PhoneFrame';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { tagConfig } from '../config/tagConfig';

const Profile = () => {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [showProcess, setShowProcess] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMBTI, setSelectedMBTI] = useState('');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // MBTI人格数据
  const mbtiTypes = {
    'ISTJ': { name: '物流师', trait: '旅行注重计划和执行，喜欢有秩序的行程，可靠负责' },
    'ISFJ': { name: '守卫者', trait: '旅行擅长照顾他人，注重细节，喜欢温馨舒适的体验' },
    'INFJ': { name: '提倡者', trait: '旅行追求意义和深度，喜欢有内涵的文化体验' },
    'INTJ': { name: '建筑师', trait: '旅行讲究效率和策略，喜欢深度探索和独立规划' },
    'ISTP': { name: '鉴赏家', trait: '旅行喜欢冒险和体验，随性灵活，善于解决突发问题' },
    'ISFP': { name: '探险家', trait: '旅行追求美学和自由，喜欢慢节奏的艺术之旅' },
    'INFP': { name: '调停者', trait: '旅行追求和谐与意义，喜欢治愈系的自然和人文之旅' },
    'INTP': { name: '逻辑学家', trait: '旅行充满好奇心，喜欢探索新奇事物和深度思考' },
    'ESTP': { name: '企业家', trait: '旅行行动力强，喜欢挑战和刺激，善于发现有趣体验' },
    'ESFP': { name: '表演者', trait: '旅行追求欢乐和社交，喜欢热闹的氛围和美食体验' },
    'ENFP': { name: '快乐小狗', trait: '旅行主打随心所欲，喜欢新鲜体验，擅长活跃气氛' },
    'ENTP': { name: '辩论家', trait: '旅行充满创意和变化，喜欢尝试新奇的旅行方式' },
    'ESTJ': { name: '总经理', trait: '旅行善于组织和领导，喜欢高效有序的团队旅行' },
    'ESFJ': { name: '执政官', trait: '旅行注重和谐与社交，喜欢热闹的团体活动和美食之旅' },
    'ENFJ': { name: '主人公', trait: '旅行充满热情和感染力，善于带动团队氛围' },
    'ENTJ': { name: '指挥官', trait: '旅行追求成就和效率，喜欢有挑战性的深度之旅' }
  };

  // 从localStorage加载已选标签和MBTI
  useEffect(() => {
    const savedTags = localStorage.getItem('userSelectedTags');
    if (savedTags) {
      setSelectedTags(JSON.parse(savedTags));
    } else {
      setSelectedTags(mockUserProfile.tags || []);
    }

    const savedMBTI = localStorage.getItem('userMBTI');
    if (savedMBTI) {
      setSelectedMBTI(savedMBTI);
    }
  }, []);
  
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 2000);
  };

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 8) {
      setSelectedTags([...selectedTags, tag]);
    } else {
      showToast('最多只能选择8个标签', 'warning');
    }
  };

  const handleSaveProfile = () => {
    // 保存到localStorage
    localStorage.setItem('userSelectedTags', JSON.stringify(selectedTags));
    localStorage.setItem('userMBTI', selectedMBTI);
    showToast('资料保存成功！');
    setShowEditProfile(false);
  };
  
  const handleMenuClick = (item) => {
    showToast(`功能开发中：${item}`);
  };
  
  return (
    <PhoneFrame>
        {/* 用户信息头部 */}
        <div className="bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] text-white p-6 pb-20">
          <div className="flex items-center gap-4">
            <img
              src={mockUserProfile.avatar}
              alt={mockUserProfile.name}
              className="w-20 h-20 rounded-full border-4 border-white border-opacity-30"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">{mockUserProfile.name}</h1>
              <p className="text-sm opacity-90">{mockUserProfile.bio}</p>
              <div className="flex items-center gap-1 mt-1 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#F59E0B"/>
                  <path d="M12 5l2 4.1 4.5 0.5-3.2 3.2 0.7 4.5-4-2.1-4 2.1 0.7-4.5-3.2-3.2 4.5-0.5z" fill="#FCD34D"/>
                </svg>
                <span className="ml-1">{mockUserProfile.rating}</span>
                <span className="mx-1">|</span>
                <span>{mockUserProfile.tripCount}次旅行</span>
              </div>
            </div>
            <button
              onClick={() => setShowEditProfile(true)}
              className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              编辑资料
            </button>
          </div>
        </div>
        
        {/* AI旅行洞察卡片 */}
        <div className="px-4 -mt-16 relative z-10">
          <div className="bg-white rounded-xl p-4 shadow-lg mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[#333] flex items-center gap-2">
                <span>🤖</span>
                <span>AI旅行洞察</span>
              </h2>
              <span className="text-xs bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6] px-2 py-1 rounded-full">
                个性化分析
              </span>
            </div>
            
            <p className="text-sm text-[#666] leading-relaxed mb-4">
              {mockUserProfile.aiInsight.summary}
            </p>
            
            {/* 出行风格分布 */}
            <div className="mb-4">
              <h3 className="text-xs font-medium text-[#333] mb-2">出行风格分布</h3>
              <div className="space-y-2">
                {mockUserProfile.aiInsight.styleDistribution.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-center justify-between text-xs text-[#666] mb-1">
                      <span>{item.name}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#8B5CF6] h-2 rounded-full"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 兴趣标签分布 */}
            <div className="mb-4">
              <h3 className="text-xs font-medium text-[#333] mb-2">兴趣标签分布</h3>
              <div className="flex gap-2">
                {mockUserProfile.aiInsight.interestDistribution.map((item) => (
                  <div
                    key={item.name}
                    className="flex-1 bg-[#F5F7FA] rounded-lg p-3 text-center"
                  >
                    <div className="text-2xl mb-1">
                      {item.name === '美食' ? '🍜' : item.name === '摄影' ? '📸' : '🏛️'}
                    </div>
                    <p className="text-xs text-[#333] font-medium">{item.name}</p>
                    <p className="text-xs text-[#8B5CF6] font-bold">{item.value}%</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 个性化推荐 */}
            <div>
              <h3 className="text-xs font-medium text-[#333] mb-2">为您推荐</h3>
              <div className="grid grid-cols-2 gap-2">
                {mockUserProfile.aiInsight.recommendations.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${
                      index === 0 ? 'from-blue-50 to-blue-100' : 'from-purple-50 to-purple-100'
                    } rounded-lg p-3`}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm">
                        {item.type === 'destination' ? '📍' : '🗺️'}
                      </span>
                      <span className="text-xs font-medium text-[#333]">{item.name}</span>
                    </div>
                    <p className="text-xs text-[#666]">{item.reason}</p>
                    {item.matchScore && (
                      <p className="text-xs text-[#10B981] font-medium mt-1">
                        匹配度 {item.matchScore}%
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 兴趣标签 */}
            <div>
              <h3 className="text-xs font-medium text-[#333] mb-2">我的兴趣标签</h3>
              <div className="flex gap-1 flex-wrap">
                {mockUserProfile.tags && mockUserProfile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6] px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* 功能菜单 */}
        <div className="px-4 py-4">
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4">
              <button
                onClick={() => handleMenuClick('我的路线')}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6C14.059 6 6 14.059 6 24c0 9.941 8.059 18 18 18s18-8.059 18-18c0-9.941-8.059-18-18-18zm0 30c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z" fill="#4A90E2"/>
                    <path d="M24 18c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6z" fill="#ffffff" fillOpacity="0.5"/>
                  </svg>
                </div>
                <span className="text-xs text-[#666]">我的路线</span>
              </button>
              <button
                onClick={() => handleMenuClick('我的收藏')}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 6l5.5 11.2L42 18.5l-9 8.8 2.1 12.3-11.1-5.9-11.1 5.9 2.1-12.3-9-8.8 12.5-1.3z" fill="#F59E0B"/>
                    <path d="M24 12l3.5 7.1 7.9 0.8-5.7 5.6 1.3 7.9-7-3.7-7 3.7 1.3-7.9-5.7-5.6 7.9-0.8z" fill="#FCD34D"/>
                  </svg>
                </div>
                <span className="text-xs text-[#666]">我的收藏</span>
              </button>
              <button
                onClick={() => handleMenuClick('我的订单')}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40 12h-8V8c0-2.209-1.791-4-4-4H20c-2.209 0-4 1.791-4 4v4H8c-2.209 0-4 1.791-4 4v24c0 2.209 1.791 4 4 4h32c2.209 0 4-1.791 4-4V16c0-2.209-1.791-4-4-4zM20 8h8v4h-8V8zm-12 8h32v24H8V16z" fill="#4CAF50"/>
                    <path d="M14 22h4v4h-4v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4zm-16 8h4v4h-4v-4zm8 0h4v4h-4v-4zm8 0h4v4h-4v-4z" fill="#ffffff" fillOpacity="0.3"/>
                  </svg>
                </div>
                <span className="text-xs text-[#666]">我的订单</span>
              </button>
              <button
                onClick={() => handleMenuClick('设置')}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="#9E9E9E"/>
                  </svg>
                </div>
                <span className="text-xs text-[#666]">设置</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* 其他功能 */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            <button
              onClick={() => setShowProcess(true)}
              className="w-full flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" fill="#8B5CF6"/>
                </svg>
                <span className="text-sm text-[#333]">AI开发全流程</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setShowAbout(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="#4A90E2"/>
                </svg>
                <span className="text-sm text-[#333]">关于</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* 底部占位 */}
        <div className="h-20"></div>

      {/* 编辑资料弹窗 */}
      <Modal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        title="编辑资料"
        size="lg"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {/* MBTI人格选择 */}
          <div className="bg-[#8B5CF6] bg-opacity-5 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-[#333] flex items-center gap-1">
                <span>🎭</span>
                <span>MBTI人格类型</span>
                <span className="text-[#FF6B6B] text-xs ml-1">推荐必填</span>
              </h3>
            </div>

            {/* 下拉选择器 */}
            <select
              value={selectedMBTI}
              onChange={(e) => setSelectedMBTI(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#8B5CF6] mb-3"
            >
              <option value="">选择你的MBTI类型</option>
              {Object.entries(mbtiTypes).map(([type, info]) => (
                <option key={type} value={type}>
                  {type} - {info.name}
                </option>
              ))}
            </select>

            {/* 选中后显示人格特质 */}
            {selectedMBTI && mbtiTypes[selectedMBTI] && (
              <div className="bg-white rounded-lg p-3 mt-2 border border-[#8B5CF6] border-opacity-20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm text-[#333]">
                    {selectedMBTI} - {mbtiTypes[selectedMBTI].name}
                  </span>
                </div>
                <p className="text-xs text-[#666] leading-relaxed">
                  {mbtiTypes[selectedMBTI].trait}
                </p>
              </div>
            )}
          </div>

          {/* 兴趣标签选择 */}
          <div>
            <h3 className="text-sm font-medium text-[#333] mb-2">选兴趣标签，帮你找到更合拍的旅伴</h3>
            <p className="text-xs text-gray-500 mb-3">最多选择8个标签</p>

            <div className="space-y-4">
              {Object.entries(tagConfig).map(([category, tags]) => (
                <div key={category}>
                  <h4 className="text-xs font-medium text-[#666] mb-2">{category}</h4>
                  <div className="flex gap-2 flex-wrap">
                    {tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedTags.includes(tag)
                            ? 'bg-[#8B5CF6] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setShowEditProfile(false)}
              className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-full font-medium text-sm"
            >
              取消
            </button>
            <button
              onClick={handleSaveProfile}
              className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] text-white py-3 rounded-full font-medium text-sm"
            >
              保存
            </button>
          </div>
        </div>
      </Modal>

      {/* AI开发流程弹窗 */}
      <Modal
        isOpen={showProcess}
        onClose={() => setShowProcess(false)}
        title="CodeBuddy AI 协作开发全流程"
        size="lg"
      >
        <div className="space-y-4 text-sm">
          <div className="bg-blue-50 rounded-lg p-3">
            <h3 className="font-bold text-[#333] mb-1">第1步：需求分析 🤔</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              使用AI工具拆解原始PRD，提取核心演示场景，删除冗余内容，明确Demo开发目标
              → 锁定2个核心AI演示场景，确定MVP开发范围
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <h3 className="font-bold text-[#333] mb-1">第2步：产品设计 📝</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              AI辅助完成产品交互流程设计、UI规范制定、AI场景可视化方案设计
              → 明确匹配算法权重、AI生成流程、交互细节
            </p>
          </div>
          <div className="bg-pink-50 rounded-lg p-3">
            <h3 className="font-bold text-[#333] mb-1">第3步：技术选型与架构设计 🎨</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              AI辅助确定技术栈，设计项目组件化架构，制定Mock数据方案
              → 确定React+Vite+Tailwind CSS技术方案，保证开发效率与简历认可度
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <h3 className="font-bold text-[#333] mb-1">第4步：代码实现 💻</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              AI辅助编写React组件，实现核心AI算法逻辑与可视化效果，完成全流程交互开发
              → 7天完成传统开发需2-3周的可交互Demo
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <h3 className="font-bold text-[#333] mb-1">第5步：迭代优化 🔄</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              根据AI建议优化UI交互、动画效果、响应式适配，提升演示体验
              → 完善面试演示脚本，优化核心亮点展示
            </p>
          </div>
        </div>
      </Modal>
      
      {/* 关于弹窗（含面试演示脚本） */}
      <Modal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
        title="关于"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-[#333] mb-2 flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" fill="#4A90E2"/>
              </svg>
              踹踹APP Demo
            </h3>
            <p className="text-sm text-[#666] leading-relaxed">
              AI驱动的大学生旅行搭子匹配平台Demo，重点展示AI产品场景设计与落地能力
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] rounded-lg p-4 text-white">
            <h3 className="font-bold mb-2">🎤 1分钟面试演示脚本</h3>
            <p className="text-xs leading-relaxed whitespace-pre-line">
各位面试官好，这是我主导设计、使用CodeBuddy AI辅助开发的大学生旅行搭子匹配平台Demo，核心面向AI产品经理岗位求职，重点展示我对AI产品场景的设计与落地能力。

首先是核心的AI旅伴匹配功能，输入西安的旅行需求后，系统会通过我设计的加权算法，从目的地、日期、兴趣、预算等维度计算匹配度，用雷达图透明展示AI的决策逻辑，同时给出具体的推荐理由，解决用户找旅伴时的信任问题。

第二个核心功能是AI路线规划，输入西安3天2000元的美食偏好需求后，AI会分步完成需求分析与路线生成，输出3套差异化的个性化方案，同时给出和用户需求强绑定的推荐理由，解决用户做攻略的门槛问题。

整个Demo用React+Tailwind CSS开发，核心AI算法逻辑由我设计并完成可视化，全程用AI工具提升开发效率，7天就完成了完整可交互的Demo，既体现了我的产品设计思维，也展现了AI时代产品经理必备的AI工具运用与技术落地能力。
            </p>
          </div>
          
          <div className="text-center text-xs text-gray-400 pt-4">
            <p>版本 v1.0</p>
            <p>2026年3月</p>
          </div>
        </div>
      </Modal>
      
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
      />
    </PhoneFrame>
  );
};

export default Profile;
