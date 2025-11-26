import React, { useState } from 'react';
import { ChatWidget } from './components/ChatWidget';
import { AdminDashboard } from './components/AdminDashboard';
import { AuthScreen } from './components/AuthScreen';
import { Layout, Monitor, Shield, Zap, ChevronRight, Menu, LayoutDashboard, Globe, LogIn } from 'lucide-react';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView('admin');
  };

  const handleNavClick = (view: ViewState) => {
    if (view === 'admin' && !isLoggedIn) {
      setCurrentView('auth');
    } else {
      setCurrentView(view);
    }
  };

  // Render Logic based on state
  if (currentView === 'auth') {
    return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
  }

  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-white relative flex flex-col">
         {/* Admin Navbar */}
         <nav className="border-b border-slate-100 bg-white z-40 h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
              <div className="bg-indigo-600 rounded-lg p-1.5">
                <Layout className="text-white h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">TechNova Panel</span>
            </div>
            <button 
              onClick={() => setCurrentView('landing')}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <Globe size={16} /> Ver Site
            </button>
         </nav>
         <AdminDashboard />
      </div>
    );
  }

  // Landing Page View
  return (
    <div className="min-h-screen bg-white relative">
      {/* Navigation */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => setCurrentView('landing')}
            >
              <div className="bg-indigo-600 rounded-lg p-1.5">
                <Layout className="text-white h-5 w-5" />
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">TechNova</span>
            </div>
            
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-indigo-600 transition-colors">Produtos</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Soluções</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Preços</a>
            </div>

            <div className="flex items-center gap-4">
               <button className="md:hidden text-slate-600">
                  <Menu size={24} />
               </button>
              
              <button 
                onClick={() => handleNavClick('admin')}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-colors"
              >
                {isLoggedIn ? (
                  <>
                    <LayoutDashboard size={16} />
                    Painel
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    Entrar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Novidade: Integração com Gemini 2.5
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            O futuro do suporte <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                inteligente e rápido.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed">
            Aumente a satisfação dos seus clientes com nossa plataforma de IA de última geração. 
            Respostas instantâneas, contexto profundo e disponibilidade 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2">
              Ver Demonstração <ChevronRight size={18} />
            </button>
            <button 
              onClick={() => handleNavClick('auth')}
              className="w-full sm:w-auto px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-full transition-all"
            >
              Criar Conta Grátis
            </button>
          </div>
        </div>

        {/* Feature Grid Mockup */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Ultra Rápido</h3>
            <p className="text-slate-600">Processamento de linguagem natural em milissegundos para conversas fluidas.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Seguro por Padrão</h3>
            <p className="text-slate-600">Criptografia de ponta a ponta garantindo a privacidade dos dados do cliente.</p>
          </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
              <Monitor size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Multi-Plataforma</h3>
            <p className="text-slate-600">Integração perfeita em Web, iOS, Android e Desktop com uma única base de código.</p>
          </div>
        </div>
      </main>

      {/* The Actual Chat Widget - Only visible in landing view */}
      <ChatWidget />
    </div>
  );
};

export default App;