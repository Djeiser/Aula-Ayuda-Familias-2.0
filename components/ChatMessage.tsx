import React from 'react';
import { FriendlyBotIcon, FamilyIcon } from './IconComponents';
import type { Message } from '../types';

const renderText = (text: string) => {
  const html = text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="font-mono bg-slate-200 text-slate-800 text-sm rounded px-1 py-0.5">$1</code>')
    .replace(/\n/g, '<br />');
  return { __html: html };
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isModel = message.role === 'model';

  return (
    <div className={`flex items-start gap-3 md:gap-4 ${isModel ? '' : 'flex-row-reverse'}`}>
      <div className="flex-shrink-0 mt-1">
        {isModel ? <FriendlyBotIcon className="w-8 h-8" /> : <FamilyIcon className="w-8 h-8" />}
      </div>
      <div
        className={`max-w-xl lg:max-w-2xl px-4 py-3 rounded-2xl shadow-md ${
          isModel
            ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
            : 'bg-blue-600 text-white rounded-br-none'
        }`}
      >
        <div className="text-base leading-relaxed" dangerouslySetInnerHTML={renderText(message.text)} />
      </div>
    </div>
  );
};

export default ChatMessage;