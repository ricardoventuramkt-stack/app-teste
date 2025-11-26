
import React, { useState } from 'react';
import { 
  MessageSquare, 
  Settings, 
  Users, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  CheckCheck,
  Code,
  Copy,
  LayoutTemplate,
  ExternalLink,
  Bot,
  BrainCircuit,
  Palette,
  Save,
  RefreshCw,
  Key,
  ShieldCheck
} from 'lucide-react';
import { Contact, Message, Sender, AgentConfig } from '../types';
import { ChatMessage } from './ChatMessage';
import { ChatWidget } from './ChatWidget';

// Dados simulados para demonstração
const MOCK_CONTACTS: Contact[] = [
  { id: '1', name: 'Visitante #4829', avatar: 'https://i.pravatar.cc/150?u=1', lastMessage: 'Gostaria de saber sobre preços.', time: '10:42', unread: 2, status: 'online', source: 'Web' },
  { id: '2', name: 'Mariana Costa', avatar: 'https://i.pravatar.cc/150?u=2', lastMessage: 'Obrigada pela ajuda!', time: 'Ontem', unread: 0, status: 'offline', source: 'WhatsApp' },
  { id: '3', name: 'João Silva', avatar: 'https://i.pravatar.cc/150?u=3', lastMessage: 'Meu pedido ainda não chegou.', time: 'Ontem', unread: 0, status: 'offline', source: 'Web' },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  '1': [
    { id: 'm1', text: 'Olá, bom dia.', sender: Sender.User, timestamp: new Date(Date.now() - 1000 * 60 * 60) },
    { id: 'm2', text: 'Olá! Sou a Sofia. Como posso ajudar?', sender: Sender.Bot, timestamp: new Date(Date.now() - 1000 * 60 * 59) },
    { id: 'm3', text: 'Gostaria de saber sobre preços para empresas.', sender: Sender.User, timestamp: new Date(Date.now() - 1000 * 60 * 5) },
  ]
};

const DEFAULT_SYSTEM_INSTRUCTION = `Você é um assistente virtual da empresa TechNova.
Seus objetivos são:
1. Responder dúvidas sobre nossos planos SaaS.
2. Agendar demonstrações técnicas.
3. Ser cordial e direto.

Informações da Empresa:
- Planos começam em R$99/mês.
- Atendemos 24/7.
- Garantia de 30 dias de reembolso.`;

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chats' | 'training' | 'settings' | 'integration'>('chats');
  const [selectedContact, setSelectedContact] = useState<Contact>(MOCK_CONTACTS[0]);
  
  // Estado da Configuração do Agente
  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    botName: "Sofia - TechNova",
    welcomeMessage: "Olá! Como posso ajudar você a transformar seu negócio hoje?",
    primaryColor: "indigo",
    systemInstruction: DEFAULT_SYSTEM_INSTRUCTION,
    projectApiKey: "pk_live_tn_" + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 6)
  });

  // Salvar configurações (Simulado)
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleRegenerateKey = () => {
    const newKey = "pk_live_tn_" + Math.random().toString(36).substring(2, 15);
    setAgentConfig(prev => ({ ...prev, projectApiKey: newKey }));
  };

  const handleConfigChange = (field: keyof AgentConfig, value: string) => {
    setAgentConfig(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Poderia adicionar um toast aqui
  };

  const IntegrationTab = () => (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Instalação e Integração</h2>
          <p className="text-slate-600">Siga os passos abaixo para instalar o chat no seu site WordPress com Elementor.</p>
        </div>

        <div className="grid gap-6">
          {/* Script Section */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Code size={24} />
              </div>
              <h3 className="font-semibold text-lg">1. Código de Incorporação</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Copie este código e cole antes do fechamento da tag <code>&lt;/body&gt;</code> do seu site.
            </p>
            <div className="relative bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto group">
              <button 
                onClick={() => copyToClipboard(`<script>\n  window.TECHNOVA_CHAT_CONFIG = {\n    apiKey: "${agentConfig.projectApiKey}",\n    botName: "${agentConfig.botName}",\n    theme: "${agentConfig.primaryColor}",\n  };\n</script>\n<script src="https://cdn.technova.com.br/chat-widget/v2.5/loader.js" async></script>`)}
                className="absolute top-3 right-3 text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100" 
                title="Copiar código"
              >
                <Copy size={16} />
              </button>
              <code>
                &lt;script&gt;<br/>
                &nbsp;&nbsp;window.TECHNOVA_CHAT_CONFIG = &#123;<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;apiKey: "<span className="text-green-400 font-bold">{agentConfig.projectApiKey}</span>",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;botName: "{agentConfig.botName}",<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;theme: "{agentConfig.primaryColor}",<br/>
                &nbsp;&nbsp;&#125;;<br/>
                &lt;/script&gt;<br/>
                &lt;script src="https://cdn.technova.com.br/chat-widget/v2.5/loader.js" async&gt;&lt;/script&gt;
              </code>
            </div>
          </div>

          {/* WordPress/Elementor Guide */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <LayoutTemplate size={24} />
              </div>
              <h3 className="font-semibold text-lg">2. Como adicionar no Elementor</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">1</div>
                <div>
                  <h4 className="font-medium text-slate-900">Acesse o Painel WordPress</h4>
                  <p className="text-sm text-slate-500 mt-1">Vá para Aparência &gt; Editor de Arquivos de Tema (ou use um plugin de Header & Footer se preferir).</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">2</div>
                <div>
                  <h4 className="font-medium text-slate-900">Opção Recomendada: Elementor Custom Code</h4>
                  <p className="text-sm text-slate-500 mt-1">Se você usa Elementor Pro, vá para <strong>Elementor &gt; Custom Code</strong>.</p>
                  <ul className="list-disc ml-4 mt-2 text-sm text-slate-500 space-y-1">
                    <li>Clique em "Add New".</li>
                    <li>Defina a localização como &lt;body&gt; - End.</li>
                    <li>Cole o código copiado acima.</li>
                    <li>Publique para "Entire Site" (Todo o site).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TrainingAndSettingsTab = () => (
    <div className="flex-1 flex overflow-hidden">
      {/* Configuration Form */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-8 border-r border-slate-200">
        <div className="max-w-2xl mx-auto pb-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">
              {activeTab === 'training' ? 'Treinamento da IA' : 'Aparência e Configurações'}
            </h2>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
            >
              {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>

          {activeTab === 'training' ? (
             <div className="space-y-6">
               {/* Training Section */}
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex items-start gap-4">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-lg shrink-0">
                      <BrainCircuit size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">Prompt do Sistema</h3>
                      <p className="text-sm text-slate-500 mb-4">
                        Defina como o agente deve se comportar. Inclua informações sobre sua empresa, produtos, tom de voz e o que ele deve fazer caso não saiba a resposta.
                      </p>
                      <textarea
                        className="w-full h-80 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono text-slate-800 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none leading-relaxed"
                        value={agentConfig.systemInstruction}
                        onChange={(e) => handleConfigChange('systemInstruction', e.target.value)}
                        placeholder="Ex: Você é um assistente da Padaria do João..."
                      ></textarea>
                      <div className="mt-2 flex justify-end">
                         <span className="text-xs text-slate-400">Tokens estimados: ~{agentConfig.systemInstruction.length / 4}</span>
                      </div>
                    </div>
                 </div>
               </div>
               
               <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                 <h4 className="font-semibold text-blue-800 text-sm mb-2">Dicas de Treinamento:</h4>
                 <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                   <li>Seja específico sobre o nome da empresa.</li>
                   <li>Liste seus principais produtos e preços.</li>
                   <li>Defina regras claras (ex: "Não dê descontos sem aprovação").</li>
                   <li>O modelo Gemini 2.5 tem uma grande janela de contexto, pode ser detalhado!</li>
                 </ul>
               </div>
             </div>
          ) : (
            <div className="space-y-6">
              
              {/* API Credentials Card - NEW */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                 <div className="flex items-start gap-4 mb-6">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-lg shrink-0">
                      <Key size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Credenciais de API</h3>
                      <p className="text-sm text-slate-500">Esta é a chave única que conecta seu site ao nosso sistema.</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Project API Key</label>
                     <div className="flex gap-2">
                       <code className="flex-1 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-lg text-slate-600 font-mono text-sm break-all">
                         {agentConfig.projectApiKey}
                       </code>
                       <button 
                        onClick={() => copyToClipboard(agentConfig.projectApiKey)}
                        className="p-2.5 text-slate-500 hover:text-indigo-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
                        title="Copiar Key"
                       >
                         <Copy size={20} />
                       </button>
                       <button 
                        onClick={handleRegenerateKey}
                        className="p-2.5 text-slate-500 hover:text-red-600 bg-white border border-slate-200 hover:bg-red-50 rounded-lg transition-colors"
                        title="Gerar nova Key"
                       >
                         <RefreshCw size={20} />
                       </button>
                     </div>
                     <div className="mt-2 flex items-center gap-2 text-xs text-amber-600">
                       <ShieldCheck size={12} />
                       <span>Não compartilhe esta chave publicamente fora do código do seu site.</span>
                     </div>
                   </div>
                 </div>
              </div>

              {/* Customization Section */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex items-start gap-4 mb-6">
                    <div className="p-2 bg-pink-100 text-pink-600 rounded-lg shrink-0">
                      <Bot size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Identidade do Agente</h3>
                      <p className="text-sm text-slate-500">Como seu agente aparece para os clientes.</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Bot</label>
                     <input 
                        type="text" 
                        value={agentConfig.botName}
                        onChange={(e) => handleConfigChange('botName', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-slate-700 mb-1">Mensagem de Boas-vindas</label>
                     <textarea 
                        rows={3}
                        value={agentConfig.welcomeMessage}
                        onChange={(e) => handleConfigChange('welcomeMessage', e.target.value)}
                        className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                     />
                   </div>
                 </div>
              </div>

               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex items-start gap-4 mb-6">
                    <div className="p-2 bg-teal-100 text-teal-600 rounded-lg shrink-0">
                      <Palette size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Estilo</h3>
                      <p className="text-sm text-slate-500">Escolha a cor principal do widget.</p>
                    </div>
                 </div>
                 
                 <div className="flex gap-4">
                   {['indigo', 'blue', 'green', 'rose', 'orange'].map(color => (
                     <button
                        key={color}
                        onClick={() => handleConfigChange('primaryColor', color)}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${agentConfig.primaryColor === color ? 'border-slate-800 scale-110' : 'border-transparent'}`}
                     >
                        <div className={`w-8 h-8 rounded-full bg-${color}-500`}></div>
                     </button>
                   ))}
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live Preview Side */}
      <div className="w-[400px] bg-slate-100 border-l border-slate-200 flex flex-col hidden lg:flex">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h3 className="font-semibold text-slate-700 flex items-center gap-2">
            <Phone size={16} /> Live Preview
          </h3>
          <p className="text-xs text-slate-500">Teste seu agente em tempo real aqui.</p>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
           <div className="w-full h-[600px] shadow-2xl rounded-2xl overflow-hidden bg-white">
              {/* We pass the live config to the widget */}
              <ChatWidget 
                embeddedMode={true} 
                defaultOpen={true}
                config={agentConfig}
              />
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-20 bg-slate-900 flex flex-col items-center py-6 gap-6 shrink-0 z-20">
        <button 
          onClick={() => setActiveTab('chats')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'chats' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          title="Atendimentos"
        >
          <MessageSquare size={24} />
        </button>
        <button className="p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all" title="Clientes">
          <Users size={24} />
        </button>
        
        <div className="w-8 h-px bg-slate-800 my-2"></div>
        
        <button 
          onClick={() => setActiveTab('training')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'training' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          title="Treinamento IA"
        >
          <BrainCircuit size={24} />
        </button>

         <button 
          onClick={() => setActiveTab('settings')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          title="Personalização"
        >
          <Settings size={24} />
        </button>

        <div className="flex-1"></div>
        
        <button 
          onClick={() => setActiveTab('integration')}
          className={`p-3 rounded-xl transition-all ${activeTab === 'integration' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          title="Integração"
        >
          <Code size={24} />
        </button>
        <div className="w-10 h-10 mt-4 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:ring-2 ring-white transition-all">
          TN
        </div>
      </div>

      {activeTab === 'integration' && <IntegrationTab />}
      
      {(activeTab === 'training' || activeTab === 'settings') && <TrainingAndSettingsTab />}

      {activeTab === 'chats' && (
        /* Chat Interface */
        <>
          {/* Chat List Sidebar */}
          <div className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0">
            <div className="p-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Caixa de Entrada</h2>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar conversa..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {MOCK_CONTACTS.map(contact => (
                <div 
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors ${selectedContact.id === contact.id ? 'bg-indigo-50/50 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
                        {contact.status === 'online' && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div>
                        <h3 className={`font-medium text-sm ${selectedContact.id === contact.id ? 'text-indigo-900' : 'text-slate-900'}`}>{contact.name}</h3>
                        <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{contact.source}</span>
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{contact.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pl-12">
                    <p className="text-sm text-slate-500 truncate max-w-[140px]">{contact.lastMessage}</p>
                    {contact.unread > 0 && (
                      <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-slate-50/50">
            {/* Chat Header */}
            <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
              <div className="flex items-center gap-3">
                <img src={selectedContact.avatar} alt={selectedContact.name} className="w-9 h-9 rounded-full" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{selectedContact.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${selectedContact.status === 'online' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                    <span className="text-xs text-slate-500">{selectedContact.status === 'online' ? 'Online agora' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <button className="hover:text-indigo-600 transition-colors"><Phone size={20} /></button>
                <button className="hover:text-indigo-600 transition-colors"><Video size={20} /></button>
                <div className="h-6 w-px bg-slate-200"></div>
                <button className="hover:text-indigo-600 transition-colors"><MoreVertical size={20} /></button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              <div className="flex justify-center my-4">
                <span className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full">Hoje</span>
              </div>
              
              {MOCK_MESSAGES[selectedContact.id]?.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
              )) || (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-60">
                  <Bot size={48} className="mb-2" />
                  <p>Inicie a conversa com este cliente</p>
                </div>
              )}
            </div>

            {/* Input Mock */}
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-2 flex items-end gap-2">
                <textarea 
                  placeholder="Digite uma mensagem..." 
                  className="w-full bg-transparent border-none resize-none focus:outline-none text-sm p-2 max-h-32 min-h-[44px]"
                  rows={1}
                ></textarea>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg transition-colors mb-0.5">
                   <CheckCheck size={18} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
