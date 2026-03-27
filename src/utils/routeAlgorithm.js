/**
 * AI个性化路线规划算法
 * 基于用户需求，生成多套差异化旅行路线方案
 */

/**
 * 根据用户需求生成路线方案
 * @param {Object} requirements - 用户需求
 * @returns {Array} 路线方案列表
 */
export const generateRoutes = (requirements) => {
  const { destination, days, budget, tags, travelStyle } = requirements;
  
  // 根据用户标签和出行风格，从预设路线中筛选和排序
  const routes = getPredefinedRoutes(destination, days, budget, tags, travelStyle);
  
  // 为每条路线计算匹配度
  const routesWithScore = routes.map(route => ({
    ...route,
    matchScore: calculateRouteMatchScore(requirements, route),
    aiReason: generateRouteReason(requirements, route)
  }));
  
  // 按匹配度排序
  return routesWithScore.sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * 获取预设路线（实际项目中可以从数据库或API获取）
 * @param {string} destination - 目的地
 * @param {number} days - 天数
 * @param {number} budget - 预算
 * @param {Array} tags - 兴趣标签
 * @param {string} travelStyle - 出行风格
 * @returns {Array} 预设路线列表
 */
const getPredefinedRoutes = (destination, days, budget, tags, travelStyle) => {
  // 根据目的地返回预设路线
  if (destination === '西安') {
    return getXianRoutes(days, budget, tags, travelStyle);
  }
  
  // 其他目的地返回通用路线（示例）
  return [
    {
      id: 1,
      title: '经典游览路线',
      tags: ['文化'],
      totalBudget: budget * 0.9,
      days: days,
      highlights: ['核心景点', '美食探索'],
      itinerary: generateDefaultItinerary(days, destination)
    }
  ];
};

/**
 * 获取西安的预设路线
 */
const getXianRoutes = (days, budget, tags = [], travelStyle) => {
  // 计算预算范围，最多超出用户预算10%
  const maxBudget = budget * 1.1;

  const routes = [
    {
      id: 1,
      title: '美食深度游',
      tags: ['美食', '悠闲'],
      totalBudget: Math.round(Math.min(budget * 0.95, maxBudget)),
      days: 3,
      highlights: ['回民街美食探索', '洒金桥小吃天堂', '永兴坊必吃榜', '大唐不夜城夜市'],
      itinerary: [
        {
          day: 1,
          title: '钟鼓楼美食探索',
          attractions: ['钟鼓楼', '回民街', '化觉巷清真大寺'],
          meals: { breakfast: '腊汁肉夹馍', lunch: '羊肉泡馍', dinner: '灌汤包' },
          budget: Math.round(Math.min(budget * 0.95, maxBudget) * 0.33),
          notes: '上午逛钟鼓楼，中午品尝正宗羊肉泡馍，下午回民街各种小吃，晚上夜景观景'
        },
        {
          day: 2,
          title: '东市西市逛吃逛吃',
          attractions: ['小雁塔', '西安博物院', '大唐西市'],
          meals: { breakfast: '胡辣汤', lunch: '凉皮+肉夹馍', dinner: '烤肉串' },
          budget: Math.round(Math.min(budget * 0.95, maxBudget) * 0.31),
          notes: '小雁塔感受历史文化，中午西市美食街，下午西安博物院，晚上大唐西市夜市'
        },
        {
          day: 3,
          title: '新城老味',
          attractions: ['永兴坊', '曲江池', '大唐芙蓉园'],
          meals: { breakfast: '油茶麻花', lunch: 'biangbiang面', dinner: '三秦套餐' },
          budget: Math.round(Math.min(budget * 0.95, maxBudget) * 0.36),
          notes: '永兴坊必吃榜打卡，曲江池下午茶，大唐芙蓉园夜景，完美收官'
        }
      ]
    },
    {
      id: 2,
      title: '历史文化游',
      tags: ['文化', '深度游'],
      totalBudget: Math.round(Math.min(budget * 1.05, maxBudget)),
      days: 3,
      highlights: ['兵马俑世界奇迹', '古城墙骑行', '大雁塔佛教文化', '陕西历史博物馆'],
      itinerary: [
        {
          day: 1,
          title: '千年古都探索',
          attractions: ['兵马俑', '华清宫', '骊山'],
          meals: { breakfast: '早点套餐', lunch: '临潼特色小吃', dinner: '农家菜' },
          budget: Math.round(Math.min(budget * 1.05, maxBudget) * 0.34),
          notes: '兵马俑震撼世界，华清宫感受历史，骊山俯瞰整个临潼'
        },
        {
          day: 2,
          title: '城内文化之旅',
          attractions: ['西安古城墙', '书院门', '碑林博物馆', '德福巷'],
          meals: { breakfast: '肉丸胡辣汤', lunch: '葫芦头', dinner: '陕西菜' },
          budget: Math.round(Math.min(budget * 1.05, maxBudget) * 0.32),
          notes: '古城墙骑行俯瞰西安，书院门感受文人气息，碑林欣赏书法艺术'
        },
        {
          day: 3,
          title: '佛教文化深度',
          attractions: ['大雁塔', '大慈恩寺', '陕西历史博物馆', '大唐不夜城'],
          meals: { breakfast: '豆腐脑', lunch: '西安饭庄', dinner: '不夜城美食' },
          budget: Math.round(Math.min(budget * 1.05, maxBudget) * 0.34),
          notes: '大雁塔感受佛教文化，陕历博了解十三朝古都历史，不夜城完美收官'
        }
      ]
    },
    {
      id: 3,
      title: '网红打卡游',
      tags: ['摄影', '探店'],
      totalBudget: Math.round(Math.min(budget * 0.9, maxBudget)),
      days: 3,
      highlights: ['大唐不夜城汉服体验', '赛格美食街', '网红咖啡馆', '钟楼夜景'],
      itinerary: [
        {
          day: 1,
          title: '古韵新风',
          attractions: ['钟楼', '鼓楼', '回民街', '洒金桥'],
          meals: { breakfast: '早点套餐', lunch: '回民街小吃', dinner: '洒金桥夜市' },
          budget: Math.round(Math.min(budget * 0.9, maxBudget) * 0.31),
          notes: '钟楼鼓楼打卡拍照，回民街拍美食大片，洒金桥网红小吃'
        },
        {
          day: 2,
          title: '潮流聚集地',
          attractions: ['赛格国际购物中心', '民乐园步行街', '永兴坊', '大唐芙蓉园'],
          meals: { breakfast: '网红咖啡', lunch: '商场美食', dinner: '网红火锅' },
          budget: Math.round(Math.min(budget * 0.9, maxBudget) * 0.34),
          notes: '赛格购物打卡，民乐园潮流店铺，永兴坊网红店，芙蓉园夜景'
        },
        {
          day: 3,
          title: '穿越大唐',
          attractions: ['大唐不夜城', '大雁塔', '汉服体验馆', '曲江池'],
          meals: { breakfast: '古风早餐', lunch: '长安十二时辰', dinner: '不夜城夜市' },
          budget: Math.round(Math.min(budget * 0.9, maxBudget) * 0.35),
          notes: '大唐不夜城必打卡，大雁塔拍照，汉服体验穿越唐朝，曲江池下午茶'
        }
      ]
    }
  ];
  
  // 根据用户偏好筛选
  let filteredRoutes = routes;
  
  if (tags.includes('美食')) {
    filteredRoutes = filteredRoutes.filter(r => r.tags.includes('美食'));
  }
  
  if (tags.includes('文化')) {
    filteredRoutes = filteredRoutes.filter(r => r.tags.includes('文化'));
  }
  
  if (travelStyle === '悠闲') {
    filteredRoutes = filteredRoutes.filter(r => r.tags.includes('悠闲'));
  }
  
  // 如果没有匹配的，返回所有路线
  return filteredRoutes.length > 0 ? filteredRoutes : routes;
};

/**
 * 生成默认行程
 */
const generateDefaultItinerary = (days, destination) => {
  const itinerary = [];
  for (let i = 1; i <= days; i++) {
    itinerary.push({
      day: i,
      title: `第${i}天行程`,
      attractions: ['景点A', '景点B'],
      meals: {
        breakfast: '早餐',
        lunch: '午餐',
        dinner: '晚餐'
      },
      budget: Math.round(500 / days),
      notes: '详细行程安排'
    });
  }
  return itinerary;
};

/**
 * 计算路线匹配度
 */
const calculateRouteMatchScore = (requirements, route) => {
  let score = 70; // 基础分
  
  // 标签匹配
  const tagMatches = requirements.tags.filter(tag => route.tags.includes(tag)).length;
  score += tagMatches * 5;
  
  // 出行风格匹配
  if (route.tags.includes(requirements.travelStyle)) {
    score += 10;
  }
  
  // 预算匹配
  const budgetDiff = Math.abs(requirements.budget - route.totalBudget);
  if (budgetDiff / requirements.budget <= 0.1) {
    score += 10;
  } else if (budgetDiff / requirements.budget <= 0.2) {
    score += 5;
  }
  
  return Math.min(score, 100);
};

/**
 * 生成路线推荐理由
 */
const generateRouteReason = (requirements, route) => {
  const reasons = [];
  
  // 基于标签推荐
  const matchingTags = requirements.tags.filter(tag => route.tags.includes(tag));
  if (matchingTags.length > 0) {
    reasons.push(`基于您的${matchingTags.join('、')}偏好，优先安排了相关景点`);
  }
  
  // 基于出行风格推荐
  if (route.tags.includes(requirements.travelStyle)) {
    reasons.push(`行程节奏${requirements.travelStyle}，符合您的出行风格`);
  }
  
  // 基于预算推荐
  if (route.totalBudget <= requirements.budget) {
    reasons.push(`预算控制在${requirements.budget}元内，性价比极高`);
  }
  
  if (reasons.length === 0) {
    reasons.push('该路线综合评分较高，适合您的旅行需求');
  }
  
  return reasons.join('，') + '！';
};

/**
 * 模拟AI生成过程（用于演示）
 */
export const simulateRouteGeneration = async () => {
  const steps = [
    { text: 'AI正在分析您的需求...', duration: 600 },
    { text: '正在匹配目的地热门景点...', duration: 800 },
    { text: '正在规划行程节奏...', duration: 800 },
    { text: '正在核算预算明细...', duration: 600 },
    { text: '路线生成完成！', duration: 400 }
  ];
  
  for (const step of steps) {
    await new Promise(resolve => setTimeout(resolve, step.duration));
  }
  
  return true;
};
