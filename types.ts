
export enum Sender {
  User = 'user',
  Bot = 'bot'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
  isError?: boolean;
}

export interface ChatState {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
}

// Novos tipos para o Dashboard e Configuração
export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'online' | 'offline';
  source: 'Web' | 'WhatsApp' | 'Instagram';
}

export interface ChatSession {
  contactId: string;
  messages: Message[];
}

export interface AgentConfig {
  botName: string;
  welcomeMessage: string;
  primaryColor: string; // Tailwind class name or hex
  systemInstruction: string; // O "cérebro" do agente
  projectApiKey: string; // A chave pública do projeto para integração
}

export type ViewState = 'landing' | 'auth' | 'admin';
