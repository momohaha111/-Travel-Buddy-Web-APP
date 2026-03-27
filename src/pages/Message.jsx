/**
 * 消息页 - 基础聊天交互功能
 * 聊天会话列表、一对一聊天、AI智能助手
 */
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { mockChats, mockUsers } from '../data/mockData';
import PhoneFrame from '../components/PhoneFrame';
import Modal from '../components/Modal';
import Toast from '../components/Toast';

const Message = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });
  
  // AI智能助手快捷问题
  const quickQuestions = [
    '你计划哪天出发？',
    '你的预算大概是多少？',
    '你有什么必去的景点吗？',
    '你喜欢什么样的行程节奏？'
  ];
  
  // 模拟自动回复
  const autoReplies = [
    '我也计划差不多的时候出发，时间很合适呢！',
    '我的预算在2000左右，和你差不多～',
    '我特别想去兵马俑和回民街，你呢？',
    '我比较喜欢悠闲一点的节奏，慢慢逛',
    '听起来不错，我们可以在出发前再详细聊聊！'
  ];
  
  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: 'success' });
    }, 2000);
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // 添加消息
    const message = {
      id: Date.now(),
      sender: 'me',
      content: newMessage,
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    
    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, message],
      lastMessage: newMessage,
      lastTime: message.time
    });
    
    setNewMessage('');
    
    // 模拟对方自动回复
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        sender: 'other',
        content: autoReplies[Math.floor(Math.random() * autoReplies.length)],
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      };
      
      setActiveChat({
        ...activeChat,
        messages: [...activeChat.messages, message, replyMessage],
        lastMessage: replyMessage.content,
        lastTime: replyMessage.time
      });
    }, 1500);
  };
  
  const handleQuickQuestion = (question) => {
    setNewMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  // 检查是否有传入的用户ID，如果有则直接打开对应的聊天
  useEffect(() => {
    if (location.state?.targetUserId) {
      const targetChat = mockChats.find(chat => chat.userId === location.state.targetUserId);
      if (targetChat) {
        setActiveChat(targetChat);
      } else {
        // 如果没有找到现成的聊天记录，从 mockUsers 创建一个新的聊天对象
        const targetUser = mockUsers.find(user => user.id === location.state.targetUserId);
        if (targetUser) {
          const newChat = {
            id: Date.now(),
            userId: targetUser.id,
            userName: targetUser.name,
            avatar: targetUser.avatar,
            lastMessage: '',
            lastTime: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
            unread: 0,
            messages: []
          };
          setActiveChat(newChat);
        }
      }
    }
  }, [location.state]);
  
  return (
    <PhoneFrame>
      {/* 聊天列表页 */}
      {!activeChat ? (
          <>
            {/* 头部 */}
            <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
              <h1 className="text-xl font-bold text-[#333]">消息</h1>
            </div>
            
            {/* 聊天列表 */}
            <div className="px-4 py-3">
              <div className="space-y-3">
                {mockChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="bg-white rounded-xl p-4 shadow-card cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setActiveChat(chat)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={chat.avatar}
                          alt={chat.userName}
                          className="w-14 h-14 rounded-full"
                        />
                        {chat.unread > 0 && (
                          <div className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {chat.unread}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#333]">{chat.userName}</span>
                          <span className="text-xs text-gray-400">{chat.lastTime}</span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* 聊天详情页 */
          <>
            {/* 头部 */}
            <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center gap-3">
              <button
                onClick={() => setActiveChat(null)}
                className="text-[#333]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <img
                src={activeChat.avatar}
                alt={activeChat.userName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <h2 className="font-bold text-[#333]">{activeChat.userName}</h2>
                <p className="text-xs text-[#10B981]">在线</p>
              </div>
            </div>
            
            {/* 安全提示 */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mx-4 mt-4 rounded-r-lg">
              <p className="text-xs text-yellow-700">
                ⚠️ 请保护个人隐私，线下出行注意安全
              </p>
            </div>
            
            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ height: 'calc(100vh - 280px)' }}>
              {activeChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      message.sender === 'me'
                        ? 'bg-[#FF6B6B] text-white rounded-br-none'
                        : 'bg-gray-200 text-[#333] rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-white text-opacity-70' : 'text-gray-500'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* AI智能助手快捷问题 */}
            <div className="px-4 pb-2">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="flex-shrink-0 bg-[#8B5CF6] bg-opacity-10 text-[#8B5CF6] px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap"
                  >
                    🤖 {question}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 输入框 */}
            <div className="bg-white p-4 border-t border-gray-200 sticky bottom-16">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="输入消息..."
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#4A90E2]"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-[#4A90E2] text-white px-4 py-2 rounded-full text-sm font-medium"
                >
                  发送
                </button>
              </div>
            </div>
          </>
        )}

        {/* 底部占位 */}
        {!activeChat && <div className="h-20"></div>}

        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
        />
        />
      </PhoneFrame>
  );
};

export default Message;
