/**
 * 搜索页 - AI智能旅伴匹配核心功能
 * 需求输入→AI匹配计算→结果列表→详情页匹配可视化
 */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../data/mockData';
import { matchTravelCompanions } from '../utils/matchAlgorithm';
import PhoneFrame from '../components/PhoneFrame';
import RingProgress from '../components/RingProgress';
import Modal from '../components/Modal';
import RadarChart from '../components/RadarChart';
import Toast from '../components/Toast';
import { tagConfig } from '../config/tagConfig';

const Search = () => {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(true);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showMatchProcess, setShowMatchProcess] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  const [showCodeModal, setShowCodeModal] = useState(false);

  // MBTI人格数据
  const mbtiTypes = {
    'ISTJ': { name: '物流师' },
    'ISFJ': { name: '守卫者' },
    'INFJ': { name: '提倡者' },
    'INTJ': { name: '建筑师' },
    'ISTP': { name: '鉴赏家' },
    'ISFP': { name: '探险家' },
    'INFP': { name: '调停者' },
    'INTP': { name: '逻辑学家' },
    'ESTP': { name: '企业家' },
    'ESFP': { name: '表演者' },
    'ENFP': { name: '快乐小狗' },
    'ENTP': { name: '辩论家' },
    'ESTJ': { name: '总经理' },
    'ESFJ': { name: '执政官' },
    'ENFJ': { name: '主人公' },
    'ENTJ': { name: '指挥官' }
  };

  // 从 localStorage 获取搜索参数，如果没有则使用默认值
  const getSearchParams = () => {
    const savedParams = localStorage.getItem('searchParams');
    if (savedParams) {
      const params = JSON.parse(savedParams);
      return {
        destination: params.destination || '西安',
        travelDate: params.travelDate || '2026-04-15',
        days: 3,
        budget: params.budget ? (typeof params.budget === 'string' ? parseInt(params.budget.split('-')[0]) : params.budget) : 500,
        tags: params.tags || ['美食', '摄影', '文化'],
        travelStyle: '悠闲',
        gender: params.gender || '',
        ageRange: params.ageRange || '',
        schoolFilter: params.schoolFilter || ''
      };
    }
    return {
      destination: '西安',
      travelDate: '2026-04-15',
      days: 3,
      budget: 500,
      tags: ['美食', '摄影', '文化'],
      travelStyle: '悠闲',
      gender: '',
      ageRange: '',
      schoolFilter: ''
    };
  };

  const [requirements, setRequirements] = useState(getSearchParams());

  // 快捷筛选
  const [filters, setFilters] = useState({
    gender: '',
    ageRange: '',
    schoolFilter: '',
    interestTags: [],
    mbtiTypes: []
  });
  const [showTagModal, setShowTagModal] = useState(false);
  const [showMBTIModal, setShowMBTIModal] = useState(false);
  const [tempSelectedTags, setTempSelectedTags] = useState([]);
  const [tempMBTITypes, setTempMBTITypes] = useState([]);

  // 从localStorage加载用户已选标签和MBTI
  useEffect(() => {
    const savedTags = localStorage.getItem('userSelectedTags');
    if (savedTags) {
      const tags = JSON.parse(savedTags);
      setFilters(prev => ({ ...prev, interestTags: tags }));
    }
  }, []);
  
  // 显示Toast
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 2000);
  };
  
  // 筛选用户
  const filterUsers = (users, filterParams) => {
    let filtered = [...users];

    // 性别筛选
    if (filterParams.gender) {
      filtered = filtered.filter(user => user.gender === filterParams.gender);
    }

    // 年龄范围筛选
    if (filterParams.ageRange) {
      if (filterParams.ageRange === '18-20') {
        filtered = filtered.filter(user => user.age >= 18 && user.age <= 20);
      } else if (filterParams.ageRange === '21-23') {
        filtered = filtered.filter(user => user.age >= 21 && user.age <= 23);
      } else if (filterParams.ageRange === '24+') {
        filtered = filtered.filter(user => user.age >= 24);
      }
    }

    // 同校/同城筛选
    if (filterParams.schoolFilter) {
      filtered = filtered.filter(user => {
        // 假设当前用户是西安交通大学，城市是西安
        if (filterParams.schoolFilter === '同校') {
          return user.school === '西安交通大学';
        } else if (filterParams.schoolFilter === '同城') {
          return user.city === '西安';
        }
        return true;
      });
    }

    // 兴趣标签筛选
    if (filterParams.interestTags && filterParams.interestTags.length > 0) {
      filtered = filtered.filter(user => {
        const userTags = user.tags || [];
        return filterParams.interestTags.some(tag => userTags.includes(tag));
      });
      // 按标签重合度排序
      filtered.sort((a, b) => {
        const aMatches = (a.tags || []).filter(tag => filterParams.interestTags.includes(tag)).length;
        const bMatches = (b.tags || []).filter(tag => filterParams.interestTags.includes(tag)).length;
        return bMatches - aMatches;
      });
    }

    // MBTI类型筛选
    if (filterParams.mbtiTypes && filterParams.mbtiTypes.length > 0) {
      filtered = filtered.filter(user => {
        return filterParams.mbtiTypes.includes(user.mbti);
      });
    }

    return filtered;
  };

  // 保存搜索参数到 localStorage
  const handleSaveSearchParams = () => {
    localStorage.setItem('searchParams', JSON.stringify({
      destination: requirements.destination,
      travelDate: requirements.travelDate,
      peopleCount: requirements.days,
      budget: requirements.budget,
      tags: requirements.tags,
      gender: requirements.gender,
      ageRange: requirements.ageRange,
      schoolFilter: requirements.schoolFilter
    }));
  };

  // 切换搜索表单显示
  const handleToggleSearchForm = () => {
    setShowSearchForm(!showSearchForm);
  };

  // 执行匹配
  const handleSearch = () => {
    handleSaveSearchParams();
    setShowMatchProcess(true);

    // 模拟AI计算过程
    setTimeout(() => {
      const results = matchTravelCompanions(requirements, mockUsers);
      setMatchedUsers(results);
      // 应用筛选
      const filtered = filterUsers(results, filters);
      setFilteredUsers(filtered);
      // 先关闭加载动画，再关闭搜索表单
      setShowMatchProcess(false);
      setTimeout(() => {
        setShowSearchForm(false);
      }, 0);
    }, 1500);
  };

  // 更新筛选
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    // 立即重新筛选
    const filtered = filterUsers(matchedUsers, newFilters);
    setFilteredUsers(filtered);
  };

  // 标签筛选
  const handleTagFilter = (tag) => {
    let newTags;
    if (tempSelectedTags.includes(tag)) {
      newTags = tempSelectedTags.filter(t => t !== tag);
    } else if (tempSelectedTags.length < 8) {
      newTags = [...tempSelectedTags, tag];
    } else {
      showToast('最多只能选择8个标签', 'warning');
      return;
    }
    setTempSelectedTags(newTags);
  };

  // 打开标签选择弹窗
  const openTagModal = () => {
    setTempSelectedTags(filters.interestTags);
    setShowTagModal(true);
  };

  // 确认标签选择
  const confirmTagSelection = () => {
    handleFilterChange('interestTags', tempSelectedTags);
    localStorage.setItem('userSelectedTags', JSON.stringify(tempSelectedTags));
    setShowTagModal(false);
  };

  // 取消标签选择
  const cancelTagSelection = () => {
    setShowTagModal(false);
  };

  // MBTI筛选
  const handleMBTIFilter = (mbti) => {
    let newMBTIs;
    if (tempMBTITypes.includes(mbti)) {
      newMBTIs = tempMBTITypes.filter(t => t !== mbti);
    } else {
      newMBTIs = [...tempMBTITypes, mbti];
    }
    setTempMBTITypes(newMBTIs);
  };

  // 打开MBTI选择弹窗
  const openMBTIModal = () => {
    setTempMBTITypes(filters.mbtiTypes);
    setShowMBTIModal(true);
  };

  // 确认MBTI选择
  const confirmMBTISelection = () => {
    handleFilterChange('mbtiTypes', tempMBTITypes);
    setShowMBTIModal(false);
  };

  // 取消MBTI选择
  const cancelMBTISelection = () => {
    setShowMBTIModal(false);
  };

  // 同频人格筛选
  const handleSameMBTI = () => {
    const userMBTI = localStorage.getItem('userMBTI');
    if (userMBTI) {
      handleFilterChange('mbtiTypes', [userMBTI]);
      showToast('已筛选同频人格');
    } else {
      showToast('请先在"我的"页面设置MBTI', 'warning');
    }
  };

  // 互补人格筛选
  const handleComplementaryMBTI = () => {
    const userMBTI = localStorage.getItem('userMBTI');
    if (userMBTI) {
      // 简化版：选择其他所有类型作为互补
      const complementaryTypes = Object.keys(mbtiTypes).filter(type => type !== userMBTI);
      handleFilterChange('mbtiTypes', complementaryTypes);
      showToast('已筛选互补人格');
    } else {
      showToast('请先在"我的"页面设置MBTI', 'warning');
    }
  };

  // 计算MBTI适配度
  const calculateMBTICompatibility = (candidateMBTI) => {
    const userMBTI = localStorage.getItem('userMBTI');
    if (!userMBTI || !candidateMBTI) return 0;

    // 如果是同一种类型，给高分
    if (userMBTI === candidateMBTI) {
      return 95;
    }

    // 计算维度相似度
    let matchCount = 0;
    const dimensions = ['E/I', 'N/S', 'F/T', 'J/P'];
    dimensions.forEach(dim => {
      const [option1, option2] = dim.split('/');
      const userChar = userMBTI.includes(option1) ? option1 : option2;
      const candidateChar = candidateMBTI.includes(option1) ? option1 : option2;
      if (userChar === candidateChar) {
        matchCount++;
      }
    });

    // 根据匹配维度数量计算分数
    switch (matchCount) {
      case 3: return 88;
      case 2: return 75;
      case 1: return 60;
      default: return 45;
    }
  };

  // 生成MBTI推荐理由
  const generateMBTIReason = (candidateMBTI) => {
    const userMBTI = localStorage.getItem('userMBTI');
    if (!userMBTI || !candidateMBTI) {
      return '请在"我的"页面设置MBTI以获取个性化分析';
    }

    const compatibility = calculateMBTICompatibility(candidateMBTI);

    // 同类型
    if (userMBTI === candidateMBTI) {
      return `你们都是${mbtiTypes[userMBTI]?.name}，完全同频人格，旅行节奏和喜好高度一致！`;
    }

    // 计算相似维度
    let matchCount = 0;
    const dimensions = ['E/I', 'N/S', 'F/T', 'J/P'];
    dimensions.forEach(dim => {
      const [option1, option2] = dim.split('/');
      const userChar = userMBTI.includes(option1) ? option1 : option2;
      const candidateChar = candidateMBTI.includes(option1) ? option1 : option2;
      if (userChar === candidateChar) {
        matchCount++;
      }
    });

    const groupName = getMBTIGroupName(userMBTI);
    const candidateName = mbtiTypes[candidateMBTI]?.name || candidateMBTI;

    if (matchCount >= 3) {
      return `你是${mbtiTypes[userMBTI]?.name}，对方是${candidateName}，性格高度相似，旅行节奏同频，话题契合度高`;
    } else if (matchCount >= 2) {
      return `你是${mbtiTypes[userMBTI]?.name}，对方是${candidateName}，性格互补，可以相互激发旅行的不同乐趣`;
    } else {
      return `你是${mbtiTypes[userMBTI]?.name}，对方是${candidateName}，性格差异较大，可以体验不同的旅行方式`;
    }
  };

  // 获取MBTI分组名称
  const getMBTIGroupName = (mbti) => {
    if (mbti.startsWith('N')) {
      if (mbti.includes('F')) return 'NF理想主义者';
      if (mbti.includes('T')) return 'NT分析者';
    } else if (mbti.startsWith('S')) {
      if (mbti.includes('F')) return 'SF守护者';
      if (mbti.includes('T')) return 'ST管理者';
    }
    return mbti;
  };

  // 初始加载时不执行匹配，直接显示搜索表单
  // useEffect(() => {
  //   handleSearch();
  // }, []);
  
  // 打开用户详情
  const openUserDetail = (user) => {
    setSelectedUser(user);
    setShowDetail(true);
  };
  
  // 发送搭伴申请
  const handleApply = () => {
    showToast('申请已发送，等待对方回复');
    setShowDetail(false);
  };
  
  // 发起聊天
  const handleChat = () => {
    setShowDetail(false);
    // 跳转到消息页，并设置选中用户ID，以便在消息页打开对应的聊天
    navigate('/message', { state: { targetUserId: selectedUser.id } });
  };

  return (
    <PhoneFrame>
        {/* 头部 */}
        <div className="bg-white p-3 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => navigate('/')} className="text-[#333]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-sm font-bold text-[#333]">AI智能匹配</h1>
            <button
              onClick={handleToggleSearchForm}
              className="text-[#4A90E2] text-xs font-medium"
            >
              {showSearchForm ? '收起' : '搜索'}
            </button>
          </div>

          {/* 搜索表单 */}
          {showSearchForm && (
            <div className="space-y-2 mb-2">
              {/* 目的地 */}
              <div>
                <label className="text-[10px] text-[#666] mb-1 block">目的地</label>
                <input
                  type="text"
                  placeholder="输入目的地，如：西安"
                  value={requirements.destination}
                  onChange={(e) => setRequirements({ ...requirements, destination: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#4A90E2]"
                />
              </div>

              {/* 出行日期 */}
              <div>
                <label className="text-[10px] text-[#666] mb-1 block">出行日期</label>
                <input
                  type="date"
                  value={requirements.travelDate}
                  onChange={(e) => setRequirements({ ...requirements, travelDate: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#4A90E2]"
                />
              </div>

              {/* 出行人数 */}
              <div>
                <label className="text-[10px] text-[#666] mb-1 block">出行人数</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRequirements({ ...requirements, days: num })}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-medium ${
                        requirements.days === num
                          ? 'bg-[#4A90E2] text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {num}人
                    </button>
                  ))}
                </div>
              </div>

              {/* 预算范围 - 滑块控制 */}
              <div>
                <label className="text-[10px] text-[#666] mb-1 block">预算范围: <span className="text-[#4A90E2] font-medium">¥{requirements.budget}</span></label>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="100"
                  value={requirements.budget}
                  onChange={(e) => setRequirements({ ...requirements, budget: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#4A90E2]"
                />
                <div className="flex justify-between text-[9px] text-gray-400 mt-1">
                  <span>¥0</span>
                  <span>¥500</span>
                  <span>¥1000</span>
                  <span>¥1500</span>
                  <span>¥2000</span>
                </div>
              </div>

              {/* 搜索按钮 */}
              <button
                onClick={handleSearch}
                className="w-full bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] text-white py-2.5 rounded-full font-medium text-xs"
              >
                🔍 开始搜索
              </button>
            </div>
          )}

          {/* 兴趣标签筛选模块 */}
          {!showSearchForm && (
            <>
            <div className="mb-2 px-3 py-2">
              <div className="bg-white rounded-lg p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-[#333] mb-1">兴趣标签筛选</div>
                  <div className="flex gap-1 flex-wrap">
                    {filters.interestTags.length === 0 ? (
                      <span className="text-[10px] text-gray-400">点击右侧按钮选择标签</span>
                    ) : (
                      filters.interestTags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6] px-2 py-0.5 rounded text-[10px]"
                        >
                          {tag}
                        </span>
                      ))
                    )}
                  </div>
                </div>
                <button
                  onClick={openTagModal}
                  className="bg-[#8B5CF6] text-white px-4 py-1.5 rounded-full text-xs font-medium"
                >
                  选择标签
                </button>
              </div>
            </div>

            {/* MBTI人格筛选模块 */}
            <div className="mb-2 px-3 py-2">
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs font-medium text-[#333] mb-2">MBTI人格筛选</div>
                <div className="flex gap-1 flex-wrap mb-2">
                  {filters.mbtiTypes.length === 0 ? (
                    <span className="text-[10px] text-gray-400">点击下方按钮筛选MBTI</span>
                  ) : (
                    filters.mbtiTypes.map((type) => (
                      <span
                        key={type}
                        className="bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6] px-2 py-0.5 rounded text-[10px]"
                      >
                        {type}
                      </span>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSameMBTI}
                    className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] text-white px-3 py-1.5 rounded-full text-xs font-medium"
                  >
                    同频人格
                  </button>
                  <button
                    onClick={handleComplementaryMBTI}
                    className="flex-1 bg-gradient-to-r from-[#8B5CF6] to-[#FF6B6B] text-white px-3 py-1.5 rounded-full text-xs font-medium"
                  >
                    互补人格
                  </button>
                  <button
                    onClick={openMBTIModal}
                    className="flex-1 bg-gradient-to-r from-[#FF6B6B] to-[#F59E0B] text-white px-3 py-1.5 rounded-full text-xs font-medium"
                  >
                    自定义
                  </button>
                </div>
              </div>
            </div>

            {/* 快捷筛选（结果列表显示时） */}
            <div className="flex flex-wrap gap-2 px-3 py-2">
                  {/* 性别筛选 */}
                  <button
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      filters.gender === '' ? 'bg-[#4A90E2] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => handleFilterChange('gender', '')}
                  >
                    全部性别
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      filters.gender === '女' ? 'bg-[#4A90E2] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => handleFilterChange('gender', '女')}
                  >
                    女生
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      filters.gender === '男' ? 'bg-[#4A90E2] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => handleFilterChange('gender', '男')}
                  >
                    男生
                  </button>
                  {/* 同校/同城筛选 */}
                  <button
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      filters.schoolFilter === '同校' ? 'bg-[#4A90E2] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => handleFilterChange('schoolFilter', filters.schoolFilter === '同校' ? '' : '同校')}
                  >
                    同校
                  </button>
                  <button
                    className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                      filters.schoolFilter === '同城' ? 'bg-[#4A90E2] text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                    onClick={() => handleFilterChange('schoolFilter', filters.schoolFilter === '同城' ? '' : '同城')}
                  >
                    同城
                  </button>
                </div>

            {/* 需求展示 */}
            <div
              className="bg-[#F5F7FA] rounded-lg p-2.5 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setShowSearchForm(true)}
            >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#666]">
                    <span>📍 {requirements.destination}</span>
                    <span>|</span>
                    <span>📅 {requirements.travelDate}</span>
                    <span>|</span>
                    <span>💰 ¥{requirements.budget}</span>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <div className="flex gap-1 mt-1.5 flex-wrap">
                  {requirements.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6] px-2 py-0.5 rounded text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        {/* AI匹配过程动画 */}
        {showMatchProcess && (
          <div className="p-4">
            <div className="bg-white rounded-xl p-6 shadow-card text-center">
              <div className="mb-4">
                <div className="inline-block animate-pulse-custom">
                  <span className="text-4xl">🤖</span>
                </div>
              </div>
              <p className="text-[#333] font-medium mb-2">AI正在为您匹配旅伴...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#8B5CF6] h-2 rounded-full animate-pulse-custom" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">分析目的地匹配 · 计算时间重合度 · 评估兴趣契合度</p>
            </div>
          </div>
        )}
        
        {/* 匹配结果列表 */}
        {!showSearchForm && !showMatchProcess && (
          <div className="px-3 py-2.5">
            {filteredUsers.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold text-xs text-[#333]">
                    找到 {filteredUsers.length} 位匹配搭子
                    {(filters.gender || filters.schoolFilter) && (
                      <span className="text-[10px] text-gray-400 ml-2">
                        (筛选: {[
                          filters.gender === '女' ? '女生' : filters.gender === '男' ? '男生' : '',
                          filters.schoolFilter
                        ].filter(Boolean).join(' + ')})
                      </span>
                    )}
                  </h2>
                  <span className="text-[10px] text-[#8B5CF6]">按匹配度排序</span>
                </div>

                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="bg-white rounded-xl p-3 shadow-card"
                      onClick={() => openUserDetail(user)}
                    >
                      <div className="flex items-start gap-2.5">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-bold text-xs text-[#333]">{user.name}</span>
                            <span className="text-[10px] text-gray-400">{user.gender}</span>
                            <span className="text-[10px] text-gray-400">{user.age}岁</span>
                            {user.mbti && (
                              <span className="bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] text-white px-1.5 py-0.5 rounded text-[9px] font-medium">
                                {user.mbti}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500 mb-1.5">
                            {user.school} · {user.destination} · {user.travelDate}
                          </p>
                          <div className="flex gap-1 flex-wrap">
                            {user.tags && user.tags.map((tag) => (
                              <span
                                key={tag}
                                className={`px-1.5 py-0.5 rounded text-[10px] ${
                                  (filters.interestTags.length > 0 && filters.interestTags.includes(tag))
                                    ? 'bg-[#8B5CF6] text-white'
                                    : 'bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6]'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <RingProgress score={Math.round(user.totalScore || 0)} size={40} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔍</div>
                <p className="text-sm text-gray-500 mb-2">没有找到匹配的搭子</p>
                <p className="text-xs text-gray-400">试试调整搜索条件或筛选条件</p>
              </div>
            )}
          </div>
        )}

        {/* 底部占位 */}
        <div className="h-20"></div>

        {/* 用户详情弹窗 */}
        <Modal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        title="搭子详情"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-4">
            {/* 基本信息 */}
            <div className="flex items-center gap-2.5 pb-3 border-b">
              <img
                src={selectedUser.avatar || ''}
                alt={selectedUser.name || '用户'}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#333]">{selectedUser.name || '未知'}</span>
                  <span className="text-yellow-400 text-[10px]">⭐ {selectedUser.rating || 0}</span>
                </div>
                <p className="text-[10px] text-gray-500">
                  {selectedUser.school || '未知学校'} · {selectedUser.gender || ''} · {selectedUser.age || 0}岁
                </p>
                <p className="text-[9px] text-gray-400 mt-0.5">{selectedUser.bio || ''}</p>
              </div>
            </div>

            {/* AI匹配分析 */}
            <div className="bg-[#F5F7FA] rounded-lg p-2.5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-[10px] text-[#333]">🤖 AI匹配分析</h3>
                <button
                  onClick={() => setShowCodeModal(true)}
                  className="text-[10px] text-[#8B5CF6]"
                >
                  查看算法代码
                </button>
              </div>

              <div className="flex gap-2">
                <RadarChart
                  data={[
                    { label: '目的地', value: selectedUser.scores?.destination || 0 },
                    { label: '日期', value: selectedUser.scores?.date || 0 },
                    { label: '兴趣', value: selectedUser.scores?.tags || 0 },
                    { label: '预算', value: selectedUser.scores?.budget || 0 },
                    { label: '风格', value: selectedUser.scores?.style || 0 },
                  ]}
                  labels={['目的地', '日期', '兴趣', '预算', '风格']}
                />
                <div className="flex-1 text-[10px] text-[#666] whitespace-pre-line">
                  {selectedUser.reason || '暂无匹配分析'}
                </div>
              </div>
            </div>

            {/* MBTI适配度 */}
            {selectedUser.mbti && (
              <div>
                <h3 className="font-bold text-[10px] text-[#333] mb-1.5 flex items-center gap-1">
                  <span>🎭</span>
                  <span>MBTI适配度</span>
                </h3>
                <div className="bg-[#F5F7FA] rounded-lg p-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-[#666]">
                      {selectedUser.mbti} - {mbtiTypes[selectedUser.mbti]?.name || selectedUser.mbti}
                    </span>
                    <span className="text-[10px] text-[#8B5CF6] font-bold">
                      {calculateMBTICompatibility(selectedUser.mbti)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                    <div
                      className="bg-[#8B5CF6] h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${calculateMBTICompatibility(selectedUser.mbti)}%` }}
                    ></div>
                  </div>
                  <p className="text-[9px] text-[#666] leading-relaxed">
                    {generateMBTIReason(selectedUser.mbti)}
                  </p>
                </div>
              </div>
            )}

            {/* 旅行偏好 */}
            <div>
              <h3 className="font-bold text-[10px] text-[#333] mb-1.5">旅行偏好</h3>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="bg-gray-50 rounded-lg p-1.5">
                  <span className="text-gray-500 text-[9px]">出行风格</span>
                  <p className="text-[#333] font-medium text-[10px]">{selectedUser.travelStyle || '未知'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-1.5">
                  <span className="text-gray-500 text-[9px]">预算范围</span>
                  <p className="text-[#333] font-medium text-[10px]">{selectedUser.budgetRange || '未知'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-1.5">
                  <span className="text-gray-500 text-[9px]">旅行次数</span>
                  <p className="text-[#333] font-medium text-[10px]">{selectedUser.tripCount || 0}次</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-1.5">
                  <span className="text-gray-500 text-[9px]">最近旅行</span>
                  <p className="text-[#333] font-medium text-[10px]">{selectedUser.recentTrips && selectedUser.recentTrips[0] ? selectedUser.recentTrips[0] : '无'}</p>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleApply}
                className="flex-1 bg-[#4A90E2] text-white py-2 rounded-full font-medium text-[10px]"
              >
                发送搭伴申请
              </button>
              <button
                onClick={handleChat}
                className="flex-1 bg-[#8B5CF6] text-white py-2 rounded-full font-medium text-[10px]"
              >
                发起聊天
              </button>
            </div>
          </div>
        )}
      </Modal>
      
      {/* 算法代码弹窗 */}
      <Modal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        title="匹配算法代码"
        size="xl"
      >
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-xs font-mono">
{`/**
 * AI智能旅伴匹配算法
 * 权重分配：目的地40% | 日期25% | 兴趣20% | 预算10% | 风格5%
 */
export const calculateMatchScore = (user, candidate) => {
  // 1. 目的地匹配 (权重40%)
  const destinationScore = user.destination === candidate.destination ? 40 : 0;
  
  // 2. 日期匹配 (权重25%)
  const dateDiff = getDateDifference(user.travelDate, candidate.travelDate);
  let dateScore = 0;
  if (dateDiff <= 1) dateScore = 25;
  else if (dateDiff <= 3) dateScore = 20;
  else if (dateDiff <= 5) dateScore = 15;
  
  // 3. 兴趣标签重合度 (权重20%)
  const commonTags = user.tags.filter(tag => 
    candidate.tags.includes(tag)
  );
  const tagsScore = Math.round(
    (commonTags.length / Math.max(user.tags.length, candidate.tags.length)) * 20
  );
  
  // 4. 预算匹配 (权重10%)
  const budgetDiff = Math.abs(user.budget - candidate.budget);
  const budgetScore = budgetDiff / Math.min(user.budget, candidate.budget) <= 0.1 ? 10 : 8;
  
  // 5. 出行风格匹配 (权重5%)
  const styleScore = user.travelStyle === candidate.travelStyle ? 5 : 3;
  
  // 综合评分
  const totalScore = destinationScore + dateScore + tagsScore + 
                    budgetScore + styleScore;
  
  return { totalScore, scores: {...}, reason: ... };
};`}
          </pre>
        </div>
      </Modal>

      {/* 标签选择全屏弹窗 */}
      <Modal
        isOpen={showTagModal}
        onClose={cancelTagSelection}
        title="选择兴趣标签"
        size="lg"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <p className="text-xs text-gray-500">最多选择8个标签</p>
          <div className="text-xs text-[#8B5CF6] font-medium">已选择 {tempSelectedTags.length}/8</div>

          {Object.entries(tagConfig).map(([category, tags]) => (
            <div key={category}>
              <div className="text-xs font-medium text-[#666] mb-2">{category}</div>
              <div className="flex gap-2 flex-wrap">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagFilter(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      tempSelectedTags.includes(tag)
                        ? 'bg-[#8B5CF6] text-white'
                        : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 底部按钮 */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
          <button
            onClick={cancelTagSelection}
            className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-full font-medium text-sm"
          >
            取消
          </button>
          <button
            onClick={confirmTagSelection}
            className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] text-white py-3 rounded-full font-medium text-sm"
          >
            确认
          </button>
        </div>
      </Modal>

      {/* MBTI人格选择弹窗 */}
      <Modal
        isOpen={showMBTIModal}
        onClose={() => setShowMBTIModal(false)}
        title="选择MBTI人格类型"
        size="lg"
      >
        <div className="space-y-4">
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(mbtiTypes).map(([type, info]) => (
                <button
                  key={type}
                  onClick={() => handleMBTIFilter(type)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    tempMBTITypes.includes(type)
                      ? 'bg-[#8B5CF6] text-white'
                      : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-bold mb-1">{type}</div>
                  <div className="text-[10px]">{info.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 底部按钮 */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
            <button
              onClick={cancelMBTISelection}
              className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-full font-medium text-sm"
            >
              取消
            </button>
            <button
              onClick={confirmMBTISelection}
              className="flex-1 bg-gradient-to-r from-[#4A90E2] to-[#8B5CF6] text-white py-3 rounded-full font-medium text-sm"
            >
              确认
            </button>
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

export default Search;
