/**
 * 底部Tab导航组件
 * 固定在手机框底部
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    {
      id: 'home',
      icon: (
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="homeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90E2" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="homeShadow">
              <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#4A90E2" floodOpacity="0.3"/>
            </filter>
          </defs>
          <path d="M8 20V40C8 42.2091 9.79086 44 12 44H36C38.2091 44 40 42.2091 40 40V20" stroke="url(#homeGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#homeShadow)"/>
          <path d="M8 20L24 6L40 20" stroke="url(#homeGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#homeShadow)"/>
          <path d="M18 30H30" stroke="url(#homeGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: '首页',
      path: '/'
    },
    {
      id: 'search',
      icon: (
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="searchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90E2" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="searchShadow">
              <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#4A90E2" floodOpacity="0.3"/>
            </filter>
          </defs>
          <circle cx="20" cy="20" r="12" stroke="url(#searchGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#searchShadow)"/>
          <path d="M30 30L42 42" stroke="url(#searchGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#searchShadow)"/>
        </svg>
      ),
      label: '搜索',
      path: '/search'
    },
    {
      id: 'route',
      icon: (
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90E2" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="routeShadow">
              <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#4A90E2" floodOpacity="0.3"/>
            </filter>
          </defs>
          <path d="M12 8C8.68629 8 6 10.6863 6 14C6 17.3137 8.68629 20 12 20" stroke="url(#routeGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#routeShadow)"/>
          <path d="M12 20H36C39.3137 20 42 22.6863 42 26C42 29.3137 39.3137 32 36 32H20" stroke="url(#routeGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M36 32C39.3137 32 42 34.6863 42 38C42 41.3137 39.3137 44 36 44" stroke="url(#routeGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="8" r="5" fill="url(#routeGrad)" filter="url(#routeShadow)"/>
          <circle cx="36" cy="44" r="5" fill="url(#routeGrad)" filter="url(#routeShadow)"/>
        </svg>
      ),
      label: '路线',
      path: '/route'
    },
    {
      id: 'message',
      icon: (
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="messageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90E2" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="messageShadow">
              <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#4A90E2" floodOpacity="0.3"/>
            </filter>
          </defs>
          <path d="M4 8C4 5.79086 5.79086 4 8 4H40C42.2091 4 44 5.79086 44 8V36C44 38.2091 42.2091 40 40 40H24L4 48V8Z" stroke="url(#messageGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#messageShadow)"/>
          <path d="M14 20H34" stroke="url(#messageGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 28H28" stroke="url(#messageGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: '消息',
      path: '/message'
    },
    {
      id: 'profile',
      icon: (
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="profileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A90E2" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <filter id="profileShadow">
              <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#4A90E2" floodOpacity="0.3"/>
            </filter>
          </defs>
          <circle cx="24" cy="16" r="8" stroke="url(#profileGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#profileShadow)"/>
          <path d="M4 44C4 34.0589 12.0589 26 22 26H26C35.9411 26 44 34.0589 44 44" stroke="url(#profileGrad)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: '我的',
      path: '/profile'
    },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-16">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${
                isActive ? 'text-[#4A90E2]' : 'text-[#999999]'
              }`}
            >
              <span className="mb-1 opacity-100 transition-opacity">
                {React.cloneElement(item.icon, {
                  style: { opacity: isActive ? 1 : 0.4 }
                })}
              </span>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
