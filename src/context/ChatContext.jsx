import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import { API_URL, getUserInfo, apiFetch } from '../utils/api';

const ChatContext = createContext();

function showBrowserNotification(title, body) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/favicon.svg' });
  }
}

export function ChatProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const activeConvRef = useRef(null);
  const userInfo = getUserInfo();

  activeConvRef.current = activeConversationId;

  const fetchUnreadCount = useCallback(async () => {
    if (!userInfo?.token) return;
    try {
      const res = await apiFetch('/api/chat/unread');
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unreadCount);
      }
    } catch (err) {
      console.error('Unread count error:', err);
    }
  }, [userInfo?.token]);

  const fetchConversations = useCallback(async () => {
    if (!userInfo?.token) return;
    try {
      const res = await apiFetch('/api/chat/conversations');
      if (res.ok) {
        const data = await res.json();
        setConversations(data);
        const total = data.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
        setUnreadCount(total);
      }
    } catch (err) {
      console.error('Conversations error:', err);
    }
  }, [userInfo?.token]);

  useEffect(() => {
    if (!userInfo?.token) return;

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    fetchUnreadCount();
    fetchConversations();

    const socket = io(API_URL, {
      auth: { token: userInfo.token },
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    socket.on('new_message', ({ message, conversationId }) => {
      if (activeConvRef.current === conversationId) {
        setMessages((prev) => {
          if (prev.some((m) => m._id === message._id)) return prev;
          const withoutTemp = prev.filter((m) => !String(m._id).startsWith('temp-') || m.text !== message.text);
          return [...withoutTemp, message];
        });
      } else {
        setUnreadCount((c) => c + 1);
        setConversations((prev) =>
          prev.map((c) =>
            c._id === conversationId
              ? { ...c, lastMessage: message.text, lastMessageAt: message.createdAt, unreadCount: (c.unreadCount || 0) + 1 }
              : c
          )
        );
      }
    });

    socket.on('chat_notification', ({ message, senderName }) => {
      showBrowserNotification(
        `New message from ${senderName}`,
        message.text
      );
    });

    socket.on('messages_read', ({ conversationId }) => {
      setConversations((prev) =>
        prev.map((c) => (c._id === conversationId ? { ...c, unreadCount: 0 } : c))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [userInfo?.token, fetchUnreadCount, fetchConversations]);

  const loadMessages = useCallback(async (conversationId) => {
    setActiveConversationId(conversationId);
    const res = await apiFetch(`/api/chat/conversations/${conversationId}/messages`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
      
      
      setConversations((prev) => {
        const conv = prev.find((x) => x._id === conversationId);
        
        
        if (conv && conv.unreadCount > 0) {
          setUnreadCount((c) => Math.max(0, c - conv.unreadCount));
        }
        
        
        return prev.map((c) => (c._id === conversationId ? { ...c, unreadCount: 0 } : c));
      });
      
      socketRef.current?.emit('mark_read', { conversationId });
    }
  }, []); 

  const sendMessage = useCallback((conversationId, text) => {
    socketRef.current?.emit('send_message', { conversationId, text });
  }, []);

  const startConversation = useCallback(async (productId) => {
    const res = await apiFetch('/api/chat/conversations', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
    if (res.ok) {
      const conv = await res.json();
      await fetchConversations();
      return conv;
    }
    const err = await res.json();
    throw new Error(err.message || 'Failed to start chat');
  }, [fetchConversations]);

  return (
    <ChatContext.Provider value={{
      conversations,
      messages,
      unreadCount,
      activeConversationId,
      fetchConversations,
      loadMessages,
      sendMessage,
      startConversation,
      setActiveConversationId,
      setMessages,
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChat must be used within ChatProvider');
  return ctx;
}
