import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useChat } from '../context/ChatContext';
import { useLoading } from '../context/LoadingContext';
import { getUserInfo } from '../utils/api';

function Chat() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const { conversations, messages, loadMessages, sendMessage, setMessages } = useChat();
  const { withLoading } = useLoading();
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    
    if (!userInfo) {
      navigate('/auth');
      return;
    }
    
    
    if (conversationId) {
      withLoading(loadMessages(conversationId));
    }
    
    
    
  }, [conversationId, navigate, userInfo?._id, withLoading, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const activeConv = conversations.find((c) => c._id === conversationId);

  const getOtherParticipant = (conv) => {
    if (!conv?.participants) return null;
    return conv.participants.find((p) => p._id !== userInfo._id);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() || !conversationId) return;
    setSending(true);
    sendMessage(conversationId, text.trim());
    setMessages((prev) => [
      ...prev,
      {
        _id: `temp-${Date.now()}`,
        text: text.trim(),
        sender: { _id: userInfo._id, name: userInfo.name },
        createdAt: new Date().toISOString(),
      },
    ]);
    setText('');
    setSending(false);
  };

  if (!userInfo) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-extrabold text-slate-900 mb-6">Messages</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-220px)] min-h-[480px]">
        {}
        <div className="md:col-span-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 font-semibold text-slate-700">Conversations</div>
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <p className="p-4 text-sm text-slate-500 text-center">No conversations yet. Chat with a seller from a product page.</p>
            ) : (
              conversations.map((conv) => {
                const other = getOtherParticipant(conv);
                const isActive = conv._id === conversationId;
                return (
                  <Link
                    key={conv._id}
                    to={`/chat/${conv._id}`}
                    className={`block p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors ${isActive ? 'bg-brand-50 border-l-4 border-l-brand-900' : ''}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 truncate">{other?.name || 'User'}</p>
                        <p className="text-xs text-slate-500 truncate">{conv.product?.title}</p>
                        <p className="text-xs text-slate-400 mt-1 truncate">{conv.lastMessage || 'No messages yet'}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="shrink-0 min-w-[20px] h-5 px-1 flex items-center justify-center bg-red-500 text-white text-xs font-bold rounded-full">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
          {!conversationId ? (
            <div className="flex-1 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <div className="text-5xl mb-3">💬</div>
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-slate-100">
                <p className="font-semibold text-slate-800">{getOtherParticipant(activeConv)?.name}</p>
                <p className="text-xs text-slate-500">Re: {activeConv?.product?.title}</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
                {messages.map((msg) => {
                  const isMine = msg.sender?._id === userInfo._id || msg.sender === userInfo._id;
                  return (
                    <div key={msg._id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                        isMine
                          ? 'bg-brand-900 text-white rounded-br-md'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={handleSend} className="p-4 border-t border-slate-100 flex gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Type a message..."
                  className="input-field flex-1"
                />
                <button type="submit" disabled={sending || !text.trim()} className="btn-primary !px-4">
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
