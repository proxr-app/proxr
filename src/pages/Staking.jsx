import React, { useState, useEffect } from 'react';
import { useMockStore } from '../lib/mockStore';
import { usePrivy } from '../lib/auth';
import { useToast } from '../components/ui/ToastProvider';
import { 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  Hourglass, 
  HelpCircle,
  AlertTriangle,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function Staking() {
  const { 
    stakedAmount, 
    claimableUSDC, 
    autoCompound, 
    setAutoCompound, 
    stakeTokens, 
    unstakeTokens, 
    claimRewards,
    networkStats
  } = useMockStore();
  
  const { authenticated, login } = usePrivy();
  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState('stake'); // 'stake' or 'unstake'
  const [stakeValue, setStakeValue] = useState('');
  const [unstakeValue, setUnstakeValue] = useState('');

  // Mock initial held balance
  const [heldBalance, setHeldBalance] = useState(0); 

  // Countdown timer for next reward (15:00 UTC)
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    let count = 0;
    const dots = ['', '.', '..', '...'];
    setTimeLeft('preparing');
    
    const interval = setInterval(() => {
      count = (count + 1) % 4;
      setTimeLeft(`preparing${dots[count]}`);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleStake = () => {
    const amount = parseInt(stakeValue, 10);
    if (isNaN(amount) || amount <= 0) {
      showError('please enter a valid positive number');
      return;
    }
    if (amount > heldBalance) {
      showError('insufficient $PROXR balance');
      return;
    }

    const success = stakeTokens(amount);
    if (success) {
      setHeldBalance(prev => prev - amount);
      setStakeValue('');
      showSuccess(`successfully staked ${amount.toLocaleString()} $PROXR`);
    } else {
      showError('staking failed');
    }
  };

  const handleUnstake = () => {
    const amount = parseInt(unstakeValue, 10);
    if (isNaN(amount) || amount <= 0) {
      showError('please enter a valid positive number');
      return;
    }
    if (amount > stakedAmount) {
      showError('cannot unstake more than currently staked');
      return;
    }

    const success = unstakeTokens(amount);
    if (success) {
      setHeldBalance(prev => prev + amount);
      setUnstakeValue('');
      showSuccess(`successfully unstaked ${amount.toLocaleString()} $PROXR`);
    } else {
      showError('unstaking failed');
    }
  };

  const handleClaim = () => {
    const success = claimRewards();
    if (success) {
      showSuccess('rewards successfully claimed');
    } else {
      showError('no rewards claimable at this time');
    }
  };

  const dailyUSDCEstimate = stakedAmount > 0 
    ? parseFloat(((stakedAmount / 1000000) * 0.15).toFixed(4)) // custom estimate $0.15 USDC per 1M daily
    : 0.00;

  const isBoosted = stakedAmount >= 1000000;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-mono page-transition flex-1">
      <h1 className="text-2xl font-bold text-white mb-6 lowercase">
        proxr staking
      </h1>

      {/* Top Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-border-custom p-4 rounded-lg">
          <div className="text-[10px] text-muted uppercase tracking-wider">
            $PROXR price
          </div>
          <div className="text-lg md:text-xl font-bold text-white mt-1">
            $0.0000
          </div>
        </div>

        <div className="bg-surface border border-border-custom p-4 rounded-lg">
          <div className="text-[10px] text-muted uppercase tracking-wider">
            your $PROXR balance
          </div>
          <div className="text-lg md:text-xl font-bold text-white mt-1">
            {authenticated ? heldBalance.toLocaleString() : 0} $PROXR
          </div>
        </div>

        <div className="bg-surface border border-border-custom p-4 rounded-lg">
          <div className="text-[10px] text-muted uppercase tracking-wider">
            total staked on network
          </div>
          <div className="text-lg md:text-xl font-bold text-white mt-1">
            {networkStats.totalStaked.toLocaleString()} $PROXR
          </div>
        </div>

        <div className="bg-surface border border-border-custom p-4 rounded-lg">
          <div className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1">
            next distribution
            <Hourglass className="w-3 h-3 text-muted animate-pulse" />
          </div>
          <div className="text-lg md:text-xl font-bold text-green-custom mt-1">
            {timeLeft}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        
        {/* Left Column: Stake / Unstake Actions */}
        <div className="flex flex-col gap-6">
          <div className="bg-surface border border-border-custom rounded-lg p-6 relative">
            
            {/* Tabs */}
            <div className="flex gap-4 border-b border-border-custom pb-4 mb-6">
              <button
                onClick={() => setActiveTab('stake')}
                className={`text-sm font-bold pb-2 transition-colors lowercase border-b-2 outline-none ${
                  activeTab === 'stake' 
                    ? 'text-white border-white' 
                    : 'text-muted border-transparent hover:text-white'
                }`}
              >
                stake
              </button>
              <button
                onClick={() => setActiveTab('unstake')}
                className={`text-sm font-bold pb-2 transition-colors lowercase border-b-2 outline-none ${
                  activeTab === 'unstake' 
                    ? 'text-white border-white' 
                    : 'text-muted border-transparent hover:text-white'
                }`}
              >
                unstake
              </button>
            </div>

            {/* Stake Tab */}
            {activeTab === 'stake' && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="text-muted lowercase">amount to stake</label>
                    {authenticated && (
                      <button
                        onClick={() => setStakeValue(heldBalance)}
                        className="text-white hover:underline lowercase text-[10px]"
                      >
                        use max ({heldBalance.toLocaleString()})
                      </button>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="number"
                      value={stakeValue}
                      onChange={(e) => setStakeValue(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-bg border border-border-custom rounded p-3 text-sm text-white focus:border-white/40 outline-none font-mono"
                    />
                    <span className="absolute right-3 top-3 text-xs text-muted">$PROXR</span>
                  </div>
                </div>

                <div className="border border-border-custom bg-bg/50 p-4 rounded-lg flex gap-3 text-muted text-xs">
                  <AlertTriangle className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" />
                  <span className="lowercase leading-relaxed">
                    new deposits start earning rewards after 24 hours. this prevents reward sniping.
                  </span>
                </div>

                {/* Auto-compound toggle */}
                <div className="flex items-center justify-between border-t border-border-custom pt-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs text-white lowercase">auto-compound rewards</span>
                    <span className="text-[10px] text-muted lowercase">automatically use daily USDC to buy and restake $PROXR</span>
                  </div>
                  <button
                    onClick={() => setAutoCompound(!autoCompound)}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 outline-none ${
                      autoCompound ? 'bg-green-custom' : 'bg-surface-2'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ${
                        autoCompound ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <button
                  onClick={handleStake}
                  disabled={!authenticated || !stakeValue}
                  className="w-full bg-white hover:bg-off-white text-black font-bold text-xs py-3 rounded transition-colors lowercase mt-2 disabled:opacity-50"
                >
                  stake $PROXR
                </button>
              </div>
            )}

            {/* Unstake Tab */}
            {activeTab === 'unstake' && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="text-muted lowercase">amount to unstake</label>
                    {authenticated && (
                      <button
                        onClick={() => setUnstakeValue(stakedAmount)}
                        className="text-white hover:underline lowercase text-[10px]"
                      >
                        use max ({stakedAmount.toLocaleString()})
                      </button>
                    )}
                  </div>
                  
                  <div className="relative">
                    <input
                      type="number"
                      value={unstakeValue}
                      onChange={(e) => setUnstakeValue(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-bg border border-border-custom rounded p-3 text-sm text-white focus:border-white/40 outline-none font-mono"
                    />
                    <span className="absolute right-3 top-3 text-xs text-muted">$PROXR</span>
                  </div>
                </div>

                <div className="border border-border-custom bg-bg/50 p-4 rounded-lg flex gap-3 text-muted text-xs">
                  <AlertTriangle className="w-4 h-4 text-muted flex-shrink-0 mt-0.5" />
                  <span className="lowercase leading-relaxed">
                    unstaking starts from the most recent deposits. older matured deposits keep earning uninterrupted.
                  </span>
                </div>

                <button
                  onClick={handleUnstake}
                  disabled={!authenticated || !unstakeValue || stakedAmount <= 0}
                  className="w-full bg-white hover:bg-off-white text-black font-bold text-xs py-3 rounded transition-colors lowercase mt-2 disabled:opacity-50"
                >
                  unstake $PROXR
                </button>
              </div>
            )}

            {/* Wallet lock overlay */}
            {!authenticated && (
              <div className="absolute inset-0 bg-bg/85 backdrop-blur-[1px] flex items-center justify-center rounded-lg border border-border-custom text-center p-4">
                <button
                  onClick={login}
                  className="flex items-center gap-2 bg-white text-black text-xs font-bold font-mono px-6 py-3 rounded hover:bg-off-white transition-colors lowercase"
                >
                  <Lock className="w-3.5 h-3.5" />
                  connect wallet to manage staking
                </button>
              </div>
            )}

          </div>

          {/* Staking Benefits Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-surface border border-border-custom p-5 rounded-lg flex flex-col gap-3">
              <TrendingUp className="w-5 h-5 text-green-custom" />
              <h4 className="text-white font-bold lowercase">daily USDC</h4>
              <p className="text-muted lowercase leading-relaxed">
                50% of treasury distributed to stakers every day at 15:00 UTC.
              </p>
            </div>

            <div className="bg-surface border border-border-custom p-5 rounded-lg flex flex-col gap-3">
              <Coins className="w-5 h-5 text-white" />
              <h4 className="text-white font-bold lowercase">free credits</h4>
              <p className="text-muted lowercase leading-relaxed">
                stake to earn daily AI credits. proportional to your share.
              </p>
            </div>

            <div className="bg-surface border border-border-custom p-5 rounded-lg flex flex-col gap-3">
              <ShieldCheck className="w-5 h-5 text-white" />
              <h4 className="text-white font-bold lowercase">worker boost</h4>
              <p className="text-muted lowercase leading-relaxed">
                stake 1M+ $PROXR to earn 80% per job instead of 70% as worker.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Your Staking Position & Treasury Stats */}
        <div className="flex flex-col gap-6">
          
          {/* Your Staking Position */}
          <div className="bg-surface border border-border-custom rounded-lg p-5 flex flex-col gap-4 font-mono">
            <h3 className="text-white text-xs font-bold border-b border-border-custom pb-2 lowercase">your position</h3>
            
            {!authenticated || stakedAmount === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
                <Coins className="w-8 h-8 text-muted animate-pulse" />
                <span className="text-white text-xs lowercase">you have no active stake</span>
                <span className="text-[10px] text-muted lowercase">stake $PROXR to earn daily USDC rewards</span>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted lowercase">amount staked</span>
                  <span className="text-white font-bold">{stakedAmount.toLocaleString()} $PROXR</span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted lowercase">daily reward est.</span>
                  <span className="text-white font-bold">${dailyUSDCEstimate.toFixed(4)} USDC</span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted lowercase">worker boost status</span>
                  <span className={`font-bold flex items-center gap-1.5 ${isBoosted ? 'text-green-custom' : 'text-muted'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${isBoosted ? 'bg-green-custom' : 'bg-muted'}`}></span>
                    {isBoosted ? '80% (active)' : '70% (inactive)'}
                  </span>
                </div>

                <div className="border-t border-border-custom pt-3 my-1 flex justify-between items-center text-xs">
                  <div className="flex flex-col">
                    <span className="text-muted lowercase">claimable rewards</span>
                    <span className="text-green-custom text-sm font-bold">${claimableUSDC.toFixed(4)} USDC</span>
                  </div>
                  
                  <button
                    onClick={handleClaim}
                    disabled={claimableUSDC <= 0}
                    className="bg-white hover:bg-off-white text-black font-bold px-3 py-1.5 rounded text-[10px] transition-colors disabled:opacity-40 lowercase"
                  >
                    claim rewards
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Treasury Stats */}
          <div className="bg-surface border border-border-custom rounded-lg p-5 flex flex-col gap-4 font-mono">
            <h3 className="text-white text-xs font-bold border-b border-border-custom pb-2 lowercase">treasury stats</h3>
            
            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-muted lowercase">total treasury</span>
                <span className="text-white">$0 USDC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted lowercase">burned to date</span>
                <span className="text-white">{networkStats.proxrBurned.toLocaleString()} $PROXR</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted lowercase">buybacks executed</span>
                <span className="text-white">{networkStats.buybacksExecuted || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted lowercase">total paid to stakers</span>
                <span className="text-white">${networkStats.totalPaidOut.toLocaleString()} USDC</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
