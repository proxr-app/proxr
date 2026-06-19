import React, { useState, useRef, useEffect } from 'react';
import { useMockStore } from '../lib/mockStore';
import { usePrivy } from '../lib/auth';
import { useToast } from '../components/ui/ToastProvider';
import NetworkPulse from '../components/layout/NetworkPulse';
import { 
  Send, 
  Plus, 
  MessageSquare, 
  Search, 
  Brain, 
  Cpu, 
  Globe, 
  User, 
  Terminal,
  Lock
} from 'lucide-react';

const SUGGESTIONS = [
  "explain quantum computing",
  "write a python script",
  "what's the news today",
  "help me debug this code"
];

const MOCK_ANSWERS = {
  quantum: `quantum computing is a type of computing that uses the principles of quantum physics to solve complex problems. 

standard computers use bits (0s and 1s) to process information. quantum computers use qubits. qubits can represent a 0, a 1, or both at the same time (superposition). 

this allows quantum computers to process massive amounts of data and perform complex calculations at speeds unimaginable with traditional computers, particularly in fields like cryptography, chemistry, and machine learning.

this response was processed by native worker \`0x9x2m...a1b2\` (32.4 tok/s).`,
  
  python: `here is a python script to fetch and calculate token stats:

\`\`\`python
import time
import random

def calculate_throughput(tokens, duration):
    return tokens / duration

def simulate_gpu_job():
    tokens = random.randint(150, 800)
    start = time.time()
    time.sleep(random.uniform(0.5, 2.0))
    end = time.time()
    
    tps = calculate_throughput(tokens, end - start)
    print(f"processed {tokens} tokens in {end-start:.2f}s")
    print(f"speed: {tps:.2f} tokens/second")

if __name__ == "__main__":
    simulate_gpu_job()
\`\`\`

this job was processed on a worker running \`ollama\` with hardware acceleration.`,

  news: `### live internet search results (june 18, 2026)

based on live brave search index:
1. **decentralized ai boom**: the proxr network exceeds 3,800 active nodes, driving down raw inference costs by 45% compared to centralized cloud hosts.
2. **nvidia rtx 5090 launch**: miners and AI enthusiasts report high yield farming earnings on p2p compute marketplaces.
3. **webgpu standard adoption**: major browser vendors release webgpu optimization updates, boosting browser-worker inference speeds.

this search query was processed by brave search api integration. citations: [1] techcrunch.com [2] theverge.com [3] wired.com.`,

  default: `your request has been routed to the proxr orchestrator.

the network is operating at optimal capacity (12 workers active, 3 jobs in queue). your prompt passed through the worker in raw text without metadata and has been deleted from memory.

no logs were stored. no filters were applied.

this response was generated using Qwen3.5 27B on worker node \`0x7f3k...9x2m\`.`
};

export default function Compute() {
  const { credits, deductCredits } = useMockStore();
  const { authenticated, login } = usePrivy();
  const { showSuccess, showError } = useToast();

  const [model, setModel] = useState('standard'); // 'standard' or 'pro'
  const [deepThink, setDeepThink] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [conversations, setConversations] = useState([
    { id: '1', title: 'explain quantum computing', active: true, messages: [] },
    { id: '2', title: 'write a python script', active: false, messages: [] },
    { id: '3', title: 'gpu rendering parameters', active: false, messages: [] }
  ]);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchStatus, setSearchStatus] = useState('');
  const [thinkingProcess, setThinkingProcess] = useState('');

  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, searchStatus, thinkingProcess]);

  const activeConversation = conversations.find(c => c.active);

  // Load chat messages when active conversation changes
  useEffect(() => {
    if (activeConversation) {
      // For demo, if conversation is fresh we show empty state.
      // If it's one of the placeholders, we can seed them or leave empty.
      setMessages(activeConversation.messages);
    }
  }, [activeConversation]);

  const handleSelectConversation = (id) => {
    setConversations(prev => prev.map(c => ({
      ...c,
      active: c.id === id
    })));
  };

  const handleNewChat = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    const newChat = {
      id: newId,
      title: 'new conversation',
      active: true,
      messages: []
    };
    setConversations(prev => [
      newChat,
      ...prev.map(c => ({ ...c, active: false }))
    ]);
    showSuccess('new chat created');
  };

  const cost = model === 'standard' ? 10 : (deepThink ? 20 : 15);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMessage;
    if (!query.trim()) return;

    if (!authenticated) {
      showError('please connect your wallet first');
      return;
    }

    if (credits < cost) {
      showError('insufficient credits. top up in the navigation bar.');
      return;
    }

    // Deduct credits
    deductCredits(cost);

    // Add user message
    const userMsg = { id: Math.random().toString(), role: 'user', content: query };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);
    setSearchStatus('');
    setThinkingProcess('');

    // Update conversation title if it's the first message
    if (activeConversation && activeConversation.title === 'new conversation') {
      setConversations(prev => prev.map(c => 
        c.active ? { ...c, title: query.length > 25 ? query.substring(0, 25) + '...' : query } : c
      ));
    }

    // Simulate backend response
    try {
      // 1. Web Search Simulation (if Pro & mentions search, news, today, weather, price, or is "what's the news today")
      const lowercaseQuery = query.toLowerCase();
      const needsSearch = model === 'pro' && (
        lowercaseQuery.includes('news') || 
        lowercaseQuery.includes('today') || 
        lowercaseQuery.includes('weather') || 
        lowercaseQuery.includes('price') ||
        lowercaseQuery.includes('search')
      );

      if (needsSearch) {
        setSearchStatus('emitted tool call: web_search("' + query + '")...');
        await new Promise(r => setTimeout(r, 1000));
        setSearchStatus('brave search: querying brave api...');
        await new Promise(r => setTimeout(r, 1000));
        setSearchStatus('orchestrator: fetched top 3 sources from the web.');
        await new Promise(r => setTimeout(r, 800));
      }

      // 2. Deep Think Simulation (if enabled)
      if (model === 'pro' && deepThink) {
        setThinkingProcess('initiating reasoning flow...');
        await new Promise(r => setTimeout(r, 800));
        
        const steps = [
          'analyzing prompt semantics & developer intention...',
          'evaluating constraints: decentralized infrastructure, private GPU routing...',
          'formulating step-by-step technical response outline...',
          'refining explanation structure and cross-verifying facts...'
        ];

        for (const step of steps) {
          setThinkingProcess(prev => prev + '\n- ' + step);
          await new Promise(r => setTimeout(r, 700));
        }
        await new Promise(r => setTimeout(r, 500));
      } else {
        await new Promise(r => setTimeout(r, 800));
      }

      // Determine answer content
      let finalAnswer = MOCK_ANSWERS.default;
      if (lowercaseQuery.includes('quantum')) {
        finalAnswer = MOCK_ANSWERS.quantum;
      } else if (lowercaseQuery.includes('python') || lowercaseQuery.includes('script') || lowercaseQuery.includes('code')) {
        finalAnswer = MOCK_ANSWERS.python;
      } else if (needsSearch) {
        finalAnswer = MOCK_ANSWERS.news;
      }

      // 3. Streaming Response Simulation
      setIsLoading(false);
      setSearchStatus('');
      
      const assistantMsgId = Math.random().toString();
      const assistantMsg = { 
        id: assistantMsgId, 
        role: 'assistant', 
        content: '',
        thinking: model === 'pro' && deepThink ? 'completed thinking process.' : null
      };
      
      setMessages(prev => [...prev, assistantMsg]);

      const words = finalAnswer.split(' ');
      let currentContent = '';
      
      for (let i = 0; i < words.length; i++) {
        currentContent += (i === 0 ? '' : ' ') + words[i];
        
        // update messages state
        setMessages(prev => prev.map(m => 
          m.id === assistantMsgId ? { ...m, content: currentContent } : m
        ));
        
        await new Promise(r => setTimeout(r, 40)); // 40ms stream rate
      }

      // Save messages in conversation history
      setConversations(prev => prev.map(c => 
        c.active ? { 
          ...c, 
          messages: [...c.messages, userMsg, { ...assistantMsg, content: finalAnswer }] 
        } : c
      ));

    } catch (err) {
      showError('an error occurred while generating response');
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex h-[calc(100vh-69px)] w-full overflow-hidden font-mono page-transition">
      {/* Sidebar - Conversation list */}
      <div className="w-[240px] bg-surface border-r border-border-custom flex flex-col flex-shrink-0 h-full">
        {/* New Chat Button */}
        <div className="p-4 border-b border-border-custom">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 border border-border-custom hover:bg-hover text-white text-xs py-2 rounded transition-colors lowercase"
          >
            <Plus className="w-3.5 h-3.5" />
            + new chat
          </button>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => handleSelectConversation(conv.id)}
              className={`w-full text-left p-2 rounded text-xs flex items-center gap-2 transition-colors lowercase truncate ${
                conv.active 
                  ? 'bg-surface-2 text-white border border-border-custom' 
                  : 'text-muted hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{conv.title}</span>
            </button>
          ))}
        </div>

        {/* Bottom Network Status */}
        <div className="p-4 border-t border-border-custom">
          <NetworkPulse />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-bg h-full relative">
        {/* Top Control Bar */}
        <div className="border-b border-border-custom px-6 py-3 flex items-center justify-between bg-bg/50">
          {/* Model Selector */}
          <div className="flex items-center gap-3">
            <select
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                if (e.target.value === 'standard') setDeepThink(false);
              }}
              className="bg-surface border border-border-custom text-white text-xs px-3 py-1.5 rounded outline-none cursor-pointer font-mono lowercase"
            >
              <option value="standard">● standard (qwen3 8b · 10c/msg)</option>
              <option value="pro">● pro (qwen3.5 27b · 15c/msg)</option>
            </select>

            {model === 'pro' && (
              <button
                onClick={() => setDeepThink(!deepThink)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border transition-all lowercase ${
                  deepThink 
                    ? 'bg-white text-black border-white font-bold' 
                    : 'bg-surface border-border-custom text-muted hover:text-white'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                deep think {deepThink ? 'on' : 'off'} (+5c)
              </button>
            )}
          </div>

          <div className="text-xs text-muted">
            cost: <span className="text-white font-bold">{cost} credits</span>
          </div>
        </div>

        {/* Chat Stream Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
          {messages.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto font-mono">
              <Terminal className="w-12 h-12 text-muted mb-4 animate-pulse-cursor" />
              <h2 className="text-white text-lg font-bold mb-6 lowercase">
                what do you want to know?
              </h2>
              
              <div className="grid grid-cols-2 gap-3 w-full">
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => handleSuggestionClick(s)}
                    className="p-3 text-left bg-surface border border-border-custom rounded text-xs text-muted hover:text-white hover:border-white transition-colors lowercase"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages List */
            <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full">
              {messages.map((msg, index) => (
                <div
                  key={msg.id || index}
                  className={`flex gap-3 max-w-[85%] ${
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded border flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                    msg.role === 'user' 
                      ? 'bg-white text-black border-white' 
                      : 'bg-surface border-border-custom text-white'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4" />}
                  </div>

                  {/* Bubble content */}
                  <div className="flex flex-col gap-1.5">
                    {msg.role === 'assistant' && msg.thinking && (
                      <details open className="bg-surface-2 border border-border-custom rounded p-3 text-xs mb-2">
                        <summary className="text-muted font-bold cursor-pointer select-none lowercase flex items-center gap-1.5">
                          <Brain className="w-3.5 h-3.5 text-green-custom" />
                          reasoning process
                        </summary>
                        <pre className="mt-2 text-[10px] text-muted whitespace-pre-wrap leading-relaxed lowercase">
                          {thinkingProcess || 'generating thoughts...'}
                        </pre>
                      </details>
                    )}

                    <div className={`p-4 rounded border text-sm leading-relaxed font-mono whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-surface border-border-custom text-white rounded-tr-none'
                        : 'bg-surface border-border-custom text-off-white rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {/* Web Search Process Status */}
              {searchStatus && (
                <div className="flex gap-3 max-w-[85%] mr-auto font-mono text-xs text-muted">
                  <div className="w-8 h-8 rounded border border-border-custom bg-surface flex-shrink-0 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-green-custom animate-pulse" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-custom animate-ping"></span>
                      <span>{searchStatus}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Loader */}
              {isLoading && !searchStatus && (
                <div className="flex gap-3 max-w-[85%] mr-auto font-mono text-sm text-muted">
                  <div className="w-8 h-8 rounded border border-border-custom bg-surface flex-shrink-0 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-white animate-pulse" />
                  </div>
                  <div className="flex flex-col justify-center bg-surface border border-border-custom rounded px-4 py-3 text-xs">
                    {thinkingProcess ? (
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded bg-green-custom animate-pulse"></span>
                        <span>thinking: {thinkingProcess.split('\n').pop() || 'processing'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-4 bg-white animate-pulse-cursor"></span>
                        <span>routing job to worker...</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar Section */}
        <div className="border-t border-border-custom p-4 bg-bg">
          <div className="max-w-3xl mx-auto relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="ask anything. prompts are never logged..."
              disabled={!authenticated}
              rows={2}
              className="w-full bg-surface border border-border-custom text-white text-sm rounded-lg pl-4 pr-12 py-3 outline-none focus:border-white/40 transition-colors font-mono resize-none disabled:opacity-50"
            />
            
            <button
              onClick={() => handleSendMessage()}
              disabled={!authenticated || !inputMessage.trim() || isLoading}
              className="absolute right-3 top-3.5 p-1.5 bg-white text-black hover:bg-off-white transition-colors rounded disabled:opacity-30 disabled:hover:bg-white flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>

            {/* Wallet lock overlay */}
            {!authenticated && (
              <div className="absolute inset-0 bg-bg/80 backdrop-blur-[1px] flex items-center justify-center rounded-lg border border-border-custom">
                <button
                  onClick={login}
                  className="flex items-center gap-2 bg-white text-black text-xs font-bold font-mono px-4 py-2 rounded hover:bg-off-white transition-colors lowercase"
                >
                  <Lock className="w-3.5 h-3.5" />
                  connect wallet to start computing
                </button>
              </div>
            )}
          </div>

          <div className="max-w-3xl mx-auto flex justify-between items-center mt-2 px-1 text-[10px] text-muted">
            <span>this message will cost {cost} credits</span>
            <span>your balance: {credits} credits</span>
          </div>
        </div>
      </div>
    </div>
  );
}
