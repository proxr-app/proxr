import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePrivy } from '../lib/auth';
import { useMockStore } from '../lib/mockStore';
import { useToast } from '../components/ui/ToastProvider';
import NetworkPulse from '../components/layout/NetworkPulse';
import Footer from '../components/layout/Footer';
import logo from '../assets/logo.png';
import { 
  Cpu, 
  Terminal, 
  Coins, 
  Shield, 
  EyeOff, 
  Network, 
  DollarSign, 
  Layers, 
  Code,
  ArrowRight
} from 'lucide-react';

function PeoplePoweredAiIllustration() {
  return (
    <svg className="w-full h-full min-h-[160px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-p2p" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-p2p)" />
      
      {/* Curves with animated flow */}
      <path d="M 50 90 Q 105 40 160 90" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
      <path d="M 50 90 Q 105 40 160 90" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="5 5" fill="none" className="animate-flow-left" />

      <path d="M 160 90 Q 215 140 270 90" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none" />
      <path d="M 160 90 Q 215 140 270 90" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="5 5" fill="none" className="animate-flow-left" />

      {/* Nodes */}
      {/* Node 1: Users */}
      <g transform="translate(50, 90)">
        <circle r="18" fill="#0F0F0F" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
        <circle r="3" fill="#FFFFFF" />
        <text y="30" textAnchor="middle" fill="#888888" fontSize="8" fontFamily="monospace" className="lowercase">users</text>
      </g>

      {/* Node 2: Queue */}
      <g transform="translate(160, 90)">
        <rect x="-14" y="-14" width="28" height="28" rx="3" fill="#0F0F0F" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
        <line x1="-7" y1="-4" x2="7" y2="-4" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="-7" y1="0" x2="7" y2="0" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
        <line x1="-7" y1="4" x2="7" y2="4" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.3" />
        <text y="30" textAnchor="middle" fill="#888888" fontSize="8" fontFamily="monospace" className="lowercase">queue</text>
      </g>

      {/* Node 3: Workers */}
      <g transform="translate(270, 90)">
        <circle r="18" fill="#0F0F0F" stroke="#22C55E" strokeWidth="1.5" className="transition-transform duration-300 group-hover:scale-110" />
        <rect x="-4" y="-4" width="8" height="8" fill="none" stroke="#22C55E" strokeWidth="1.5" />
        <circle r="1.5" fill="#22C55E" />
        <text y="30" textAnchor="middle" fill="#888888" fontSize="8" fontFamily="monospace" className="lowercase">workers</text>
      </g>
    </svg>
  );
}

function PrivateByDesignIllustration() {
  return (
    <svg className="w-full h-[140px]" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-private" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
        </pattern>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0" />
          <stop offset="50%" stopColor="#22C55E" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-private)" />
      
      {/* Radar rings */}
      <circle cx="100" cy="70" r="50" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
      <circle cx="100" cy="70" r="30" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
      
      {/* Background Shield */}
      <path d="M 100 25 L 135 38 V 75 C 135 98 118 114 100 120 C 82 114 65 98 65 75 V 38 L 100 25 Z" 
        fill="#0F0F0F" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
        
      {/* Padlock */}
      <g transform="translate(100, 75)">
        <path d="M -10 -4 V -14 C -10 -19 10 -19 10 -14 V -4" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="-14" y="-4" width="28" height="20" rx="2" fill="#0F0F0F" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cy="5" r="2" fill="#FFFFFF" />
        <path d="M 0 7 L 0 11" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      
      {/* Scanning effect */}
      <g className="animate-scanline" style={{ transformOrigin: 'center' }}>
        <line x1="50" y1="40" x2="150" y2="40" stroke="#22C55E" strokeWidth="1.5" opacity="0.8" />
        <rect x="50" y="32" width="100" height="16" fill="url(#scanGrad)" opacity="0.15" />
      </g>
    </svg>
  );
}

function InBrowserIllustration() {
  const lines = [
    'npx proxr-node',
    'init WebGPU... done',
    'device: Apple M3 Max',
    'loading Qwen3-8B... 100%',
    'waiting for jobs...',
    'job #1428: processing',
    'job completed in 120ms',
    'earned +0.07 USDC',
    'waiting for jobs...'
  ];

  const [currentLineIdx, setCurrentLineIdx] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState('');
  const [charIdx, setCharIdx] = React.useState(0);
  const [terminalLines, setTerminalLines] = React.useState([]);

  React.useEffect(() => {
    let timer;
    const line = lines[currentLineIdx];

    if (charIdx < line.length) {
      timer = setTimeout(() => {
        setDisplayedText(prev => prev + line[charIdx]);
        setCharIdx(prev => prev + 1);
      }, 30 + Math.random() * 20);
    } else {
      timer = setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
        setDisplayedText('');
        setCharIdx(0);
        
        if (currentLineIdx < lines.length - 1) {
          setCurrentLineIdx(prev => prev + 1);
        } else {
          setTimeout(() => {
            setTerminalLines([]);
            setCurrentLineIdx(0);
          }, 2000);
        }
      }, 1200);
    }

    return () => clearTimeout(timer);
  }, [charIdx, currentLineIdx]);

  return (
    <div className="w-full bg-black border border-border-custom rounded-t-md font-mono text-[9px] md:text-[10px] overflow-hidden flex flex-col select-none text-left h-[130px] border-b-0">
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border-custom bg-[#080808]">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500/40"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500/40"></div>
        <span className="text-muted text-[8px] ml-2">proxr.network/worker</span>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-end gap-1 text-muted leading-tight">
        {terminalLines.slice(-4).map((line, idx) => {
          const isCommand = line.startsWith('npx');
          const isEarned = line.includes('+0.07 USDC');
          return (
            <div key={idx} className={isCommand ? "text-white" : isEarned ? "text-green-custom font-bold" : ""}>
              {isCommand ? '$ ' : '> '}
              {line}
            </div>
          );
        })}
        <div className={lines[currentLineIdx].startsWith('npx') ? "text-white" : lines[currentLineIdx].includes('+0.07 USDC') ? "text-green-custom font-bold" : ""}>
          {lines[currentLineIdx].startsWith('npx') ? '$ ' : '> '}
          {displayedText}
          <span className="inline-block w-1 h-2.5 bg-white ml-0.5 animate-pulse-cursor"></span>
        </div>
      </div>
    </div>
  );
}

function GetPaidForYourComputeIllustration() {
  return (
    <svg className="w-full h-full min-h-[160px]" viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid-coins" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
        </pattern>
        <linearGradient id="coinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
        <linearGradient id="usdcGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2775CA" />
          <stop offset="100%" stopColor="#1B4F89" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-coins)" />
      
      {/* Coin stack 1 (Left - USD Coin) */}
      <g className="animate-float-1">
        <ellipse cx="90" cy="130" rx="22" ry="7" fill="black" opacity="0.4" />
        
        <g transform="translate(90, 125)">
          <path d="M -22 0 C -22 7 22 7 22 0 V -8 C 22 -1 -22 -1 -22 -8 Z" fill="#1B4F89" stroke="rgba(255, 255, 255, 0.08)" />
          <ellipse cx="0" cy="-8" rx="22" ry="7" fill="#2775CA" stroke="rgba(255, 255, 255, 0.15)" />
        </g>
        <g transform="translate(90, 112)">
          <path d="M -22 0 C -22 7 22 7 22 0 V -8 C 22 -1 -22 -1 -22 -8 Z" fill="#1B4F89" stroke="rgba(255, 255, 255, 0.08)" />
          <ellipse cx="0" cy="-8" rx="22" ry="7" fill="#2775CA" stroke="rgba(255, 255, 255, 0.15)" />
          <text x="0" y="-4" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="monospace">$</text>
        </g>
      </g>
      
      {/* Coin stack 2 (Center - PROXR Green Coin) */}
      <g className="animate-float-2">
        <ellipse cx="160" cy="120" rx="24" ry="8" fill="black" opacity="0.4" />
        
        <g transform="translate(160, 115)">
          <path d="M -24 0 C -24 8 24 8 24 0 V -9 C 24 -1 -24 -1 -24 -9 Z" fill="#14532D" stroke="rgba(255, 255, 255, 0.08)" />
          <ellipse cx="0" cy="-9" rx="24" ry="8" fill="url(#coinGrad)" stroke="rgba(255, 255, 255, 0.15)" />
        </g>
        <g transform="translate(160, 100)">
          <path d="M -24 0 C -24 8 24 8 24 0 V -9 C 24 -1 -24 -1 -24 -9 Z" fill="#14532D" stroke="rgba(255, 255, 255, 0.08)" />
          <ellipse cx="0" cy="-9" rx="24" ry="8" fill="url(#coinGrad)" stroke="rgba(255, 255, 255, 0.15)" />
        </g>
        <g transform="translate(160, 85)">
          <path d="M -24 0 C -24 8 24 8 24 0 V -9 C 24 -1 -24 -1 -24 -9 Z" fill="#14532D" stroke="rgba(255, 255, 255, 0.08)" />
          <ellipse cx="0" cy="-9" rx="24" ry="8" fill="url(#coinGrad)" stroke="rgba(255, 255, 255, 0.15)" />
          <text x="0" y="-4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="monospace">P</text>
        </g>
      </g>
      
      {/* Coin stack 3 (Right - USDC Coin) */}
      <g className="animate-float-3">
        <ellipse cx="230" cy="135" rx="22" ry="7" fill="black" opacity="0.4" />
        
        <g transform="translate(230, 130)">
          <path d="M -22 0 C -22 7 22 7 22 0 V -8 C 22 -1 -22 -1 -22 -8 Z" fill="#1B4F89" stroke="rgba(255, 255, 255, 0.08)" />
          <ellipse cx="0" cy="-8" rx="22" ry="7" fill="url(#usdcGrad)" stroke="rgba(255, 255, 255, 0.15)" />
        </g>
        <g transform="translate(230, 117)">
          <path d="M -22 0 C -22 7 22 7 22 0 V -8 C 22 -1 -22 -1 -22 -8 Z" fill="#1B4F89" stroke="rgba(255, 255, 255, 0.08)" />
          <ellipse cx="0" cy="-8" rx="22" ry="7" fill="url(#usdcGrad)" stroke="rgba(255, 255, 255, 0.15)" />
          <text x="0" y="-4" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="monospace">$</text>
        </g>
      </g>
    </svg>
  );
}

function HowItWorksSection() {
  const [activeTab, setActiveTab] = React.useState('user');

  const tabContents = {
    user: {
      title: 'user client',
      subtitle: 'how users query artificial intelligence seamlessly',
      items: [
        { label: 'authentication', desc: 'connect solana wallet securely via privy SDK wrappers.' },
        { label: 'flexible model tiers', desc: 'choose between standard chat (local WebGPU) and pro chat (decentralized GPUs).' },
        { label: 'real-time streaming', desc: 'send prompts and receive text generation tokens instantly via socket.io.' }
      ]
    },
    orchestrator: {
      title: 'orchestrator',
      subtitle: 'the centralized routing brain of the network',
      items: [
        { label: 'zero-persistence', desc: 'prompts pass straight through memory and disappear. no database logging, total privacy.' },
        { label: 'matchmaking dispatch', desc: 'weighted-random model dispatches requests based on worker speeds (tok/s).' },
        { label: 'real-time tool calls', desc: 'seamlessly intercepts search queries, executes Brave Search, and feeds content back.' }
      ]
    },
    worker: {
      title: 'worker node',
      subtitle: 'how compute providers share hardware and earn',
      items: [
        { label: 'native ollama daemon', desc: 'runs on desktop terminal utilizing NVIDIA CUDA, Apple Metal, or Vulkan.' },
        { label: 'browser node', desc: 'contribute compute by simply keeping a browser tab open via WebGPU models.' },
        { label: 'automatic split payouts', desc: 'receive 70% or 80% (if staking) of job credits in USDC directly on Solana.' }
      ]
    }
  };

  const selected = tabContents[activeTab];

  return (
    <div className="bg-surface border border-border-custom rounded-lg p-6 flex flex-col gap-8 font-mono hover:border-white/10 transition-colors duration-300">
      <div className="flex border-b border-border-custom gap-2">
        {Object.keys(tabContents).map((tabKey) => (
          <button
            key={tabKey}
            onClick={() => setActiveTab(tabKey)}
            className={`px-4 py-3 text-xs md:text-sm border-b-2 lowercase transition-all duration-200 cursor-pointer ${
              activeTab === tabKey
                ? 'border-white text-white font-bold'
                : 'border-transparent text-muted hover:text-white'
            }`}
          >
            {tabContents[tabKey].title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-[#050505] border border-border-custom/50 rounded-lg p-4 flex items-center justify-center min-h-[200px]">
          <svg className="w-full h-full max-w-[480px]" viewBox="0 0 600 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-how" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-how)" />

            <path d="M 100 80 Q 200 40 300 80" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" fill="none" />
            {(activeTab === 'user' || activeTab === 'orchestrator') && (
              <path d="M 100 80 Q 200 40 300 80" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="5 5" fill="none" className="animate-flow-left" />
            )}

            <path d="M 300 80 Q 400 120 500 80" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" fill="none" />
            {(activeTab === 'worker' || activeTab === 'orchestrator') && (
              <path d="M 300 80 Q 400 120 500 80" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="5 5" fill="none" className="animate-flow-left" />
            )}

            <g transform="translate(100, 80)" className="transition-all duration-300">
              <circle r="24" fill="#0F0F0F" stroke={activeTab === 'user' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1.5" />
              <g className={activeTab === 'user' ? 'text-white' : 'text-muted'}>
                <rect x="-10" y="-12" width="20" height="14" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <line x1="-5" y1="6" x2="5" y2="6" stroke="currentColor" strokeWidth="1.2" />
                <line x1="-2" y1="2" x2="-2" y2="6" stroke="currentColor" strokeWidth="1.2" />
                <line x1="2" y1="2" x2="2" y2="6" stroke="currentColor" strokeWidth="1.2" />
              </g>
              <text y="38" textAnchor="middle" fill="#888888" fontSize="8">user client</text>
            </g>

            <g transform="translate(300, 80)" className="transition-all duration-300">
              <circle r="24" fill="#0F0F0F" stroke={activeTab === 'orchestrator' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1.5" />
              <g className={activeTab === 'orchestrator' ? 'text-white' : 'text-muted'}>
                <rect x="-9" y="-12" width="18" height="24" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <line x1="-6" y1="-6" x2="6" y2="-6" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                <line x1="-6" y1="0" x2="6" y2="0" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                <line x1="-6" y1="6" x2="6" y2="6" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                <circle cx="0" cy="-6" r="1" fill="#22C55E" />
                <circle cx="0" cy="0" r="1" fill="#22C55E" />
                <circle cx="0" cy="6" r="1" fill="#22C55E" />
              </g>
              <text y="38" textAnchor="middle" fill="#888888" fontSize="8">orchestrator</text>
            </g>

            <g transform="translate(500, 80)" className="transition-all duration-300">
              <circle r="24" fill="#0F0F0F" stroke={activeTab === 'worker' ? '#22C55E' : 'rgba(255, 255, 255, 0.15)'} strokeWidth="1.5" />
              <g className={activeTab === 'worker' ? 'text-green-custom' : 'text-muted'}>
                <rect x="-10" y="-8" width="20" height="16" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="-3" cy="0" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="3" cy="0" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <line x1="-10" y1="-3" x2="-13" y2="-3" stroke="currentColor" strokeWidth="1.2" />
                <line x1="-10" y1="3" x2="-13" y2="3" stroke="currentColor" strokeWidth="1.2" />
              </g>
              <text y="38" textAnchor="middle" fill="#888888" fontSize="8">worker node</text>
            </g>
          </svg>
        </div>

        <div className="flex flex-col gap-4 text-left">
          <div className="border-b border-border-custom pb-2">
            <h4 className="text-white text-sm font-bold lowercase">{selected.title} specifications</h4>
            <p className="text-muted text-[10px] lowercase mt-0.5">{selected.subtitle}</p>
          </div>
          <ul className="flex flex-col gap-3">
            {selected.items.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-xs">
                <span className="text-green-custom mt-0.5">↳</span>
                <div>
                  <span className="text-white font-bold lowercase block mb-0.5">{item.label}</span>
                  <span className="text-muted lowercase leading-relaxed">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function PricingSection() {
  const [aiTier, setAiTier] = React.useState('standard');
  const [promptsCount, setPromptsCount] = React.useState(30);
  const [workerType, setWorkerType] = React.useState('native');
  const [jobsCount, setJobsCount] = React.useState(100);

  const aiTiers = {
    standard: {
      name: 'standard chat',
      credits: 10,
      price: 0.10,
      model: 'Qwen3 8B Uncensored',
      infra: 'runs directly in-browser via WebGPU (local processing)'
    },
    pro: {
      name: 'pro chat',
      credits: 15,
      price: 0.15,
      model: 'Qwen3.5 27B / SuperGemma4 26B',
      infra: 'runs on dedicated native worker GPUs'
    },
    deep: {
      name: 'pro + deep think',
      credits: 20,
      price: 0.20,
      model: 'Qwen3.5 27B / SuperGemma4 26B',
      infra: 'runs on native GPUs with reasoning time'
    },
    image: {
      name: 'image generation',
      credits: 20,
      price: 0.20,
      model: 'ComfyUI / Stable Diffusion',
      infra: 'runs on native Image worker GPUs'
    }
  };

  const workerTypes = {
    browser: {
      name: 'browser worker',
      rate: 0.07,
      split: 70,
      requirements: 'open browser tab, WebGPU support'
    },
    native: {
      name: 'native worker',
      rate: 0.12,
      split: 70,
      requirements: 'terminal daemon, discrete GPU setup'
    },
    native_staking: {
      name: 'native + staking',
      rate: 0.137,
      split: 80,
      requirements: 'terminal daemon, stake >= 1,000,000 $PROXR'
    }
  };

  const selectedAi = aiTiers[aiTier];
  const selectedWorker = workerTypes[workerType];

  const dailyAiCost = promptsCount * selectedAi.price;
  const monthlyAiCost = dailyAiCost * 30;
  const dailyAiCredits = promptsCount * selectedAi.credits;
  const monthlyAiCredits = dailyAiCredits * 30;

  const dailyEarn = jobsCount * selectedWorker.rate;
  const weeklyEarn = dailyEarn * 7;
  const monthlyEarn = dailyEarn * 30;

  const totalRevenuePerJob = selectedWorker.rate / (selectedWorker.split / 100);
  const treasuryPerJob = totalRevenuePerJob * (1 - selectedWorker.split / 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-mono text-sm">
      {/* LEFT: Use AI Calculator */}
      <div className="bg-surface border border-border-custom rounded-lg p-6 flex flex-col justify-between gap-6 hover:border-white/10 transition-colors duration-300">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border-custom pb-3">
            <h3 className="text-white text-base font-bold lowercase">use AI simulator</h3>
            <span className="text-muted text-[10px]">1 credit = $0.01</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {Object.keys(aiTiers).map((tierKey) => (
              <button
                key={tierKey}
                onClick={() => setAiTier(tierKey)}
                className={`px-3 py-2.5 rounded text-xs border text-left lowercase transition-all duration-200 cursor-pointer ${
                  aiTier === tierKey
                    ? 'border-white bg-white text-black font-bold'
                    : 'border-border-custom hover:border-white/30 text-muted hover:text-white bg-transparent'
                }`}
              >
                <div className="truncate">{aiTiers[tierKey].name}</div>
                <div className={`text-[9px] mt-0.5 ${aiTier === tierKey ? 'text-black/70' : 'text-muted'}`}>
                  {aiTiers[tierKey].credits} credits / msg
                </div>
              </button>
            ))}
          </div>

          <div className="bg-[#050505] border border-border-custom/50 rounded p-3 text-xs leading-relaxed text-muted mt-2">
            <div className="text-white font-bold mb-1 lowercase">{selectedAi.model}</div>
            <div className="lowercase">{selectedAi.infra}</div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center justify-between text-xs lowercase">
              <span>prompts per day</span>
              <span className="text-white font-bold">{promptsCount}</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={promptsCount}
              onChange={(e) => setPromptsCount(Number(e.target.value))}
              className="w-full accent-white bg-surface-2 h-1 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="border-t border-border-custom pt-4 flex flex-col gap-2">
          <div className="flex justify-between text-xs text-muted lowercase">
            <span>daily cost</span>
            <span className="text-white">
              {dailyAiCredits.toLocaleString()} credits (${dailyAiCost.toFixed(2)})
            </span>
          </div>
          <div className="flex justify-between text-base font-bold lowercase">
            <span className="text-white">monthly estimate</span>
            <span className="text-green-custom">
              {monthlyAiCredits.toLocaleString()} credits (${monthlyAiCost.toFixed(2)})
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT: Earn Compute Calculator */}
      <div className="bg-surface border border-border-custom rounded-lg p-6 flex flex-col justify-between gap-6 hover:border-white/10 transition-colors duration-300">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border-custom pb-3">
            <h3 className="text-white text-base font-bold lowercase">earn compute calculator</h3>
            <span className="text-muted text-[10px]">solana USDC payouts</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {Object.keys(workerTypes).map((typeKey) => (
              <button
                key={typeKey}
                onClick={() => setWorkerType(typeKey)}
                className={`px-2 py-2.5 rounded text-xs border text-left lowercase transition-all duration-200 cursor-pointer ${
                  workerType === typeKey
                    ? 'border-green-custom bg-green-custom/10 text-green-custom font-bold'
                    : 'border-border-custom hover:border-white/30 text-muted hover:text-white bg-transparent'
                }`}
              >
                <div className="truncate">{workerTypes[typeKey].name}</div>
                <div className="text-[9px] mt-0.5 text-muted">
                  ~${workerTypes[typeKey].rate.toFixed(2)}/job
                </div>
              </button>
            ))}
          </div>

          <div className="bg-[#050505] border border-border-custom/50 rounded p-3 text-xs leading-relaxed text-muted mt-2">
            <div className="text-white font-bold mb-1 lowercase">requirements</div>
            <div className="lowercase">{selectedWorker.requirements}</div>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <div className="flex items-center justify-between text-xs lowercase">
              <span>jobs processed per day</span>
              <span className="text-white font-bold">{jobsCount}</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={jobsCount}
              onChange={(e) => setJobsCount(Number(e.target.value))}
              className="w-full accent-green-custom bg-surface-2 h-1 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <div className="border-t border-border-custom pt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[10px] text-muted lowercase">
              <span>revenue split breakdown</span>
              <span>
                worker {selectedWorker.split}% / treasury {100 - selectedWorker.split}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden flex">
              <div
                style={{ width: `${selectedWorker.split}%` }}
                className="h-full bg-green-custom transition-all duration-300"
              ></div>
              <div
                style={{ width: `${100 - selectedWorker.split}%` }}
                className="h-full bg-muted transition-all duration-300"
              ></div>
            </div>
            <div className="flex gap-4 text-[9px] text-muted lowercase mt-0.5">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-custom inline-block"></span>
                <span>worker: ~${selectedWorker.rate.toFixed(3)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-muted inline-block"></span>
                <span>treasury: ~${treasuryPerJob.toFixed(3)}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 border-t border-border-custom/50 pt-3">
            <div className="flex justify-between text-xs text-muted lowercase">
              <span>weekly estimate</span>
              <span className="text-white">${weeklyEarn.toFixed(2)} USDC</span>
            </div>
            <div className="flex justify-between text-base font-bold lowercase">
              <span className="text-white font-bold">monthly estimate</span>
              <span className="text-green-custom font-bold">${monthlyEarn.toFixed(2)} USDC</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GridBackground() {
  const cells = React.useMemo(() => {
    return Array.from({ length: 300 }).map((_, i) => ({
      id: i,
      delay: `${Math.random() * 8}s`,
      duration: `${4 + Math.random() * 6}s`,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <div className="w-[120%] h-[120%] -translate-x-[10%] -translate-y-[10%] grid grid-cols-[repeat(auto-fill,minmax(56px,1fr))] auto-rows-[42px] gap-2 p-4 justify-center">
        {cells.map((cell) => (
          <div
            key={cell.id}
            className="w-full h-full rounded-[6px] border border-white/[0.03] bg-transparent p-[2px] relative"
          >
            <div
              className="w-full h-full rounded-[4px] bg-[#10b981] animate-grid-glow"
              style={{
                animationDelay: cell.delay,
                animationDuration: cell.duration,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const { authenticated, login } = usePrivy();
  const { networkStats } = useMockStore();
  const { showSuccess } = useToast();

  const handleGetStarted = () => {
    if (!authenticated) {
      login();
      showSuccess('wallet connected successfully');
    }
    navigate('/earn');
  };

  return (
    <div className="flex flex-col min-h-screen page-transition">
      <div className="w-full relative overflow-hidden border-b border-border-custom bg-black">
        <GridBackground />
        <section className="relative max-w-5xl mx-auto px-4 pt-20 pb-16 text-center flex flex-col items-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-tight text-white mb-6 lowercase max-w-4xl leading-tight">
            your gpu. <br className="sm:hidden" />
            your rules. <br className="sm:hidden" />
            your earnings.
          </h1>
          
          <p className="text-muted text-base md:text-lg max-w-2xl mb-8 font-mono lowercase leading-relaxed">
            a peer-to-peer GPU network. contribute compute, earn USDC. use private, uncensored AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              to="/compute"
              className="bg-white hover:bg-off-white text-black font-bold font-mono text-sm px-6 py-3 rounded transition-all lowercase flex items-center justify-center gap-2"
            >
              start computing <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/earn"
              className="border border-border-custom hover:bg-hover text-white font-mono text-sm px-6 py-3 rounded transition-all lowercase"
            >
              start earning
            </Link>
          </div>

          <div className="bg-surface border border-border-custom px-4 py-2 rounded-full shadow-md">
            <NetworkPulse />
          </div>
        </section>
      </div>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <h2 className="text-xs text-muted uppercase font-mono tracking-wider mb-8 text-center">
          how it works
        </h2>
        
        <HowItWorksSection />
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full border-t border-border-custom">
        <h2 className="text-xs text-muted uppercase font-mono tracking-wider mb-12 text-center">
          features
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: people-powered ai */}
          <div className="bg-surface border border-border-custom rounded-lg p-6 lg:col-span-2 flex flex-col md:flex-row items-stretch justify-between gap-6 overflow-hidden relative group hover:border-white/20 transition-all duration-300 min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between font-mono gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Network className="w-5 h-5 text-white" />
                  <h3 className="text-white text-base font-bold lowercase">people-powered ai</h3>
                </div>
                <p className="text-muted text-xs md:text-sm lowercase leading-relaxed">
                  imagine a GPU cloud — but instead of renting from AWS or Google, you're tapping into the idle GPUs of people around the world. compute for the people, by the people.
                </p>
              </div>
              <div className="text-[10px] text-muted border-t border-border-custom/50 pt-3 flex items-center gap-2 mt-4">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-custom animate-pulse"></span>
                decentralized worker nodes active
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[180px] md:min-h-0">
              <PeoplePoweredAiIllustration />
            </div>
          </div>

          {/* Card 2: private by design */}
          <div className="bg-surface border border-border-custom rounded-lg p-6 lg:col-span-1 flex flex-col justify-between gap-4 overflow-hidden relative group hover:border-white/20 transition-all duration-300 min-h-[300px]">
            <div className="flex flex-col gap-2 font-mono">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-white" />
                <h3 className="text-white text-base font-bold lowercase">private by design</h3>
              </div>
              <p className="text-muted text-xs md:text-sm lowercase leading-relaxed">
                your prompts are never stored — they pass through and disappear. workers only see raw text with no identity or metadata.
              </p>
            </div>
            <div className="flex items-center justify-center w-full mt-auto">
              <PrivateByDesignIllustration />
            </div>
          </div>

          {/* Card 3: in-browser */}
          <div className="bg-surface border border-border-custom rounded-lg p-6 lg:col-span-1 flex flex-col justify-between gap-4 overflow-hidden relative group hover:border-white/20 transition-all duration-300 min-h-[300px]">
            <div className="flex flex-col gap-2 font-mono">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-white" />
                <h3 className="text-white text-base font-bold lowercase">in-browser</h3>
              </div>
              <p className="text-muted text-xs md:text-sm lowercase leading-relaxed">
                no downloads. just open the website and start earning. run lightweight models via WebGPU directly in your tab.
              </p>
            </div>
            <div className="w-full flex justify-center mt-auto">
              <InBrowserIllustration />
            </div>
          </div>

          {/* Card 4: get paid for your compute */}
          <div className="bg-surface border border-border-custom rounded-lg p-6 lg:col-span-2 flex flex-col md:flex-row items-stretch justify-between gap-6 overflow-hidden relative group hover:border-white/20 transition-all duration-300 min-h-[300px]">
            <div className="flex-1 flex flex-col justify-between font-mono gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Coins className="w-5 h-5 text-white" />
                  <h3 className="text-white text-base font-bold lowercase">get paid for your compute</h3>
                </div>
                <p className="text-muted text-xs md:text-sm lowercase leading-relaxed">
                  lend your GPU to the network. every time a job is processed, get paid in USDC. earn up to 10x more as a native worker.
                </p>
              </div>
              <div className="text-[10px] text-muted border-t border-border-custom/50 pt-3 flex items-center gap-2 mt-4">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-custom"></span>
                payouts directly to your connected wallet
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-[180px] md:min-h-0">
              <GetPaidForYourComputeIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full border-t border-border-custom">
        <h2 className="text-xs text-muted uppercase font-mono tracking-wider mb-12 text-center">
          pricing & earnings
        </h2>

        <PricingSection />
      </section>

      {/* Stats Bar */}
      <section className="bg-surface border-y border-border-custom py-8 w-full font-mono text-center mb-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-muted text-[10px] uppercase tracking-wider">
              $PROXR burned
            </span>
            <span className="text-white text-xl md:text-2xl font-bold">
              {networkStats.proxrBurned.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-muted text-[10px] uppercase tracking-wider">
              total staked
            </span>
            <span className="text-white text-xl md:text-2xl font-bold">
              {networkStats.totalStaked.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-muted text-[10px] uppercase tracking-wider">
              workers ever online
            </span>
            <span className="text-white text-xl md:text-2xl font-bold">
              {networkStats.workersEver.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-muted text-[10px] uppercase tracking-wider">
              total USDC paid out
            </span>
            <span className="text-white text-xl md:text-2xl font-bold">
              ${networkStats.totalPaidOut.toLocaleString()}
            </span>
          </div>
        </div>
      </section>



      {/* Footer */}
      <Footer />
    </div>
  );
}
