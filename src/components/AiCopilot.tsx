import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Globe, 
  Sparkles, 
  AlertCircle,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { Message } from '../types';

interface AiCopilotProps {
  chatHistory: Message[];
  setChatHistory: React.Dispatch<React.SetStateAction<Message[]>>;
}

// Helper to format text with custom markdown-like bold processing and bullet list item separation.
const formatMessageText = (text: string, isAssistant: boolean) => {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
    const cleanLine = isBullet ? line.substring(line.indexOf(trimmed.charAt(0)) + 2) : line;

    // Split by **text** markers
    const parts = cleanLine.split(/\*\*([\s\S]*?)\*\*/g);
    const content = parts.map((part, partIdx) => {
      if (partIdx % 2 === 1) {
        return (
          <strong 
            key={partIdx} 
            className={`font-black ${isAssistant ? 'text-indigo-950 font-extrabold' : 'text-amber-200 font-extrabold'}`}
          >
            {part}
          </strong>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={lineIdx} className="flex items-start gap-2 pl-2 my-1">
          <span className={`${isAssistant ? 'text-indigo-600 font-extrabold' : 'text-amber-200 font-extrabold'} shrink-0 select-none`}>•</span>
          <span className="flex-1">{content}</span>
        </div>
      );
    }

    return (
      <p key={lineIdx} className={trimmed === '' ? 'h-2' : 'leading-relaxed'}>
        {content}
      </p>
    );
  });
};

export default function AiCopilot({ chatHistory, setChatHistory }: AiCopilotProps) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQueries = [
    { text: "Where is the sensory quiet room?", label: "Neurodiverse Care" },
    { text: "Gate B has a long queue, where should I enter?", label: "Queue Jam" },
    { text: "What is the bag policy for the match?", label: "Stadium Rules" },
    { text: "Where is the lost and found center located?", label: "Lost & Found" },
    { text: "Je cherche un ascenseur pour handicapés", label: "French Assist" },
    { text: "Hay algún lugar de primeros auxilios?", label: "Spanish Assist" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorText(null);
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Append user message immediately
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ history: updatedHistory }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate response from Aura Stadium Copilot.');
      }

      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatHistory((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || 'Unable to establish secure handshake with Gemini API gateway.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQueryClick = (queryText: string) => {
    handleSendMessage(queryText);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full text-slate-800">
      
      {/* Copilot Header */}
      <div className="p-6 border-b border-slate-200 bg-white flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-sans font-bold text-slate-900 leading-tight">Aura Stadium Fan Copilot</h2>
              <span className="px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-700 border border-indigo-200 text-[9px] font-mono font-bold uppercase tracking-widest">GEMINI 3.5</span>
            </div>
            <p className="text-xs text-slate-400 font-mono font-bold mt-0.5 uppercase">Instant multilingual tournament guides and navigation assistant</p>
          </div>
        </div>
        
        {/* Localization Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-500 font-bold">
          <Globe className="h-3.5 w-3.5 text-indigo-500" />
          <span>Multilingual Autodetect Active</span>
        </div>
      </div>

      {/* Main split: Chat Box + Quick Queries Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Chat Box */}
        <div className="flex-1 flex flex-col justify-between bg-slate-50 overflow-hidden relative">
          
          {/* Messages Flow Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            {chatHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 max-w-lg mx-auto mt-12 md:mt-24">
                <div className="h-16 w-16 rounded-full bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-md mb-4">
                  <Sparkles className="h-8 w-8 animate-pulse" />
                </div>
                <h3 className="text-lg font-sans font-bold text-slate-900 mb-2">Welcome to Metropolitan Stadium, NY/NJ!</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  I am <strong className="text-indigo-600 font-bold">Aura</strong>, your official operations and crowd copilot. Ask me questions in any language about stadium gates, food stalls, accessible entrances, restrooms, quiet zones, or lost items.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-sm">
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-500 font-mono font-bold shadow-sm">English</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-500 font-mono font-bold shadow-sm">Español</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-500 font-mono font-bold shadow-sm">Français</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-500 font-mono font-bold shadow-sm">Deutsch</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-500 font-mono font-bold shadow-sm">Português</span>
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] text-slate-500 font-mono font-bold shadow-sm">العربية</span>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {chatHistory.map((msg) => {
                  const isAssistant = msg.sender === 'assistant';
                  return (
                    <div 
                      key={msg.id}
                      className={`flex gap-4 max-w-3xl ${isAssistant ? '' : 'ml-auto flex-row-reverse'}`}
                    >
                      {/* Avatar */}
                      <div className={`h-9 w-9 rounded-xl shrink-0 flex items-center justify-center border font-mono font-bold text-sm shadow-sm ${
                        isAssistant 
                          ? 'bg-indigo-50 border-indigo-100 text-indigo-600' 
                          : 'bg-slate-200 border-slate-300 text-slate-700'
                      }`}>
                        {isAssistant ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                      </div>

                      {/* Bubble */}
                      <div className={`flex flex-col ${isAssistant ? '' : 'items-end'}`}>
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed border shadow-sm ${
                          isAssistant 
                            ? 'bg-white border-slate-200 text-slate-800 rounded-tl-none' 
                            : 'bg-indigo-600 border-indigo-700 text-white rounded-tr-none'
                        }`}>
                          <div className="font-medium text-sm space-y-1 select-text">
                            {formatMessageText(msg.text, isAssistant)}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 font-bold mt-1 uppercase">{msg.timestamp}</span>
                      </div>
                    </div>
                  );
                })}

                {/* Loading State */}
                {isLoading && (
                  <div className="flex gap-4 max-w-xl">
                    <div className="h-9 w-9 rounded-xl bg-indigo-50 border border-indigo-150 text-indigo-600 flex items-center justify-center shrink-0">
                      <Bot className="h-5 w-5 animate-spin" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-500 rounded-tl-none flex items-center gap-2.5 text-sm font-medium shadow-sm">
                      <span className="flex h-2 w-2 relative shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                      </span>
                      <span>Aura is analyzing telemetry data and drafting a response...</span>
                    </div>
                  </div>
                )}

                {/* API Key missing or network error */}
                {errorText && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 flex items-start gap-3 text-sm shadow-sm">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5 text-rose-500" />
                    <div>
                      <h4 className="font-sans font-black uppercase tracking-wider text-xs">API Gateway Connection Failed</h4>
                      <p className="mt-1 leading-relaxed text-xs text-rose-600/90 font-medium">{errorText}</p>
                      <div className="mt-3 bg-white p-3.5 rounded-xl border border-rose-100 text-[11px] font-mono text-slate-500 leading-normal font-bold">
                        To resolve: Set your <span className="text-slate-900 font-extrabold">GEMINI_API_KEY</span> in the <span className="text-indigo-600">Settings &gt; Secrets</span> panel in Google AI Studio, then re-compile the app. You can still test other offline simulated modules!
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Entry Form */}
          <div className="p-4 border-t border-slate-200 bg-white shrink-0 shadow-sm">
            <form 
              id="copilot-chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputText);
              }}
              className="flex gap-2.5"
            >
              <input 
                id="copilot-input-field"
                type="text"
                placeholder={isLoading ? "Aura is typing..." : "Type your stadium query here (e.g. Where is Gate A?)..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4.5 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-50"
              />
              <button
                id="copilot-send-btn"
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 font-bold transition-all flex items-center justify-center disabled:opacity-50 disabled:hover:bg-indigo-600 shrink-0 cursor-pointer shadow-sm"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Right Side: Preset Quick Queries */}
        <div className="w-80 border-l border-slate-200 bg-white p-6 flex flex-col gap-5 shrink-0 overflow-y-auto max-h-screen">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-150">
            <QuestionIcon className="h-4 w-4 text-indigo-500" />
            <h3 className="font-sans font-bold text-sm text-slate-850 uppercase tracking-wider">Suggested Queries</h3>
          </div>
          
          <div className="space-y-3.5">
            {quickQueries.map((query, index) => (
              <button
                key={index}
                id={`quick-query-${index}`}
                onClick={() => handleQuickQueryClick(query.text)}
                disabled={isLoading}
                className="w-full p-4 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/20 text-left transition-all group disabled:opacity-50 cursor-pointer"
              >
                <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-400 text-[9px] font-mono font-bold uppercase tracking-wider group-hover:border-indigo-100 group-hover:text-indigo-600 transition-colors shadow-sm">
                  {query.label}
                </span>
                <p className="text-xs text-slate-600 font-sans mt-2.5 leading-relaxed font-bold group-hover:text-slate-900 transition-colors">{query.text}</p>
              </button>
            ))}
          </div>

          <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-150 text-[11px] text-slate-500 leading-relaxed font-mono font-bold">
            <strong>Cognitive Grounding:</strong> Aura incorporates real-time gate load metrics from the Operations Console when answering queries about entry gates.
          </div>
        </div>

      </div>

    </div>
  );
}
