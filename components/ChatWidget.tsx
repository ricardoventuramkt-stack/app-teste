import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Minimize2, Paperclip } from 'lucide-react';
import { useGeminiChat } from '../hooks/useGeminiChat';
import { ChatMessage } from './ChatMessage';
import { AgentConfig } from '../types';

interface ChatWidgetProps {
  config?: AgentConfig;
  defaultOpen?: boolean; // Useful for preview mode
  embeddedMode?: boolean; // If true, doesn't float (good for preview)
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ 
  config, 
  defaultOpen = false,
  embeddedMode = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [inputValue, setInputValue] = useState('');
  
  // Use passed config or defaults
  const botName = config?.botName || "Suporte TechNova";
  const welcomeMsg = config?.welcomeMessage || "Olá! Como posso ajudar você hoje?";
  const systemInstr = config?.systemInstruction;
  
  // Map simple color names to tailwind classes if needed, or use inline styles for dynamic colors
  // For simplicity, we stick to the indigo theme as base, but this could be dynamic
  const themeColorClass = "from-indigo-600 to-violet-600"; 
  const buttonColorClass = "bg-indigo-600 hover:bg-indigo-700";

  const { messages, isLoading, sendMessage } = useGeminiChat(systemInstr, welcomeMsg);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleOpen = () => {
    if (embeddedMode) return; // Cannot close in embedded mode
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Styles based on mode (Floating vs Embedded Preview)
  const containerClasses = embeddedMode 
    ? "w-full h-full flex flex-col bg-slate-50 rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    : `fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-8 sm:right-8`;

  const windowClasses = embeddedMode
    ? "flex-1 w-full flex flex-col h-full"
    : `transition-all duration-300 ease-in-out origin-bottom-right
       bg-slate-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200
       ${isOpen 
         ? 'w-[90vw] h-[80vh] sm:w-[380px] sm:h-[600px] opacity-100 scale-100 mb-4' 
         : 'w-0 h-0 opacity-0 scale-75'
       }`;

  return (
    <div className={embeddedMode ? "w-full h-full" : containerClasses}>
      {/* Chat Window */}
      <div className={windowClasses}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${themeColorClass} p-4 flex items-center justify-between shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                <MessageCircle size={20} />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-indigo-600 rounded-full"></span>
            </div>
            <div className="text-white">
              <h3 className="font-semibold text-sm">{botName}</h3>
              <p className="text-xs text-indigo-100 opacity-90">Sempre online</p>
            </div>
          </div>
          {!embeddedMode && (
            <button 
              onClick={toggleOpen}
              className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <Minimize2 size={18} />
            </button>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 scrollbar-hide">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs ml-2 mb-4 animate-pulse">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              <span className="ml-1 font-medium">{botName.split(' ')[0]} está digitando...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-100 shrink-0">
          <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2 border border-transparent focus-within:border-indigo-300 focus-within:bg-white transition-all">
            <button className="text-slate-400 hover:text-indigo-600 transition-colors">
              <Paperclip size={18} />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua dúvida..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={`
                p-2 rounded-full transition-all duration-200
                ${inputValue.trim() && !isLoading 
                  ? `${buttonColorClass} text-white shadow-md transform hover:scale-105 active:scale-95` 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }
              `}
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-center mt-2">
             <p className="text-[10px] text-slate-400">Desenvolvido com Google Gemini</p>
          </div>
        </div>
      </div>

      {/* Floating Buttons (Only in normal mode) */}
      {!embeddedMode && (
        <>
          <button
            onClick={toggleOpen}
            className={`
              flex items-center justify-center rounded-full shadow-lg transition-all duration-300 z-50
              bg-gradient-to-r ${themeColorClass} text-white hover:shadow-indigo-500/30
              ${isOpen 
                ? 'w-12 h-12 rotate-90 opacity-0 pointer-events-none absolute' 
                : 'w-14 h-14 sm:w-16 sm:h-16 hover:-translate-y-1'
              }
            `}
            aria-label="Abrir chat de suporte"
          >
            <MessageCircle size={28} className="sm:w-8 sm:h-8" />
          </button>

           <button
            onClick={toggleOpen}
            className={`
              flex items-center justify-center rounded-full shadow-lg transition-all duration-300 z-50
              bg-slate-200 text-slate-600 hover:bg-slate-300
              absolute bottom-0 right-0
              ${isOpen 
                ? 'w-12 h-12 rotate-0 opacity-100 scale-100' 
                : 'w-12 h-12 opacity-0 scale-50 pointer-events-none'
              }
            `}
            aria-label="Fechar chat"
          >
            <X size={24} />
          </button>
        </>
      )}

    </div>
  );
};