/**
 * Mock数据 - 用于Demo演示
 * 全量采用前端静态数据，无需后端接口
 */

// 用户列表数据（用于匹配）
export const mockUsers = [
  {
    id: 1,
    name: '小林',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lin',
    school: '西安交通大学',
    gender: '女',
    age: 21,
    city: '西安',
    destination: '西安',
    travelDate: '2026-04-15',
    days: 3,
    budget: 500,
    budgetRange: '300-800',
    tags: ['美食', '摄影', '文化'],
    travelStyle: '悠闲',
    mbti: 'INFP',
    bio: '喜欢慢旅行，最爱探寻城市里的老味道',
    rating: 4.8,
    tripCount: 12,
    recentTrips: ['成都', '重庆', '长沙'],
    reviews: [
      { user: '阿杰', content: '非常靠谱的旅伴，攻略做得很细致！', date: '2026-03-01' },
      { user: '小雨', content: '人很好，相处愉快～', date: '2026-02-20' }
    ]
  },
  {
    id: 2,
    name: '阿杰',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jie',
    school: '西北大学',
    gender: '男',
    age: 22,
    city: '西安',
    destination: '西安',
    travelDate: '2026-04-14',
    days: 4,
    budget: 800,
    budgetRange: '500-1000',
    tags: ['户外', '摄影', '探店'],
    travelStyle: '紧凑',
    mbti: 'ESTP',
    bio: '热爱户外和摄影，喜欢深度探索',
    rating: 4.7,
    tripCount: 15,
    recentTrips: ['兰州', '西宁', '西安'],
    reviews: [
      { user: '小林', content: '摄影师级别，拍的照片超好看！', date: '2026-03-05' },
      { user: '大明', content: '执行力强，靠谱队友', date: '2026-02-28' }
    ]
  },
  {
    id: 3,
    name: '小美',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mei',
    school: '陕西师范大学',
    gender: '女',
    age: 20,
    city: '西安',
    destination: '西安',
    travelDate: '2026-04-16',
    days: 3,
    budget: 600,
    budgetRange: '300-800',
    tags: ['美食', '文化', '探店'],
    travelStyle: '悠闲',
    mbti: 'ESFP',
    bio: '吃货一枚，为了美食可以走遍整个城市',
    rating: 4.9,
    tripCount: 8,
    recentTrips: ['武汉', '南京', '西安'],
    reviews: [
      { user: '小林', content: '美食向导，跟着她吃遍整座城！', date: '2026-03-08' }
    ]
  },
  {
    id: 4,
    name: '大明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ming',
    school: '西安电子科技大学',
    gender: '男',
    age: 23,
    city: '西安',
    destination: '西安',
    travelDate: '2026-04-13',
    days: 2,
    budget: 400,
    budgetRange: '200-600',
    tags: ['摄影', '户外'],
    travelStyle: '紧凑',
    mbti: 'ISTJ',
    bio: '周末短途旅行爱好者，追求效率',
    rating: 4.6,
    tripCount: 20,
    recentTrips: ['华山', '宝鸡', '延安'],
    reviews: [
      { user: '阿杰', content: '时间观念强，适合紧凑行程', date: '2026-03-10' }
    ]
  },
  {
    id: 5,
    name: '小宇',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yu',
    school: '长安大学',
    gender: '女',
    age: 21,
    city: '西安',
    destination: '西安',
    travelDate: '2026-04-18',
    days: 3,
    budget: 700,
    budgetRange: '500-1000',
    tags: ['文化', '摄影', '美食'],
    travelStyle: '深度游',
    mbti: 'INFJ',
    bio: '历史迷，喜欢深度了解每个地方的文化',
    rating: 4.8,
    tripCount: 11,
    recentTrips: ['北京', '洛阳', '开封'],
    reviews: [
      { user: '小林', content: '博学多才，跟着她旅行收获满满！', date: '2026-03-12' }
    ]
  }
];

// 路线方案数据
export const mockRoutes = [
  {
    id: 1,
    title: '美食深度游',
    matchScore: 95,
    tags: ['美食', '悠闲'],
    totalBudget: 500,
    days: 3,
    highlights: ['回民街美食探索', '洒金桥小吃天堂', '永兴坊必吃榜', '大唐不夜城夜市'],
    itinerary: [
      {
        day: 1,
        title: '钟鼓楼美食探索',
        attractions: ['钟鼓楼', '回民街', '化觉巷清真大寺'],
        meals: { breakfast: '腊汁肉夹馍', lunch: '羊肉泡馍', dinner: '灌汤包' },
        budget: 150,
        notes: '上午逛钟鼓楼，中午品尝正宗羊肉泡馍，下午回民街各种小吃，晚上夜景观景'
      },
      {
        day: 2,
        title: '东市西市逛吃逛吃',
        attractions: ['小雁塔', '西安博物院', '大唐西市'],
        meals: { breakfast: '胡辣汤', lunch: '凉皮+肉夹馍', dinner: '烤肉串' },
        budget: 170,
        notes: '小雁塔感受历史文化，中午西市美食街，下午西安博物院，晚上大唐西市夜市'
      },
      {
        day: 3,
        title: '新城老味',
        attractions: ['永兴坊', '曲江池', '大唐芙蓉园'],
        meals: { breakfast: '油茶麻花', lunch: 'biangbiang面', dinner: '三秦套餐' },
        budget: 180,
        notes: '永兴坊必吃榜打卡，曲江池下午茶，大唐芙蓉园夜景，完美收官'
      }
    ],
    aiReason: '基于您的美食偏好，优先安排了回民街、洒金桥等本地美食聚集地，行程节奏悠闲，符合您的出行风格。预算控制在500元内，性价比极高！'
  },
  {
    id: 2,
    title: '历史文化游',
    matchScore: 88,
    tags: ['文化', '深度游'],
    totalBudget: 600,
    days: 3,
    highlights: ['兵马俑世界奇迹', '古城墙骑行', '大雁塔佛教文化', '陕西历史博物馆'],
    itinerary: [
      {
        day: 1,
        title: '千年古都探索',
        attractions: ['兵马俑', '华清宫', '骊山'],
        meals: { breakfast: '早点套餐', lunch: '临潼特色小吃', dinner: '农家菜' },
        budget: 200,
        notes: '兵马俑震撼世界，华清宫感受历史，骊山俯瞰整个临潼'
      },
      {
        day: 2,
        title: '城内文化之旅',
        attractions: ['西安古城墙', '书院门', '碑林博物馆', '德福巷'],
        meals: { breakfast: '肉丸胡辣汤', lunch: '葫芦头', dinner: '陕西菜' },
        budget: 200,
        notes: '古城墙骑行俯瞰西安，书院门感受文人气息，碑林欣赏书法艺术'
      },
      {
        day: 3,
        title: '佛教文化深度',
        attractions: ['大雁塔', '大慈恩寺', '陕西历史博物馆', '大唐不夜城'],
        meals: { breakfast: '豆腐脑', lunch: '西安饭庄', dinner: '不夜城美食' },
        budget: 200,
        notes: '大雁塔感受佛教文化，陕历博了解十三朝古都历史，不夜城完美收官'
      }
    ],
    aiReason: '考虑到您对文化感兴趣，重点安排了兵马俑、古城墙、陕西历史博物馆等文化地标，深度了解西安千年历史。同时结合您的摄影爱好，这些景点都非常出片！'
  },
  {
    id: 3,
    title: '网红打卡游',
    matchScore: 82,
    tags: ['摄影', '探店'],
    totalBudget: 550,
    days: 3,
    highlights: ['大唐不夜城汉服体验', '赛格美食街', '网红咖啡馆', '钟楼夜景'],
    itinerary: [
      {
        day: 1,
        title: '古韵新风',
        attractions: ['钟楼', '鼓楼', '回民街', '洒金桥'],
        meals: { breakfast: '早点套餐', lunch: '回民街小吃', dinner: '洒金桥夜市' },
        budget: 180,
        notes: '钟楼鼓楼打卡拍照，回民街拍美食大片，洒金桥网红小吃'
      },
      {
        day: 2,
        title: '潮流聚集地',
        attractions: ['赛格国际购物中心', '民乐园步行街', '永兴坊', '大唐芙蓉园'],
        meals: { breakfast: '网红咖啡', lunch: '商场美食', dinner: '网红火锅' },
        budget: 180,
        notes: '赛格购物打卡，民乐园潮流店铺，永兴坊网红店，芙蓉园夜景'
      },
      {
        day: 3,
        title: '穿越大唐',
        attractions: ['大唐不夜城', '大雁塔', '汉服体验馆', '曲江池'],
        meals: { breakfast: '古风早餐', lunch: '长安十二时辰', dinner: '不夜城夜市' },
        budget: 190,
        notes: '大唐不夜城必打卡，大雁塔拍照，汉服体验穿越唐朝，曲江池下午茶'
      }
    ],
    aiReason: '针对您的摄影和探店爱好，重点安排了大唐不夜城、赛格、永兴坊等网红打卡点，非常适合拍照发朋友圈！行程节奏适中，既有传统景点也有现代潮流。'
  }
];

// 聊天消息数据
export const mockChats = [
  {
    id: 1,
    userId: 1,
    userName: '小林',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lin',
    lastMessage: '好的，那我们具体时间再商量一下~',
    lastTime: '10:30',
    unread: 2,
    messages: [
      { id: 1, sender: 'me', content: '你好，看到你的旅行计划，我也想去西安，要不要一起？', time: '10:00' },
      { id: 2, sender: 'other', content: '你好呀！我看到你的需求，我们目的地和时间都比较匹配呢～', time: '10:05' },
      { id: 3, sender: 'me', content: '是的！我计划4月15日去，玩3天，预算2000左右，喜欢美食和摄影', time: '10:08' },
      { id: 4, sender: 'other', content: '太巧了！我也是差不多的计划，而且我也超爱美食！', time: '10:12' },
      { id: 5, sender: 'me', content: '那我们具体聊聊吧，你想住哪里？', time: '10:25' },
      { id: 6, sender: 'other', content: '好的，那我们具体时间再商量一下~', time: '10:30' }
    ]
  },
  {
    id: 2,
    userId: 2,
    userName: '阿杰',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jie',
    lastMessage: '我也要去西安，一起吧！',
    lastTime: '昨天',
    unread: 0,
    messages: [
      { id: 1, sender: 'other', content: '你好，看到你的需求，我们的目的地和兴趣都比较匹配', time: '昨天 14:00' },
      { id: 2, sender: 'me', content: '你好！是的，我也在找去西安的旅伴', time: '昨天 14:05' },
      { id: 3, sender: 'other', content: '我也要去西安，一起吧！', time: '昨天 14:10' }
    ]
  }
];

// 个人数据
export const mockUserProfile = {
  id: 999,
  name: '我',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
  school: '西安交通大学',
  gender: '女',
  age: 21,
  city: '西安',
  bio: '热爱旅行，喜欢结交新朋友',
  tags: ['美食', '摄影', '文化'],
  travelStyle: '悠闲',
  tripCount: 6,
  favoriteDestinations: ['成都', '重庆', '长沙'],
  rating: 4.9,
  aiInsight: {
    summary: '您的出行风格为悠闲型，最关注美食类目的地，预算集中在300-800元，偏好3天左右的短途旅行。您擅长美食探索，对历史文化也有浓厚兴趣。',
    styleDistribution: [
      { name: '悠闲', value: 60 },
      { name: '紧凑', value: 20 },
      { name: '深度游', value: 20 }
    ],
    interestDistribution: [
      { name: '美食', value: 50 },
      { name: '摄影', value: 30 },
      { name: '文化', value: 20 }
    ],
    budgetRange: '300-800元',
    preferredDuration: '3天',
    recommendations: [
      { type: 'destination', name: '兰州', reason: '美食天堂，适合您的悠闲风格' },
      { type: 'destination', name: '成都', reason: '美食与文化并重，高匹配度' },
      { type: 'destination', name: '武汉', reason: '网红美食多，适合拍照' },
      { type: 'route', name: '成都3日美食游', matchScore: 92 },
      { type: 'route', name: '兰州2日深度游', matchScore: 88 }
    ]
  }
};

// 热门目的地数据
export const mockDestinations = [
  { id: 1, name: '西安', image: 'https://picsum.photos/seed/xian/400/300', tags: ['历史文化', '美食'], popularity: 9.5 },
  { id: 2, name: '成都', image: 'https://picsum.photos/seed/chengdu/400/300', tags: ['美食', '悠闲'], popularity: 9.3 },
  { id: 3, name: '重庆', image: 'https://picsum.photos/seed/chongqing/400/300', tags: ['网红', '美食'], popularity: 9.2 },
  { id: 4, name: '兰州', image: 'https://picsum.photos/seed/lanzhou/400/300', tags: ['美食', '文化'], popularity: 8.8 },
  { id: 5, name: '武汉', image: 'https://picsum.photos/seed/wuhan/400/300', tags: ['美食', '高校'], popularity: 8.5 }
];

// 优惠套餐数据
export const mockPackages = [
  { id: 1, title: '西安双人套餐', originalPrice: 3999, discountPrice: 2999, tags: ['热门', '优惠'], endDate: '2026-04-30' },
  { id: 2, title: '成都美食之旅', originalPrice: 3499, discountPrice: 2699, tags: ['美食'], endDate: '2026-05-15' },
  { id: 3, title: '重庆网红打卡', originalPrice: 3299, discountPrice: 2499, tags: ['网红'], endDate: '2026-04-20' }
];
