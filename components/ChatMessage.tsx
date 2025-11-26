import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message, Sender } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === Sender.Bot;

  return (
    <div className={`flex w-full mb-4 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 
          ${isBot ? 'bg-indigo-100 text-indigo-600 mr-2' : 'bg-slate-200 text-slate-600 ml-2'}`}>
          {isBot ? <Bot size={18} /> : <User size={18} />}
        </div>

        {/* Message Bubble */}
        <div className={`
          p-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isBot 
            ? 'bg-white text-slate-800 border border-slate-100 rounded-tl-none' 
            : 'bg-indigo-600 text-white rounded-tr-none'
          }
          ${message.isError ? 'border-red-200 bg-red-50 text-red-800' : ''}
        `}>
          <div className="markdown-content">
            {/* Using ReactMarkdown to render formatting like bold, lists etc from Gemini */}
            <ReactMarkdown
              components={{
                p: ({node, ...props}) => <p className="mb-1 last:mb-0" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2" {...props} />,
                a: ({node, ...props}) => <a className="underline font-medium hover:text-indigo-200" target="_blank" rel="noopener noreferrer" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold" {...props} />
              }}
            >
              {message.text}
            </ReactMarkdown>
          </div>
          <span className={`text-[10px] mt-1 block opacity-70 ${isBot ? 'text-slate-400' : 'text-indigo-200'}`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

      </div>
    </div>
  );
};