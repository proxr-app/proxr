import React, { useState, useEffect } from 'react';
import { useMockStore } from '../lib/mockStore';
import { usePrivy } from '../lib/auth';
import { useToast } from '../components/ui/ToastProvider';
import { 
  Cpu, 
  Terminal, 
  Play, 
  Square, 
  Copy, 
  Check, 
  AlertTriangle, 
  Coins, 
  ExternalLink,
  Lock
} from 'lucide-react';

export default function Earn() {
  const { 
    workerStatus, 
    workerJobs, 
    workerEarnings, 
    toggleWorker, 
    withdrawEarnings,
    referralEarnings
  } = useMockStore();
  const { authenticated, login } = usePrivy();
  const { showSuccess, showError } = useToast();

  const [workerType, setWorkerType] = useState('browser'); // 'browser' or 'native'
  
  // Local Browser Worker stats
  const [tps, setTps] = useState(0);
  const [uptime, setUptime] = useState(0);

  // Native Worker states
  const [hasGeneratedToken, setHasGeneratedToken] = useState(false);
  const [copied, setCopied] = useState(false);
  const [nativeConnected, setNativeConnected] = useState(false);
  const [nativeJobs, setNativeJobs] = useState(0);
  const [nativeEarnings, setNativeEarnings] = useState(0.00);
  const [nativeUptime, setNativeUptime] = useState(0);

  const mockToken = "prxw_7f3k9x2mq8y73bd8e92c4f82637b7d1234567890";
  const startCommand = `npx @proxr/worker --token=${mockToken}`;

  // Browser Worker speed fluctuation
  useEffect(() => {
    let interval;
    if (workerStatus === 'online') {
      setTps(Math.floor(Math.random() * 15) + 18); // 18-32
      interval = setInterval(() => {
        setTps(Math.floor(Math.random() * 15) + 18);
        setUptime(prev => prev + 1);
      }, 1000);
    } else {
      setTps(0);
      setUptime(0);
    }
    return () => clearInterval(interval);
  }, [workerStatus]);

  // Native Worker simulated activity
  useEffect(() => {
    let interval;
    if (nativeConnected) {
      interval = setInterval(() => {
        setNativeUptime(prev => prev + 1);
        // Randomly process a job
        if (Math.random() > 0.8) {
          setNativeJobs(prev => prev + 1);
          setNativeEarnings(prev => {
            const earnings = prev + (Math.random() * 0.04 + 0.10); // $0.10-$0.14
            return parseFloat(earnings.toFixed(2));
          });
        }
      }, 1000);
    } else {
      setNativeUptime(0);
    }
    return () => clearInterval(interval);
  }, [nativeConnected]);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(startCommand);
    setCopied(true);
    showSuccess('command copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWithdraw = () => {
    const success = withdrawEarnings();
    if (success) {
      showSuccess('withdrawal of USDC successfully processed to Solana wallet');
    } else {
      showError('withdrawal requires a minimum balance of $1.00 USDC');
    }
  };

  const formatUptime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalUSDCBalance = parseFloat((workerEarnings + nativeEarnings + referralEarnings).toFixed(2));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-mono page-transition flex-1">
      <h1 className="text-2xl font-bold text-white mb-6 lowercase">
        proxr earn
      </h1>

      {/* Top Toggle Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Browser Worker Card */}
        <button
          onClick={() => {
            if (nativeConnected) {
              showError('stop native worker before switching');
              return;
            }
            setWorkerType('browser');
          }}
          className={`text-left p-6 rounded-lg border flex flex-col gap-2 transition-all cursor-pointer ${
            workerType === 'browser'
              ? 'bg-surface border-white'
              : 'bg-surface/50 border-border-custom hover:border-white/40'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className="text-white font-bold text-sm lowercase">browser worker</span>
            <span className="text-[10px] text-green-custom border border-green-custom/30 px-2 py-0.5 rounded font-bold">
              $0.07 per job
            </span>
          </div>
          <p className="text-xs text-muted lowercase">
            keep a tab open, start earning
          </p>
          <p className="text-[10px] text-muted uppercase mt-2">
            powered by WebGPU · model: Qwen3 8B
          </p>
        </button>

        {/* Native Worker Card */}
        <button
          onClick={() => {
            if (workerStatus === 'online') {
              showError('stop browser worker before switching');
              return;
            }
            setWorkerType('native');
          }}
          className={`text-left p-6 rounded-lg border flex flex-col gap-2 transition-all cursor-pointer relative ${
            workerType === 'native'
              ? 'bg-surface border-white'
              : 'bg-surface/50 border-border-custom hover:border-white/40'
          }`}
        >
          <div className="flex justify-between items-start">
            <span className="text-white font-bold text-sm lowercase flex items-center gap-1.5">
              native worker ⚡
            </span>
            <span className="text-[10px] bg-green-custom text-black px-2 py-0.5 rounded font-bold uppercase">
              recommended
            </span>
          </div>
          <p className="text-xs text-muted lowercase">
            run in background, earn 10x more
          </p>
          <p className="text-[10px] text-muted uppercase mt-2">
            powered by ollama · NVIDIA / Apple Silicon / AMD
          </p>
        </button>
      </div>

      {/* Main Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        
        {/* Left Side: Specific Worker Workspace */}
        <div className="bg-surface border border-border-custom rounded-lg p-6 relative">
          
          {/* Browser Worker Configuration */}
          {workerType === 'browser' && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-border-custom pb-4">
                <h2 className="text-sm font-bold text-white lowercase">browser worker node</h2>
                <div className="flex items-center gap-2 text-xs">
                  <span className={`w-2 h-2 rounded-full ${workerStatus === 'online' ? 'bg-green-custom animate-ping' : 'bg-muted'}`}></span>
                  <span className={workerStatus === 'online' ? 'text-green-custom' : 'text-muted'}>
                    {workerStatus === 'online' ? 'online' : 'offline'}
                  </span>
                </div>
              </div>

              {/* Start / Stop Toggle */}
              <div className="flex flex-col items-center justify-center py-8 gap-4 border border-dashed border-border-custom rounded-lg bg-bg/50">
                <p className="text-xs text-muted lowercase text-center px-4 max-w-sm">
                  your browser will download the model in-memory and use your local gpu via webgpu to serve incoming prompts.
                </p>

                <button
                  onClick={toggleWorker}
                  disabled={!authenticated}
                  className={`flex items-center gap-2 font-bold text-xs px-6 py-3 rounded transition-all lowercase ${
                    workerStatus === 'online'
                      ? 'bg-error text-white hover:bg-error/80'
                      : 'bg-white text-black hover:bg-off-white'
                  }`}
                >
                  {workerStatus === 'online' ? (
                    <>
                      <Square className="w-3.5 h-3.5" />
                      stop earning
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      start earning
                    </>
                  )}
                </button>
              </div>

              {/* Stats Panel */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-surface-2 border border-border-custom p-4 rounded">
                  <div className="text-[10px] text-muted lowercase">status</div>
                  <div className={`text-sm font-bold mt-1 lowercase ${workerStatus === 'online' ? 'text-green-custom' : 'text-muted'}`}>
                    {workerStatus === 'online' ? 'online' : 'offline'}
                  </div>
                </div>

                <div className="bg-surface-2 border border-border-custom p-4 rounded">
                  <div className="text-[10px] text-muted lowercase">jobs processed</div>
                  <div className="text-sm font-bold text-white mt-1">
                    {workerJobs}
                  </div>
                </div>

                <div className="bg-surface-2 border border-border-custom p-4 rounded">
                  <div className="text-[10px] text-muted lowercase">generation speed</div>
                  <div className="text-sm font-bold text-white mt-1">
                    {workerStatus === 'online' ? `${tps} tok/s` : '0 tok/s'}
                  </div>
                </div>

                <div className="bg-surface-2 border border-border-custom p-4 rounded">
                  <div className="text-[10px] text-muted lowercase">uptime</div>
                  <div className="text-sm font-bold text-white mt-1">
                    {formatUptime(uptime)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Native Worker Configuration */}
          {workerType === 'native' && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-border-custom pb-4">
                <h2 className="text-sm font-bold text-white lowercase">native worker installation</h2>
                <div className="flex items-center gap-2 text-xs">
                  <span className={`w-2 h-2 rounded-full ${nativeConnected ? 'bg-green-custom animate-ping' : 'bg-muted'}`}></span>
                  <span className={nativeConnected ? 'text-green-custom' : 'text-muted'}>
                    {nativeConnected ? 'connected' : 'offline'}
                  </span>
                </div>
              </div>

              {/* Installation Steps */}
              <div className="flex flex-col gap-5 text-xs">
                
                {/* Step 1 */}
                <div className="flex flex-col gap-2">
                  <span className="text-white font-bold">1. install node.js 18+ & ollama</span>
                  <p className="text-muted lowercase leading-relaxed">
                    ensure you have node.js installed on your machine. for mac users:
                  </p>
                  <pre className="bg-bg border border-border-custom p-3 rounded text-[11px] text-white flex justify-between items-center">
                    <span>brew install node</span>
                  </pre>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col gap-2">
                  <span className="text-white font-bold">2. get your worker command</span>
                  <p className="text-muted lowercase leading-relaxed">
                    generate your authentication token and startup script to start serving jobs.
                  </p>
                  
                  {!hasGeneratedToken ? (
                    <button
                      onClick={() => setHasGeneratedToken(true)}
                      className="w-fit bg-surface-2 hover:bg-hover border border-border-custom text-white text-xs px-4 py-2 rounded transition-colors lowercase"
                    >
                      generate my command
                    </button>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {/* Command box */}
                      <div className="bg-bg border border-border-custom p-3 rounded flex justify-between items-center gap-4">
                        <code className="text-white text-[10px] break-all select-all font-mono">
                          {startCommand}
                        </code>
                        <button
                          onClick={handleCopyCommand}
                          className="p-1.5 hover:bg-surface-2 rounded text-muted hover:text-white transition-colors"
                        >
                          {copied ? <Check className="w-4 h-4 text-green-custom" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Warning box */}
                      <div className="border border-error/30 bg-error/5 p-4 rounded-lg flex gap-3 text-error">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-1">
                          <span className="font-bold lowercase">security notice</span>
                          <p className="text-[10px] text-error/80 lowercase leading-relaxed">
                            your worker token is shown once only. save it somewhere safe. do not share this token.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Step 3 */}
                <div className="flex flex-col gap-2">
                  <span className="text-white font-bold">3. run the node daemon</span>
                  <p className="text-muted lowercase leading-relaxed">
                    paste the command into your terminal and press enter. your terminal will spin up an orchestrator tunnel and begin running local inference.
                  </p>
                </div>

              </div>

              {/* Simulation Mode for developers */}
              {hasGeneratedToken && (
                <div className="border border-border-custom bg-surface-2 p-5 rounded-lg flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-xs lowercase">simulated terminal client</span>
                    <button
                      onClick={() => setNativeConnected(!nativeConnected)}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded transition-all lowercase border ${
                        nativeConnected 
                          ? 'bg-error text-white border-error' 
                          : 'bg-green-custom text-black border-green-custom'
                      }`}
                    >
                      {nativeConnected ? 'kill daemon' : 'simulate start'}
                    </button>
                  </div>
                  
                  {nativeConnected && (
                    <div className="bg-bg border border-border-custom p-3 rounded font-mono text-[10px] text-green-custom flex flex-col gap-1 h-28 overflow-y-auto">
                      <div>[system] connecting to proxr orchestrator...</div>
                      <div>[system] auth token validated successfully.</div>
                      <div>[ollama] detected hardware: Apple Metal Acceleration</div>
                      <div>[system] worker listening for job requests.</div>
                      {nativeJobs > 0 && (
                        <div>[job] processed {nativeJobs} requests (approx {Math.floor(nativeUptime * 2.1)} tok/s).</div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Native Stats Panel */}
              {nativeConnected && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                  <div className="bg-surface-2 border border-border-custom p-4 rounded">
                    <div className="text-[10px] text-muted lowercase">jobs</div>
                    <div className="text-sm font-bold text-white mt-1">{nativeJobs}</div>
                  </div>

                  <div className="bg-surface-2 border border-border-custom p-4 rounded">
                    <div className="text-[10px] text-muted lowercase">earnings</div>
                    <div className="text-sm font-bold text-green-custom mt-1">${nativeEarnings.toFixed(2)} USDC</div>
                  </div>

                  <div className="bg-surface-2 border border-border-custom p-4 rounded">
                    <div className="text-[10px] text-muted lowercase">hardware engine</div>
                    <div className="text-sm font-bold text-white mt-1">ollama/metal</div>
                  </div>

                  <div className="bg-surface-2 border border-border-custom p-4 rounded">
                    <div className="text-[10px] text-muted lowercase">uptime</div>
                    <div className="text-sm font-bold text-white mt-1">{formatUptime(nativeUptime)}</div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Wallet connect blocker */}
          {!authenticated && (
            <div className="absolute inset-0 bg-bg/85 backdrop-blur-[1px] flex items-center justify-center rounded-lg border border-border-custom text-center p-4">
              <button
                onClick={login}
                className="flex items-center gap-2 bg-white text-black text-xs font-bold font-mono px-6 py-3 rounded hover:bg-off-white transition-colors lowercase"
              >
                <Lock className="w-3.5 h-3.5" />
                connect wallet to start earning
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Earnings Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Earnings summary card */}
          <div className="bg-surface border border-border-custom rounded-lg p-5 flex flex-col gap-4 font-mono">
            <h3 className="text-white text-xs font-bold border-b border-border-custom pb-2 lowercase">earnings summary</h3>
            
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted lowercase">browser worker</span>
                <span className="text-white font-bold">${workerEarnings.toFixed(2)} USDC</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted lowercase">native worker</span>
                <span className="text-white font-bold">${nativeEarnings.toFixed(2)} USDC</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted lowercase">referrals commission</span>
                <span className="text-white font-bold">${referralEarnings.toFixed(2)} USDC</span>
              </div>

              <div className="border-t border-border-custom my-1 pt-3 flex justify-between items-center">
                <span className="text-white text-xs lowercase font-bold">total balance</span>
                <span className="text-green-custom text-base font-bold">${totalUSDCBalance.toFixed(2)} USDC</span>
              </div>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={totalUSDCBalance < 1.00 || !authenticated}
              className="w-full bg-white hover:bg-off-white text-black disabled:bg-surface-2 disabled:text-muted disabled:border-border-custom font-bold text-xs py-3 rounded transition-colors lowercase border border-transparent"
            >
              withdraw earnings
            </button>

            <span className="text-[9px] text-muted lowercase text-center leading-relaxed">
              earnings land in your balance. minimum withdrawal $1.00 USDC, paid on Solana.
            </span>
          </div>

          {/* Staking notification/advert */}
          <div className="bg-surface border border-border-custom rounded-lg p-5 flex flex-col gap-3 font-mono">
            <Coins className="w-6 h-6 text-green-custom" />
            <h4 className="text-white text-xs font-bold lowercase">earn 10% more commission</h4>
            <p className="text-[10px] text-muted lowercase leading-relaxed">
              stake at least 1,000,000 $PROXR to boost your worker revenue share from 70% to 80% on every job.
            </p>
            <a
              href="/staking"
              className="text-[10px] text-white hover:underline flex items-center gap-1 mt-1 lowercase"
            >
              go to staking <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
