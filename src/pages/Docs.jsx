import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Cpu, 
  Terminal, 
  Coins, 
  Shield, 
  Link as LinkIcon, 
  ChevronRight,
  HelpCircle,
  Hash,
  Layers,
  Copy,
  Check
} from 'lucide-react';

// Subcomponent 1: Interactive Terminal Playground
function TerminalPlayground() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'proxr local client shell v1.0.0' },
    { type: 'output', text: 'type "proxr --help" or click a command below to test' }
  ]);

  const runCommand = (cmd) => {
    const newHistory = [...history, { type: 'input', text: cmd }];
    
    if (cmd === 'proxr --help') {
      newHistory.push(
        { type: 'output', text: 'usage: proxr [options] [instruction]' },
        { type: 'output', text: 'commands:' },
        { type: 'output', text: '  /init        initialize project memory configuration' },
        { type: 'output', text: '  /workspace   print local coding session records' },
        { type: 'output', text: '  /login       configure account access token' },
        { type: 'output', text: '  /help        show helper list' }
      );
    } else if (cmd === '/init') {
      newHistory.push(
        { type: 'output', text: 'creating configuration folder .proxr/ ... done' },
        { type: 'output', text: 'writing project memory file proxr.md ... done' },
        { type: 'output', text: 'project initialized successfully.' }
      );
    } else if (cmd === '/workspace') {
      newHistory.push(
        { type: 'output', text: '> reading journal.md...' },
        { type: 'output', text: '[session #184]: completed 4 edits, verified 2 test runs.' },
        { type: 'output', text: 'all files compiled cleanly.' }
      );
    } else if (cmd.startsWith('proxr ')) {
      newHistory.push(
        { type: 'output', text: '> scanning project directory... done' },
        { type: 'output', text: '> redacting private credentials... done' },
        { type: 'output', text: '> requesting GPU worker matchmaking... done' },
        { type: 'output', text: '> worker M3Max-1428 connected (48 tok/s)' },
        { type: 'output', text: '> streaming edits:' },
        { type: 'diff-add', text: '+ const response = await proxr.chat.completions.create({ model: "proxr-pro" });' },
        { type: 'diff-del', text: '- const response = await fetch("https://api.openai.com/v1/chat/completions");' },
        { type: 'output', text: '> running tests... success (6 passed)' },
        { type: 'output', text: 'task completed successfully in 1.4s.' }
      );
    } else {
      newHistory.push({ type: 'output', text: `command not recognized: ${cmd}` });
    }
    
    setHistory(newHistory);
  };

  return (
    <div className="bg-[#050505] border border-border-custom rounded-lg p-4 font-mono text-[11px] leading-relaxed w-full flex flex-col gap-3 my-2">
      <div className="flex items-center justify-between border-b border-border-custom pb-2 text-muted">
        <span className="text-[10px] lowercase">proxr-cli interactive simulation</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
        </div>
      </div>
      
      <div className="h-[140px] overflow-y-auto flex flex-col gap-1 pr-2">
        {history.map((line, idx) => (
          <div 
            key={idx} 
            className={
              line.type === 'input' 
                ? 'text-white font-bold' 
                : line.type === 'diff-add' 
                  ? 'text-green-custom bg-green-custom/5 px-1.5 py-0.5 rounded font-bold' 
                  : line.type === 'diff-del' 
                    ? 'text-error bg-error/5 px-1.5 py-0.5 rounded font-bold' 
                    : 'text-muted'
            }
          >
            {line.type === 'input' ? '$ ' : '> '}
            {line.text}
          </div>
        ))}
      </div>

      <div className="border-t border-border-custom pt-3 flex flex-wrap gap-2">
        <button 
          onClick={() => runCommand('proxr --help')} 
          className="px-2 py-1 rounded bg-[#10b981]/10 border border-[#10b981]/30 hover:bg-[#10b981]/20 text-white cursor-pointer lowercase text-[10px]"
        >
          proxr --help
        </button>
        <button 
          onClick={() => runCommand('/init')} 
          className="px-2 py-1 rounded bg-surface border border-border-custom hover:border-white/20 text-white cursor-pointer lowercase text-[10px]"
        >
          /init
        </button>
        <button 
          onClick={() => runCommand('/workspace')} 
          className="px-2 py-1 rounded bg-surface border border-border-custom hover:border-white/20 text-white cursor-pointer lowercase text-[10px]"
        >
          /workspace
        </button>
        <button 
          onClick={() => runCommand('proxr "optimize grid background"')} 
          className="px-2 py-1 rounded bg-surface border border-border-custom hover:border-white/20 text-white cursor-pointer lowercase text-[10px]"
        >
          proxr "optimize grid"
        </button>
      </div>
    </div>
  );
}

// Subcomponent 2: Interactive Secrets Redactor
function PrivacySandbox() {
  const [code, setCode] = useState(
    `const stripe_key = "stripe_api_key_placeholder";\nconst email = "user.developer@gmail.com";\nconst db_pass = "my_password_secr3t";`
  );

  const redact = (input) => {
    let result = input;
    // Redact Stripe/API Keys
    result = result.replace(/(sk_[a-zA-Z0-9]+)/gi, '[REDACTED_API_KEY]');
    // Redact password lines
    result = result.replace(/(pass\w*\s*=\s*["'])([^"'\n]+)(["'])/gi, '$1[REDACTED_PASSWORD]$3');
    // Redact email structures
    result = result.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '[REDACTED_EMAIL]');
    return result;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 font-mono text-xs w-full">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] text-muted lowercase">local codebase editor (try typing secrets):</span>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-[100px] p-3 rounded-lg border border-border-custom bg-[#050505] text-white focus:outline-none focus:border-white/20 resize-none leading-relaxed"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] text-muted lowercase">network transmission (GPU worker snippet view):</span>
        <pre className="w-full h-[100px] p-3 rounded-lg border border-border-custom bg-[#020202] text-green-custom overflow-y-auto whitespace-pre-wrap leading-relaxed select-all">
          {redact(code)}
        </pre>
      </div>
    </div>
  );
}

// Subcomponent 3: Interactive Staking Yield Calculator
function DocsStakingCalculator() {
  const [stakeAmount, setStakeAmount] = useState(100000);

  const dailyCredits = Math.floor(stakeAmount * 0.005);
  const dailyUsdc = (stakeAmount * 0.000138).toFixed(2);

  return (
    <div className="border border-border-custom bg-[#050505] p-4 rounded-lg flex flex-col gap-4 text-xs font-mono w-full leading-relaxed my-3">
      <div className="flex justify-between items-center border-b border-border-custom pb-2">
        <span className="text-white font-bold lowercase">staking yields simulation</span>
        <span className="text-[10px] text-muted lowercase">solana vault calculator</span>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-[10px] lowercase">
          <span>stake allocation</span>
          <span className="text-white font-bold">{Number(stakeAmount).toLocaleString()} $PROXR</span>
        </div>
        <input
          type="range"
          min="10000"
          max="5000000"
          step="10000"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(Number(e.target.value))}
          className="w-full accent-white bg-surface-2 h-1 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border-custom/40">
        <div>
          <span className="text-[10px] text-muted block lowercase">daily credits grant</span>
          <span className="text-white font-bold text-xs md:text-sm font-mono">+{dailyCredits.toLocaleString()} credits</span>
          <span className="text-[9px] text-muted block mt-0.5 lowercase">worth ${(dailyCredits * 0.01).toFixed(2)} USDC</span>
        </div>
        <div>
          <span className="text-[10px] text-muted block lowercase">daily USDC dividends</span>
          <span className="text-green-custom font-bold text-xs md:text-sm font-mono">+${Number(dailyUsdc).toLocaleString()} USDC</span>
          <span className="text-[9px] text-muted block mt-0.5 lowercase">accumulates in vault</span>
        </div>
      </div>
    </div>
  );
}

// Subcomponent 4: Brand Palette Copy board
function BrandPalette() {
  const colors = [
    { name: 'Pure Black', hex: '#000000', desc: 'Main page background' },
    { name: 'Near Black', hex: '#0F0F0F', desc: 'Card / panel background' },
    { name: 'Dark Surface', hex: '#1A1A1A', desc: 'Elevated secondary cards' },
    { name: 'Pure White', hex: '#FFFFFF', desc: 'Primary text, logo' },
    { name: 'Off White', hex: '#F5F5F5', desc: 'Text on dark surfaces' },
    { name: 'Muted Text', hex: '#888888', desc: 'Secondary captions' },
    { name: 'Success / Earning', hex: '#22C55E', desc: 'Connected status pill' }
  ];

  const [copied, setCopied] = useState('');

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3 w-full">
      {colors.map((color) => {
        const isCopied = copied === color.hex;
        return (
          <button
            key={color.hex}
            onClick={() => copyToClipboard(color.hex)}
            className="border border-border-custom bg-[#050505] hover:border-white/10 rounded-lg p-3 text-left flex items-center gap-3 transition-colors cursor-pointer select-none"
          >
            <div 
              className="w-8 h-8 rounded border border-white/10 shrink-0" 
              style={{ backgroundColor: color.hex }}
            />
            <div className="flex-1 min-w-0 font-mono text-[10px]">
              <div className="text-white font-bold truncate lowercase">{color.name}</div>
              <div className="text-muted flex items-center justify-between mt-0.5">
                <span>{color.hex}</span>
                <span className="text-[8px] text-green-custom flex items-center gap-0.5">
                  {isCopied ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                  {isCopied ? 'copied' : 'copy'}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function Docs() {
  const [activeSection, setActiveSection] = useState('what-is-proxr');

  const sections = [
    { id: 'what-is-proxr', label: '1. what is proxr?', icon: HelpCircle },
    { id: 'compute', label: '2. compute — run ai', icon: Cpu },
    { id: 'create', label: '3. create — image gen', icon: Layers },
    { id: 'earn', label: '4. earn — gpu sharing', icon: Coins },
    { id: 'cli', label: '5. proxr cli — local agent', icon: Terminal },
    { id: 'token', label: '6. token $PROXR', icon: Coins },
    { id: 'staking', label: '7. staking vault', icon: Shield },
    { id: 'referral', label: '8. referral codes', icon: LinkIcon },
    { id: 'under-the-hood', label: '9. under the hood', icon: Terminal },
    { id: 'pricing-summary', label: '10. pricing summary', icon: Layers },
    { id: 'brand-kit', label: '11. brand kit guidelines', icon: BookOpen },
  ];

  useEffect(() => {
    const container = document.getElementById('docs-content-container');
    if (!container) return;

    const observerOptions = {
      root: container,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sectionElements = document.querySelectorAll('.doc-section');
    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      sectionElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="flex-1 flex w-full h-[calc(100vh-69px)] overflow-hidden font-mono page-transition bg-black">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-[280px] shrink-0 border-r border-border-custom bg-[#050505] flex-col justify-between h-full py-6">
        <div className="flex flex-col gap-1 px-4">
          <div className="text-[10px] text-muted uppercase tracking-wider font-bold mb-4 px-3">
            documentation
          </div>
          <nav className="flex flex-col gap-0.5">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center justify-between text-left px-3 py-2 rounded text-xs lowercase transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-white text-black font-bold' 
                      : 'text-muted hover:text-white hover:bg-hover'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="truncate">{section.label}</span>
                  </span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="px-6 text-[10px] text-muted lowercase">
          v1.0.0 • updated june 2026
        </div>
      </aside>

      {/* Main Content Pane */}
      <main 
        id="docs-content-container" 
        className="flex-1 overflow-y-auto h-full p-6 md:p-12 text-left text-muted leading-relaxed scroll-smooth flex flex-col gap-16 select-text"
      >
        {/* Section 1: What is proxr? */}
        <section id="what-is-proxr" className="doc-section flex flex-col gap-4">
          <div className="border-b border-border-custom pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 lowercase">
              <Hash className="w-5 h-5 text-muted" /> 1. what is proxr?
            </h1>
          </div>
          <blockquote className="border-l-2 border-white pl-4 italic text-white/90 text-sm my-2 lowercase">
            "your gpu. your rules. your earnings."<br />
            a decentralized gpu compute marketplace — rent out your hardware, power the ai economy.
          </blockquote>
          <p className="lowercase">
            imagine a gpu cloud — but instead of renting from aws or google, you're tapping into the idle gpus of people around the world. people like you.
          </p>
          <p className="lowercase font-bold text-white mt-2">
            the problem proxr solves:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 lowercase">
            <li>big cloud providers charge a premium for compute that's often sitting underutilized anyway.</li>
            <li>most ai platforms store your prompts, log your usage, and can cut your access at any time.</li>
            <li>centralized infra means centralized control — one company decides what's allowed.</li>
          </ul>
          <p className="lowercase font-bold text-white mt-2">
            how proxr is different:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 lowercase">
            <li>your prompts are <strong className="text-white">never stored</strong> — they pass through and disappear.</li>
            <li>workers (gpu contributors) only see raw text — <strong className="text-white">no identity, no metadata</strong>.</li>
            <li>no single company controls the network. no one can deplatform you.</li>
            <li>models run <strong className="text-white">uncensored</strong> — no corporate filter deciding what you're allowed to ask.</li>
          </ul>
        </section>

        {/* Section 2: Compute */}
        <section id="compute" className="doc-section flex flex-col gap-4">
          <div className="border-b border-border-custom pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 lowercase">
              <Hash className="w-5 h-5 text-muted" /> 2. compute — run ai workloads
            </h1>
          </div>
          <p className="lowercase">
            go to <span className="text-white font-bold">proxr.app/compute</span> and start using ai instantly. no setup required.
          </p>
          <h3 className="text-white font-bold lowercase mt-2">getting started:</h3>
          <ol className="list-decimal pl-5 flex flex-col gap-1.5 lowercase">
            <li>visit the site → get <strong className="text-white">5 free prompts</strong> with no account required.</li>
            <li>type your message and hit send.</li>
            <li>want more? create an account and top up with credits.</li>
          </ol>
          <h3 className="text-white font-bold lowercase mt-2">credit system:</h3>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 lowercase">
            <li><strong className="text-white">1 credit = $0.01</strong> (one us cent)</li>
            <li>purchased with <strong className="text-white">usdc</strong> (solana stablecoin)</li>
            <li>credits never expire and failed jobs are automatically refunded</li>
          </ul>
          <h3 className="text-white font-bold lowercase mt-2">model tiers:</h3>
          <div className="flex flex-col gap-4 mt-2">
            <div className="bg-[#050505] border border-border-custom rounded-lg p-4">
              <div className="text-white font-bold lowercase mb-1">standard — 10 credits/message</div>
              <p className="lowercase text-xs">
                model: <strong>qwen3 8b uncensored</strong> • runs directly in your browser via WebGPU (local secure client processing, fast & free of accounts).
              </p>
            </div>
            <div className="bg-[#050505] border border-border-custom rounded-lg p-4">
              <div className="text-white font-bold lowercase mb-1">pro — 15 credits/message (20 with deep think)</div>
              <p className="lowercase text-xs">
                models: <strong>qwen3.5 27b</strong> or <strong>supergemma4 26b</strong> • runs on dedicated native worker gpus. supports: <strong>web search</strong> (live internet results), <strong>vision</strong> (image inputs), and <strong>deep thinking</strong> (reasoning loops).
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Create */}
        <section id="create" className="doc-section flex flex-col gap-4">
          <div className="border-b border-border-custom pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 lowercase">
              <Hash className="w-5 h-5 text-muted" /> 3. create — ai image generation
            </h1>
          </div>
          <p className="lowercase">
            go to <span className="text-white font-bold">proxr.app/create</span> to generate images with ai.
          </p>
          <blockquote className="border-l-2 border-white pl-4 italic text-white/95 text-xs my-2 lowercase">
            price: 20 credits = $0.20 per image. images are returned directly to your browser and never stored on proxr servers.
          </blockquote>
          <h3 className="text-white font-bold lowercase mt-2">custom parameters:</h3>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 lowercase">
            <li><strong className="text-white">style:</strong> choose from photo, cinematic, anime, digital art, 3d, or open prompt.</li>
            <li><strong className="text-white">aspect ratio:</strong> square, portrait, or landscape bounds.</li>
            <li><strong className="text-white">nsfw toggle:</strong> support toggle for adult prompts (18+). content involving minors is blocked.</li>
            <li><strong className="text-white">advanced parameters:</strong> negative prompts, steps (iterations, default: 32), guidance (default: 4.0), and seeds for reproducible outputs.</li>
          </ul>
        </section>

        {/* Section 4: Earn */}
        <section id="earn" className="doc-section flex flex-col gap-4">
          <div className="border-b border-border-custom pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 lowercase">
              <Hash className="w-5 h-5 text-muted" /> 4. earn — make money from your gpu
            </h1>
          </div>
          <p className="lowercase">
            go to <span className="text-white font-bold">proxr.app/earn</span> to lend your hardware and earn payouts directly in solana <strong>usdc</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="border border-border-custom bg-[#050505] p-5 rounded-lg flex flex-col justify-between">
              <div>
                <div className="text-green-custom font-bold lowercase mb-2">option 1: native worker ⚡</div>
                <div className="text-white text-xs lowercase mb-4">earnings: $0.10 - $0.14 per job processed</div>
                <p className="lowercase text-xs mb-4">
                  run the proxr daemon script in your terminal. utilizes cuda, metal, or vulkan via ollama directly in the background.
                </p>
              </div>
              <ul className="list-disc pl-4 text-[11px] flex flex-col gap-1 lowercase">
                <li>up to 10x higher earnings</li>
                <li>runs quietly in system background</li>
                <li>handles heavy 27B pro models</li>
              </ul>
            </div>
            <div className="border border-border-custom bg-[#050505] p-5 rounded-lg flex flex-col justify-between">
              <div>
                <div className="text-white font-bold lowercase mb-2">option 2: browser worker</div>
                <div className="text-white text-xs lowercase mb-4">earnings: $0.07 per job processed</div>
                <p className="lowercase text-xs mb-4">
                  no setup. just open the earn dashboard tab. runs lightweight qwen3 8b models directly in-browser using WebGPU.
                </p>
              </div>
              <ul className="list-disc pl-4 text-[11px] flex flex-col gap-1 lowercase">
                <li>zero installations</li>
                <li>tab must stay active</li>
                <li>ideal for laptops / apple silicon</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: CLI */}
        <section id="cli" className="doc-section flex flex-col gap-4">
          <div className="border-b border-border-custom pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 lowercase">
              <Hash className="w-5 h-5 text-muted" /> 5. proxr cli — local coding agent
            </h1>
          </div>
          <p className="lowercase">
            proxr ships a powerful coding agent command line utility. it handles operations locally on your project files while requesting AI inferences from the decentralized GPU grid.
          </p>

          <TerminalPlayground />

          <h3 className="text-white font-bold lowercase mt-2">features & behaviors:</h3>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 lowercase">
            <li><strong className="text-white">safe local sandbox:</strong> the agent prompts you for approval before editing files or running terminal test suites.</li>
            <li><strong className="text-white">reverts on errors:</strong> if edits cause compiling errors, the agent auto-reverts changes immediately.</li>
            <li><strong className="text-white">auto secrets redaction:</strong> local files are scanned and private variables, API keys, or `.env` details are automatically stripped before query dispatches.</li>
          </ul>

          <PrivacySandbox />

          <h3 className="text-white font-bold lowercase mt-4">cli command guide:</h3>
          <div className="overflow-x-auto border border-border-custom rounded-lg bg-[#050505] text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-custom bg-white/5 text-white lowercase">
                  <th className="p-3 border-r border-border-custom">command</th>
                  <th className="p-3">function</th>
                </tr>
              </thead>
              <tbody className="lowercase">
                <tr className="border-b border-border-custom">
                  <td className="p-3 border-r border-border-custom text-white font-mono">/init</td>
                  <td className="p-3">generate project configuration file (proxr.md)</td>
                </tr>
                <tr className="border-b border-border-custom">
                  <td className="p-3 border-r border-border-custom text-white font-mono">/workspace</td>
                  <td className="p-3">view local coding journal session records</td>
                </tr>
                <tr className="border-b border-border-custom">
                  <td className="p-3 border-r border-border-custom text-white font-mono">/login</td>
                  <td className="p-3">configure user account api key credentials</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-border-custom text-white font-mono">/help</td>
                  <td className="p-3">print help menu of terminal operations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: Token $PROXR */}
        <section id="token" className="doc-section flex flex-col gap-4">
          <div className="border-b border-border-custom pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 lowercase">
              <Hash className="w-5 h-5 text-muted" /> 6. token $PROXR — network economy
            </h1>
          </div>
          <p className="lowercase">
            <strong className="text-white">$PROXR</strong> is the utility token designed to capture network value. it is not used to pay for compute directly (that uses stable USDC credits) but serves to reward participants and back the protocol.
          </p>
          <div className="border border-border-custom rounded-lg p-5 bg-[#050505] leading-relaxed">
            <div className="text-white font-bold mb-2 lowercase">how does the treasury accumulate value?</div>
            <ul className="list-decimal pl-4 flex flex-col gap-2 text-xs lowercase">
              <li><strong>compute margin:</strong> every completed job routes 70% (or 80% if worker is staking) of credits to the worker, and the rest (30% or 20%) is sent to the network treasury.</li>
              <li><strong>trading fees:</strong> 35% of all market trading fees are directed to the treasury.</li>
            </ul>
          </div>
          <p className="lowercase">
            treasury balances are split 50/50 every day: 50% is used to purchase $PROXR and burn it (supply contraction), and 50% is paid out as staking rewards in USDC.
          </p>
        </section>

        {/* Section 7: Staking */}
        <section id="staking" className="doc-section flex flex-col gap-4">
          <div className="border-b border-border-custom pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 lowercase">
              <Hash className="w-5 h-5 text-muted" /> 7. staking — passive income
            </h1>
          </div>
          <p className="lowercase">
            users can lock $PROXR directly into their self-custody on-chain staking vaults to participate in network dividends.
          </p>

          <DocsStakingCalculator />

          <h3 className="text-white font-bold lowercase mt-2">staking rewards & benefits:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 text-xs">
            <div className="border border-border-custom bg-[#050505] p-4 rounded-lg">
              <div className="text-white font-bold lowercase mb-2">1. daily usdc</div>
              <p className="lowercase leading-relaxed">
                receive daily dividend distributions in USDC directly on solana.
              </p>
            </div>
            <div className="border border-border-custom bg-[#050505] p-4 rounded-lg">
              <div className="text-white font-bold lowercase mb-2">2. free credits</div>
              <p className="lowercase leading-relaxed">
                receive free daily credit vouchers to query standard/pro models.
              </p>
            </div>
            <div className="border border-border-custom bg-[#050505] p-4 rounded-lg">
              <div className="text-white font-bold lowercase mb-2">3. worker boost</div>
              <p className="lowercase leading-relaxed">
                stake at least 1,000,000 $PROXR to boost your worker share from 70% to 80% per job.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Referral */}
        <section id="referral" className="doc-section flex flex-col gap-4">
          <div className="border-b border-border-custom pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 lowercase">
              <Hash className="w-5 h-5 text-muted" /> 8. referral — invite & earn
            </h1>
          </div>
          <p className="lowercase">
            share your referral link (<code className="bg-surface px-1.5 py-0.5 rounded text-white text-xs">proxr.app/r/[code]</code>) to earn commissions.
          </p>
          <blockquote className="border-l-2 border-white pl-4 italic text-white/95 text-xs my-2 lowercase">
            you earn 5% of every prompt/image generation/API call paid for by your referrers, forever.
          </blockquote>
          <p className="lowercase">
            commissions are extracted directly from the protocol treasury share, so referring does not impact worker job earnings.
          </p>
        </section>

        {/* Section 9: Under the Hood */}
        <section id="under-the-hood" className="doc-section flex flex-col gap-4">
          <div className="border-b border-border-custom pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 lowercase">
              <Hash className="w-5 h-5 text-muted" /> 9. how it works under the hood
            </h1>
          </div>
          <p className="lowercase">
            the protocol coordinates connections between client interfaces, decentralized gpu workers, and routing dispatchers.
          </p>
          <div className="bg-[#050505] border border-border-custom rounded-lg p-5">
            <div className="text-white font-bold mb-3 lowercase">network components:</div>
            <ul className="flex flex-col gap-3 text-xs lowercase">
              <li>
                <strong className="text-white">user client:</strong>
                <span className="block mt-1 text-muted">queries models, connects via privy wallet auth, and receives streamed tokens over socket.io connections.</span>
              </li>
              <li>
                <strong className="text-white">orchestrator routing:</strong>
                <span className="block mt-1 text-muted">matches jobs based on worker speed benchmarks, handles queue depths, manages Brave Search context tools, and preserves zero conversation logs.</span>
              </li>
              <li>
                <strong className="text-white">gpu workers:</strong>
                <span className="block mt-1 text-muted">processes inferences inside sandboxed ollama, comfyui, or browser WebGPU runners and streams outputs back.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 10: Pricing Summary */}
        <section id="pricing-summary" className="doc-section flex flex-col gap-4">
          <div className="border-b border-border-custom pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 lowercase">
              <Hash className="w-5 h-5 text-muted" /> 10. pricing & split summary
            </h1>
          </div>
          <h3 className="text-white font-bold lowercase mt-2">ai query pricing:</h3>
          <div className="overflow-x-auto border border-border-custom rounded-lg bg-[#050505] text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border-custom bg-white/5 text-white lowercase">
                  <th className="p-3 border-r border-border-custom">tier name</th>
                  <th className="p-3">credits (price)</th>
                </tr>
              </thead>
              <tbody className="lowercase">
                <tr className="border-b border-border-custom">
                  <td className="p-3 border-r border-border-custom text-white">chat standard (8B WebGPU)</td>
                  <td className="p-3">10 credits ($0.10) / msg</td>
                </tr>
                <tr className="border-b border-border-custom">
                  <td className="p-3 border-r border-border-custom text-white">chat pro (27B GPU)</td>
                  <td className="p-3">15 credits ($0.15) / msg</td>
                </tr>
                <tr className="border-b border-border-custom">
                  <td className="p-3 border-r border-border-custom text-white">chat pro + deep think</td>
                  <td className="p-3">20 credits ($0.20) / msg</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-border-custom text-white">image generation</td>
                  <td className="p-3">20 credits ($0.20) / img</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 11: Brand Kit */}
        <section id="brand-kit" className="doc-section flex flex-col gap-4 font-mono">
          <div className="border-b border-border-custom pb-2">
            <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2 lowercase">
              <Hash className="w-5 h-5 text-muted" /> 11. brand kit & guidelines
            </h1>
          </div>
          <h3 className="text-white font-bold lowercase mt-2">writing guidelines:</h3>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 lowercase text-xs">
            <li>brand name: <strong className="text-white">proxr</strong> (always lowercase, even at sentence start).</li>
            <li>network token symbol: <strong className="text-white">$PROXR</strong> (always capitalized, prefixed by dollar sign).</li>
            <li>npm cli library: <strong className="text-white">proxr cli</strong> (always lowercase).</li>
          </ul>
          
          <h3 className="text-white font-bold lowercase mt-3">color guidelines (click to copy):</h3>
          
          <BrandPalette />

          <h3 className="text-white font-bold lowercase mt-4">voice & tone:</h3>
          <ul className="list-disc pl-5 flex flex-col gap-1.5 lowercase text-xs">
            <li><strong className="text-white">lowercase-first:</strong> informal copy uses lowercase letters.</li>
            <li><strong className="text-white">direct & short:</strong> brief structural syntax. avoid corporate marketing jargon.</li>
            <li><strong className="text-white">anti-corporate cloud:</strong> highlight privacy control over third-party distributed cloud grids.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
