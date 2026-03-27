/**
 * AI路线页 - AI个性化路线规划核心功能
 * 需求输入→AI生成过程动画→多方案展示→详情页推荐理由
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockRoutes } from '../data/mockData';
import { generateRoutes, simulateRouteGeneration } from '../utils/routeAlgorithm';
import PhoneFrame from '../components/PhoneFrame';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const Route = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [showCodeModal, setShowCodeModal] = useState(false);
  
  // 用户需求
  const [requirements, setRequirements] = useState({
    destination: '西安',
    days: 3,
    budget: 500,
    tags: ['美食', '摄影'],
    travelStyle: '悠闲'
  });
  
  const generationSteps = [
    { text: 'AI正在分析您的需求', duration: 600 },
    { text: '正在匹配目的地热门景点', duration: 800 },
    { text: '正在规划行程节奏', duration: 800 },
    { text: '正在核算预算明细', duration: 800 }
  ];
  
  // 显示Toast
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 2000);
  };
  
  // 生成路线
  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationStep(0);
    
    // 分步显示生成过程
    let stepIndex = 0;
    const showSteps = () => {
      if (stepIndex < generationSteps.length) {
        setGenerationStep(stepIndex);
        setTimeout(() => {
          stepIndex++;
          showSteps();
        }, generationSteps[stepIndex].duration);
      } else {
        // 生成完成
        const generatedRoutes = generateRoutes(requirements);
        setRoutes(generatedRoutes);
        setIsGenerating(false);
        setShowForm(false);
      }
    };
    
    showSteps();
  };
  
  // 打开路线详情
  const openRouteDetail = (route) => {
    setSelectedRoute(route);
    setShowDetail(true);
  };
  
  // 收藏路线
  const handleSave = () => {
    showToast('已保存到我的路线');
    setShowDetail(false);
  };

  // 收藏方案
  const [savedRoutes, setSavedRoutes] = useState([]);
  const handleToggleSave = (routeId) => {
    if (savedRoutes.includes(routeId)) {
      setSavedRoutes(savedRoutes.filter(id => id !== routeId));
      showToast('已取消收藏');
    } else {
      setSavedRoutes([...savedRoutes, routeId]);
      showToast('已收藏方案');
    }
  };
  
  // 初始加载时生成路线
  useEffect(() => {
    handleGenerate();
  }, []);
  
  return (
    <PhoneFrame>
      {/* 头部 */}
        <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-[#333]">AI路线规划</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#8B5CF6] text-white px-3 py-1.5 rounded-full text-xs font-medium"
            >
              自定义需求
            </button>
          </div>
        </div>
        
        {/* 需求输入表单 */}
        {showForm && (
          <div className="p-4 bg-white mb-4 animate-fade-in">
            <div className="space-y-3">
              <div>
                <label className="text-sm text-[#666] mb-1 block">目的地</label>
                <select
                  value={requirements.destination}
                  onChange={(e) => setRequirements({ ...requirements, destination: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="西安">西安</option>
                  <option value="成都">成都</option>
                  <option value="重庆">重庆</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[#666] mb-1 block">出行天数</label>
                <select
                  value={requirements.days}
                  onChange={(e) => setRequirements({ ...requirements, days: parseInt(e.target.value) })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                >
                  <option value={2}>2天</option>
                  <option value={3}>3天</option>
                  <option value={4}>4天</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[#666] mb-1 block">预算范围: <span className="text-[#4A90E2] font-medium">¥{requirements.budget}</span></label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={requirements.budget}
                  onChange={(e) => setRequirements({ ...requirements, budget: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4A90E2]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>¥0</span>
                  <span>¥500</span>
                  <span>¥1000</span>
                  <span>¥1500</span>
                  <span>¥2000</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-[#666] mb-1 block">兴趣偏好</label>
                <div className="flex flex-wrap gap-2">
                  {['美食', '摄影', '文化', '户外', '探店'].map((tag) => (
                    <button
                      key={tag}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                        requirements.tags.includes(tag)
                          ? 'bg-[#8B5CF6] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => {
                        if (requirements.tags.includes(tag)) {
                          setRequirements({
                            ...requirements,
                            tags: requirements.tags.filter(t => t !== tag)
                          });
                        } else {
                          setRequirements({
                            ...requirements,
                            tags: [...requirements.tags, tag]
                          });
                        }
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-[#666] mb-1 block">出行风格</label>
                <div className="flex gap-2">
                  {['悠闲', '紧凑', '深度游'].map((style) => (
                    <button
                      key={style}
                      className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium ${
                        requirements.travelStyle === style
                          ? 'bg-[#8B5CF6] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => setRequirements({ ...requirements, travelStyle: style })}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={handleGenerate}
                className="w-full bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] text-white py-3 rounded-full font-medium"
              >
                🤖 AI生成路线
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="w-full text-gray-400 text-sm"
              >
                取消
              </button>
            </div>
          </div>
        )}
        
        {/* AI生成过程动画 - 屏幕中央 */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-2xl text-center w-80">
              <div className="mb-6">
                <div className="inline-block animate-pulse-custom">
                  <span className="text-5xl">🤖</span>
                </div>
              </div>
              <p className="text-[#333] font-medium mb-4 text-base h-6 flex items-center justify-center">
                {generationSteps[generationStep]?.text}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                <div
                  className="bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${((generationStep + 1) / generationSteps.length) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                步骤 {generationStep + 1} / {generationSteps.length}
              </p>
            </div>
          </div>
        )}
        
        {/* 路线方案列表 */}
        {!isGenerating && routes.length > 0 && (
          <div className="px-4 py-3">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-[#333]">
                为您生成 {routes.length} 套方案
              </h2>
            </div>
            
            <div className="space-y-3">
              {routes.map((route, index) => (
                <div
                  key={route.id}
                  className="bg-white rounded-xl p-4 shadow-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 cursor-pointer" onClick={() => openRouteDetail(route)}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[#333]">{route.title}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          index === 0 ? 'bg-[#10B981] text-white' :
                          index === 1 ? 'bg-[#FF6B6B] text-white' :
                          'bg-gray-200 text-gray-600'
                        }`}>
                          匹配度 {route.matchScore}%
                        </span>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {route.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6] px-2 py-0.5 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => handleToggleSave(route.id)}
                      className="ml-2 text-2xl"
                    >
                      {savedRoutes.includes(route.id) ? '⭐' : '☆'}
                    </button>
                  </div>

                  <div className="text-sm text-[#666] mb-2 cursor-pointer" onClick={() => openRouteDetail(route)}>
                    <span>📅 {route.days}天</span>
                    <span className="mx-2">|</span>
                    <span>💰 ¥{route.totalBudget}</span>
                  </div>

                  <div className="text-xs text-[#8B5CF6] mb-2 cursor-pointer" onClick={() => openRouteDetail(route)}>
                    🌟 {route.highlights[0]}
                  </div>

                  <div className="text-xs text-[#666] bg-[#F5F7FA] rounded p-2 cursor-pointer" onClick={() => openRouteDetail(route)}>
                    <span className="font-medium text-[#8B5CF6]">AI推荐：</span>
                    {route.aiReason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 底部占位 */}
        <div className="h-20"></div>

      {/* 路线详情弹窗 */}
      <Modal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        title="路线详情"
        size="xl"
      >
        {selectedRoute && (
          <div className="space-y-4">
            {/* 路线概览 */}
            <div className="bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{selectedRoute.title}</h3>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-bold">
                  匹配度 {selectedRoute.matchScore}%
                </span>
              </div>
              <div className="flex gap-4 text-sm">
                <span>📅 {selectedRoute.days}天</span>
                <span>💰 ¥{selectedRoute.totalBudget}</span>
              </div>
              <div className="flex gap-1 mt-2 flex-wrap">
                {selectedRoute.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white bg-opacity-20 px-2 py-0.5 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* AI推荐理由 */}
            <div className="bg-[#F5F7FA] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-[#333]">🤖 AI推荐理由</h3>
                <button
                  onClick={() => setShowCodeModal(true)}
                  className="text-xs text-[#8B5CF6]"
                >
                  查看算法代码
                </button>
              </div>
              <p className="text-sm text-[#666] leading-relaxed">
                {selectedRoute.aiReason}
              </p>
            </div>
            
            {/* 核心亮点 */}
            <div>
              <h3 className="font-bold text-[#333] mb-2">✨ 核心亮点</h3>
              <div className="space-y-2">
                {selectedRoute.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-[#666]"
                  >
                    <span className="text-[#FF6B6B]">🔥</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 每日行程 */}
            <div>
              <h3 className="font-bold text-[#333] mb-2">📋 每日行程</h3>
              <div className="space-y-3">
                {selectedRoute.itinerary.map((day, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-[#333]">第{day.day}天：{day.title}</h4>
                      <span className="text-xs text-[#FF6B6B]">¥{day.budget}</span>
                    </div>
                    <div className="text-xs text-[#666] space-y-1">
                      <div>
                        <span className="text-gray-400">景点：</span>
                        <span>{day.attractions.join('、')}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">用餐：</span>
                        <span>早{day.meals.breakfast} · 午{day.meals.lunch} · 晚{day.meals.dinner}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">备注：</span>
                        <span>{day.notes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 交通建议 */}
            <div>
              <h3 className="font-bold text-[#333] mb-2">🚌 交通建议</h3>
              <div className="bg-[#F0F9FF] rounded-lg p-3 text-sm text-[#666]">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#4A90E2]">🚇</span>
                    <div>
                      <p className="font-medium text-[#333]">市内交通</p>
                      <p className="text-xs">推荐使用地铁+共享单车组合，票价实惠且覆盖主要景点</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#4A90E2]">🚕</span>
                    <div>
                      <p className="font-medium text-[#333]">夜间出行</p>
                      <p className="text-xs">不夜城等夜间景点建议打车，注意安全</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 用餐推荐 */}
            <div>
              <h3 className="font-bold text-[#333] mb-2">🍜 用餐推荐</h3>
              <div className="bg-[#FFF7ED] rounded-lg p-3 text-sm text-[#666]">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[#FF6B6B]">📍</span>
                    <div>
                      <p className="font-medium text-[#333]">回民街美食区</p>
                      <p className="text-xs">必尝：羊肉泡馍、灌汤包、肉夹馍</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#FF6B6B]">📍</span>
                    <div>
                      <p className="font-medium text-[#333]">洒金桥小吃天堂</p>
                      <p className="text-xs">推荐：胡辣汤、油茶麻花、biangbiang面</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 费用明细 */}
            <div>
              <h3 className="font-bold text-[#333] mb-2">💰 费用明细</h3>
              <div className="bg-[#FDF2F8] rounded-lg p-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#666]">景点门票</span>
                    <span className="text-[#333]">¥{Math.round(selectedRoute.totalBudget * 0.3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">餐饮费用</span>
                    <span className="text-[#333]">¥{Math.round(selectedRoute.totalBudget * 0.45)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">交通费用</span>
                    <span className="text-[#333]">¥{Math.round(selectedRoute.totalBudget * 0.15)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">其他费用</span>
                    <span className="text-[#333]">¥{Math.round(selectedRoute.totalBudget * 0.1)}</span>
                  </div>
                  <div className="border-t border-[#8B5CF6] pt-2 mt-2">
                    <div className="flex justify-between font-bold text-[#8B5CF6]">
                      <span>预计总费用</span>
                      <span>¥{selectedRoute.totalBudget}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 操作按钮 */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => showToast('已收藏方案')}
                className="flex-1 bg-[#FFB800] text-white py-3 rounded-full font-medium"
              >
                ⭐ 收藏方案
              </button>
              <button
                onClick={() => showToast('分享成功')}
                className="flex-1 bg-[#4A90E2] text-white py-3 rounded-full font-medium"
              >
                🔗 分享
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-[#10B981] text-white py-3 rounded-full font-medium"
              >
                💾 保存路线
              </button>
            </div>
          </div>
        )}
      </Modal>
      
      {/* 算法代码弹窗 */}
      <Modal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        title="路线生成算法代码"
        size="xl"
      >
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-xs font-mono">
{`/**
 * AI个性化路线规划算法
 */
export const generateRoutes = (requirements) => {
  // 1. 根据用户需求获取预设路线
  const routes = getPredefinedRoutes(
    requirements.destination,
    requirements.days,
    requirements.budget,
    requirements.tags,
    requirements.travelStyle
  );
  
  // 2. 为每条路线计算匹配度
  const routesWithScore = routes.map(route => ({
    ...route,
    matchScore: calculateRouteMatchScore(requirements, route),
    aiReason: generateRouteReason(requirements, route)
  }));
  
  // 3. 按匹配度排序
  return routesWithScore.sort((a, b) => b.matchScore - a.matchScore);
};

// 匹配度计算
const calculateRouteMatchScore = (requirements, route) => {
  let score = 70; // 基础分
  
  // 标签匹配 (每个匹配标签+5分)
  const tagMatches = requirements.tags.filter(tag => 
    route.tags.includes(tag)
  ).length;
  score += tagMatches * 5;
  
  // 出行风格匹配 (+10分)
  if (route.tags.includes(requirements.travelStyle)) {
    score += 10;
  }
  
  // 预算匹配
  const budgetDiff = Math.abs(requirements.budget - route.totalBudget);
  if (budgetDiff / requirements.budget <= 0.1) {
    score += 10;
  }
  
  return Math.min(score, 100);
};`}
          </pre>
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

export default Route;
