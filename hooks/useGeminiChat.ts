import { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, Sender } from '../types';

const DEFAULT_INSTRUCTION = `
Você é a um assistente virtual de suporte ao cliente inteligente, empática e eficiente.

Diretrizes:
1. Seu tom deve ser profissional, mas amigável e acessível.
2. Responda de forma concisa.
3. Se você não souber a resposta, admita educadamente e sugira contato humano.
4. Você fala português brasileiro fluentemente.
`;

export const useGeminiChat = (
  customSystemInstruction?: string, 
  initialWelcomeMessage?: string
) => {
  // Use user-provided instruction or fallback to default
  const systemInstruction = customSystemInstruction || DEFAULT_INSTRUCTION;
  const welcomeText = initialWelcomeMessage || 'Olá! Como posso ajudar você hoje?';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      text: welcomeText,
      sender: Sender.Bot,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Ref to hold the chat session instance
  const chatSessionRef = useRef<Chat | null>(null);

  // Reset chat when instructions change (important for the training preview)
  useEffect(() => {
    chatSessionRef.current = null;
    setMessages([{
      id: `welcome-${Date.now()}`,
      text: welcomeText,
      sender: Sender.Bot,
      timestamp: new Date()
    }]);
  }, [customSystemInstruction, welcomeText]);

  // Initialize the chat session
  const getChatSession = useCallback(() => {
    if (!chatSessionRef.current) {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        console.error("API_KEY is missing");
        return null;
      }
      
      const ai = new GoogleGenAI({ apiKey });
      chatSessionRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemInstruction,
        },
      });
    }
    return chatSessionRef.current;
  }, [systemInstruction]);

  const sendMessage = useCallback(async (text: string) => {
    // Add user message immediately
    const userMsgId = Date.now().toString();
    const newUserMsg: Message = {
      id: userMsgId,
      text: text,
      sender: Sender.User,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      const chat = getChatSession();
      
      if (!chat) {
        throw new Error("Não foi possível conectar ao serviço de IA.");
      }

      // Create a placeholder for the bot message to stream into
      const botMsgId = (Date.now() + 1).toString();
      setMessages(prev => [
        ...prev,
        {
          id: botMsgId,
          text: '', // Start empty
          sender: Sender.Bot,
          timestamp: new Date()
        }
      ]);

      const result = await chat.sendMessageStream({ message: text });
      
      let fullText = '';
      
      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const chunkText = c.text;
        
        if (chunkText) {
          fullText += chunkText;
          // Update the specific message in state with the new chunk
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMsgId 
                ? { ...msg, text: fullText } 
                : msg
            )
          );
        }
      }

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "Desculpe, estou com dificuldades de conexão no momento. Tente novamente mais tarde.",
          sender: Sender.Bot,
          timestamp: new Date(),
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [getChatSession]);

  return {
    messages,
    isLoading,
    sendMessage
  };
};