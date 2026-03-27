/**
 * 主应用组件
 * 配置路由和全局布局
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import RoutePage from './pages/Route';
import Message from './pages/Message';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/route" element={<RoutePage />} />
      <Route path="/message" element={<Message />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
