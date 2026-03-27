/**
 * AI智能旅伴匹配算法
 * 基于加权计算规则，实现旅行搭子的智能匹配
 * 权重分配：
 * - 目的地匹配：40%
 * - 出行日期匹配：25%
 * - 兴趣标签重合度：20%
 * - 预算范围匹配：10%
 * - 出行风格匹配：5%
 */

/**
 * 计算两个日期的天数差
 * @param {string} date1 - 日期1 (YYYY-MM-DD)
 * @param {string} date2 - 日期2 (YYYY-MM-DD)
 * @returns {number} 天数差绝对值
 */
export const getDateDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d1 - d2);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * 计算目的地的匹配分数
 * 权重：40%
 * @param {string} userDestination - 用户目的地
 * @param {string} candidateDestination - 候选者目的地
 * @returns {number} 匹配分数 (0-40)
 */
export const calculateDestinationScore = (userDestination, candidateDestination) => {
  if (!userDestination || !candidateDestination) return 0;
  // 完全匹配
  if (userDestination === candidateDestination) return 40;
  // 不匹配
  return 0;
};

/**
 * 计算出行日期的匹配分数
 * 权重：25%
 * @param {string} userDate - 用户出行日期
 * @param {string} candidateDate - 候选者出行日期
 * @returns {number} 匹配分数 (0-25)
 */
export const calculateDateScore = (userDate, candidateDate) => {
  if (!userDate || !candidateDate) return 0;
  
  const diffDays = getDateDifference(userDate, candidateDate);
  
  // 完全匹配或相差1天以内
  if (diffDays <= 1) return 25;
  // 相差2-3天
  if (diffDays <= 3) return 20;
  // 相差4-5天
  if (diffDays <= 5) return 15;
  // 相差6-7天
  if (diffDays <= 7) return 10;
  // 相差7天以上
  return 5;
};

/**
 * 计算兴趣标签的重合度分数
 * 权重：20%
 * @param {string[]} userTags - 用户兴趣标签
 * @param {string[]} candidateTags - 候选者兴趣标签
 * @returns {number} 匹配分数 (0-20)
 */
export const calculateTagsScore = (userTags = [], candidateTags = []) => {
  if (userTags.length === 0 || candidateTags.length === 0) return 0;
  
  // 找出共同的标签
  const commonTags = userTags.filter(tag => candidateTags.includes(tag));
  
  // 计算重合度
  const totalTags = Math.max(userTags.length, candidateTags.length);
  const overlapRatio = commonTags.length / totalTags;
  
  // 返回分数 (0-20)
  return Math.round(overlapRatio * 20);
};

/**
 * 计算预算范围的匹配分数
 * 权重：10%
 * @param {number} userBudget - 用户预算
 * @param {number} candidateBudget - 候选者预算
 * @returns {number} 匹配分数 (0-10)
 */
export const calculateBudgetScore = (userBudget, candidateBudget) => {
  if (!userBudget || !candidateBudget) return 0;
  
  const budgetDiff = Math.abs(userBudget - candidateBudget);
  const minBudget = Math.min(userBudget, candidateBudget);
  
  // 预算差异在10%以内
  if (budgetDiff / minBudget <= 0.1) return 10;
  // 预算差异在20%以内
  if (budgetDiff / minBudget <= 0.2) return 8;
  // 预算差异在30%以内
  if (budgetDiff / minBudget <= 0.3) return 5;
  // 预算差异超过30%
  return 2;
};

/**
 * 计算出行风格的匹配分数
 * 权重：5%
 * @param {string} userStyle - 用户出行风格
 * @param {string} candidateStyle - 候选者出行风格
 * @returns {number} 匹配分数 (0-5)
 */
export const calculateStyleScore = (userStyle, candidateStyle) => {
  if (!userStyle || !candidateStyle) return 0;
  
  // 完全匹配
  if (userStyle === candidateStyle) return 5;
  
  // 部分匹配（悠闲 vs 深度游，紧凑 vs 深度游）
  const styleMap = {
    '悠闲': ['悠闲', '深度游'],
    '紧凑': ['紧凑'],
    '深度游': ['深度游', '悠闲']
  };
  
  if (styleMap[userStyle]?.includes(candidateStyle)) return 3;
  
  return 1;
};

/**
 * 生成AI推荐理由
 * @param {Object} scores - 各维度得分
 * @param {Object} user - 用户信息
 * @param {Object} candidate - 候选者信息
 * @returns {string} 推荐理由文本
 */
export const generateReason = (scores, user, candidate) => {
  const reasons = [];
  
  // 目的地匹配
  if (scores.destination === 40) {
    reasons.push(`✓ 目的地完全匹配（${candidate.destination}）`);
  }
  
  // 日期匹配
  if (scores.date >= 20) {
    reasons.push(`✓ 出行时间高度契合（相差${getDateDifference(user.travelDate, candidate.travelDate)}天）`);
  } else if (scores.date >= 10) {
    reasons.push(`✓ 出行时间基本匹配（相差${getDateDifference(user.travelDate, candidate.travelDate)}天）`);
  }
  
  // 兴趣标签匹配
  if (scores.tags >= 15) {
    const commonTags = user.tags.filter(tag => candidate.tags.includes(tag));
    reasons.push(`✓ ${Math.round((commonTags.length / Math.max(user.tags.length, candidate.tags.length)) * 100)}%兴趣标签重合（${commonTags.join('、')}）`);
  } else if (scores.tags >= 10) {
    const commonTags = user.tags.filter(tag => candidate.tags.includes(tag));
    reasons.push(`✓ ${Math.round((commonTags.length / Math.max(user.tags.length, candidate.tags.length)) * 100)}%兴趣标签重合（${commonTags.join('、')}）`);
  }
  
  // 预算匹配
  if (scores.budget >= 8) {
    reasons.push(`✓ 预算范围高度匹配`);
  } else if (scores.budget >= 5) {
    reasons.push(`✓ 预算范围基本匹配`);
  }
  
  // 出行风格匹配
  if (scores.style === 5) {
    reasons.push(`✓ 出行风格完全一致（${candidate.travelStyle}）`);
  }
  
  return reasons.join('\n');
};

/**
 * 计算综合匹配度
 * @param {Object} user - 用户需求信息
 * @param {Object} candidate - 候选者信息
 * @returns {Object} 包含总分和各维度得分的对象
 */
export const calculateMatchScore = (user, candidate) => {
  // 计算各维度得分
  const destinationScore = calculateDestinationScore(
    user.destination || user.city,
    candidate.destination || candidate.city
  );
  
  const dateScore = calculateDateScore(
    user.travelDate,
    candidate.travelDate
  );
  
  const tagsScore = calculateTagsScore(
    user.tags,
    candidate.tags
  );
  
  const budgetScore = calculateBudgetScore(
    user.budget,
    candidate.budget
  );
  
  const styleScore = calculateStyleScore(
    user.travelStyle,
    candidate.travelStyle
  );
  
  // 计算总分 (0-100)
  const totalScore = destinationScore + dateScore + tagsScore + budgetScore + styleScore;
  
  // 生成推荐理由
  const reason = generateReason(
    {
      destination: destinationScore,
      date: dateScore,
      tags: tagsScore,
      budget: budgetScore,
      style: styleScore
    },
    user,
    candidate
  );
  
  return {
    totalScore,
    scores: {
      destination: destinationScore,
      date: dateScore,
      tags: tagsScore,
      budget: budgetScore,
      style: styleScore
    },
    reason
  };
};

/**
 * 智能匹配旅伴（主函数）
 * @param {Object} userRequirements - 用户需求
 * @param {Array} candidates - 候选者列表
 * @returns {Array} 按匹配度排序的候选者列表
 */
export const matchTravelCompanions = (userRequirements, candidates) => {
  const candidatesWithScore = candidates.map(candidate => {
    const matchResult = calculateMatchScore(userRequirements, candidate);
    return {
      ...candidate,
      ...matchResult
    };
  });
  
  // 按匹配度从高到低排序
  return candidatesWithScore.sort((a, b) => b.totalScore - a.totalScore);
};
