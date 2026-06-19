import React, { useState } from 'react';
import { useMockStore } from '../lib/mockStore';
import { usePrivy } from '../lib/auth';
import { useToast } from '../components/ui/ToastProvider';
import { 
  Copy, 
  Check, 
  Share2, 
  Send, 
  Users, 
  DollarSign, 
  Clock,
  Coins,
  Lock,
  UserPlus
} from 'lucide-react';

export default function Referral() {
  const { 
    referralsCount, 
    activeReferrals, 
    referralEarnings, 
    referredUsers, 
    addReferral,
    withdrawEarnings
  } = useMockStore();

  const { authenticated, login } = usePrivy();
  const { showSuccess, showError } = useToast();
  
  const [copied, setCopied] = useState(false);

  const referralCode = 'abc123';
  const referralLink = `https://proxr.app/r/${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    showSuccess('referral link copied');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateSignUP = () => {
    // Generate a random mock address
    const randomHex = Math.random().toString(16).substring(2, 6);
    const mockAddress = `0x${randomHex}...${Math.random().toString(16).substring(2, 6)}`;
    
    addReferral(mockAddress);
    showSuccess(`simulated new referral sign-up from ${mockAddress}`);
  };

  const handleWithdraw = () => {
    const success = withdrawEarnings();
    if (success) {
      showSuccess('withdrawal of USDC successfully processed to Solana wallet');
    } else {
      showError('withdrawal requires a minimum balance of $1.00 USDC');
    }
  };

  const tweetText = `checking out proxr — a decentralized GPU network with private, uncensored AI. try it for free here: ${referralLink}`;
  const telegramText = `try proxr for private and uncensored AI chat & image generation: ${referralLink}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-mono page-transition flex-1">
      <h1 className="text-2xl font-bold text-white mb-6 lowercase">
        proxr referrals
      </h1>

      {/* Main Container */}
      <div className="relative">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface border border-border-custom p-4 rounded-lg">
            <div className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              total referred
            </div>
            <div className="text-lg md:text-xl font-bold text-white mt-1">
              {authenticated ? referralsCount : 0}
            </div>
          </div>

          <div className="bg-surface border border-border-custom p-4 rounded-lg">
            <div className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              active users
            </div>
            <div className="text-lg md:text-xl font-bold text-white mt-1">
              {authenticated ? activeReferrals : 0}
            </div>
          </div>

          <div className="bg-surface border border-border-custom p-4 rounded-lg">
            <div className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              total earned
            </div>
            <div className="text-lg md:text-xl font-bold text-green-custom mt-1">
              ${authenticated ? referralEarnings.toFixed(2) : '0.00'} USDC
            </div>
          </div>

          <div className="bg-surface border border-border-custom p-4 rounded-lg">
            <div className="text-[10px] text-muted uppercase tracking-wider flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" />
              this month
            </div>
            <div className="text-lg md:text-xl font-bold text-white mt-1">
              ${authenticated ? referralEarnings.toFixed(2) : '0.00'} USDC
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          
          {/* Left Column: Link Share & Referrals List */}
          <div className="flex flex-col gap-6">
            
            {/* Share Link Card */}
            <div className="bg-surface border border-border-custom rounded-lg p-6 flex flex-col gap-4">
              <h2 className="text-sm font-bold text-white lowercase">your referral link</h2>
              <p className="text-xs text-muted lowercase leading-relaxed">
                invite friends to proxr and earn **5% of every prompt they pay for, forever**.
              </p>

              {/* Copy box */}
              <div className="bg-bg border border-border-custom p-3 rounded flex justify-between items-center gap-4">
                <code className="text-white text-xs select-all font-mono break-all">
                  {referralLink}
                </code>
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 hover:bg-surface-2 rounded text-muted hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-custom" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Social Share Buttons */}
              <div className="flex flex-wrap gap-3 mt-1">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-border-custom hover:bg-hover text-white text-xs px-4 py-2 rounded transition-colors lowercase"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  share on twitter
                </a>
                <a
                  href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(telegramText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-border-custom hover:bg-hover text-white text-xs px-4 py-2 rounded transition-colors lowercase"
                >
                  <Send className="w-3.5 h-3.5" />
                  share on telegram
                </a>

                {/* Simulated Sign-up for developers */}
                <button
                  onClick={handleSimulateSignUP}
                  className="flex items-center gap-2 border border-green-custom/30 bg-green-custom/5 hover:bg-green-custom/10 text-green-custom text-xs px-4 py-2 rounded transition-colors lowercase ml-auto"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  simulate referral sign-up
                </button>
              </div>
            </div>

            {/* Referred Users Table */}
            <div className="bg-surface border border-border-custom rounded-lg p-6">
              <h2 className="text-sm font-bold text-white mb-4 lowercase">referred workers & users</h2>

              {referredUsers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center gap-2 border border-dashed border-border-custom rounded-lg bg-bg/50">
                  <Users className="w-8 h-8 text-muted animate-pulse" />
                  <span className="text-xs text-white lowercase">no referrals yet</span>
                  <p className="text-[10px] text-muted lowercase max-w-xs px-4">
                    share your unique referral link to start onboarding workers and earning commissions.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-muted border-b border-border-custom">
                        <th className="pb-3 font-normal lowercase">wallet</th>
                        <th className="pb-3 font-normal lowercase">joined</th>
                        <th className="pb-3 text-right font-normal lowercase">prompts</th>
                        <th className="pb-3 text-right font-normal lowercase">earned</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-custom/50">
                      {referredUsers.map((user, index) => (
                        <tr key={index} className="text-off-white">
                          <td className="py-3 font-mono">{user.wallet}</td>
                          <td className="py-3 text-muted">{user.joined}</td>
                          <td className="py-3 text-right">{user.prompts}</td>
                          <td className="py-3 text-right text-green-custom">${user.earned.toFixed(4)} USDC</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Earnings Summary & Commission Rules */}
          <div className="flex flex-col gap-6">
            
            {/* Earnings Card */}
            <div className="bg-surface border border-border-custom rounded-lg p-5 flex flex-col gap-4">
              <h3 className="text-white text-xs font-bold border-b border-border-custom pb-2 lowercase">referral balance</h3>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted lowercase">claimable commission</span>
                <span className="text-green-custom text-base font-bold">${referralEarnings.toFixed(4)} USDC</span>
              </div>

              <button
                onClick={handleWithdraw}
                disabled={referralEarnings < 1.00}
                className="w-full bg-white hover:bg-off-white text-black disabled:bg-surface-2 disabled:text-muted disabled:border-border-custom font-bold text-xs py-3 rounded transition-colors lowercase border border-transparent"
              >
                withdraw commission
              </button>

              <span className="text-[9px] text-muted lowercase text-center leading-relaxed">
                earnings land in the same balance as worker earnings. minimum withdrawal is $1.00 USDC, sent on Solana.
              </span>
            </div>

            {/* Commission Table rules */}
            <div className="bg-surface border border-border-custom rounded-lg p-5 flex flex-col gap-4">
              <h3 className="text-white text-xs font-bold border-b border-border-custom pb-2 lowercase">commission rules</h3>
              
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-muted border-b border-border-custom">
                    <th className="pb-2 font-normal lowercase">usage type</th>
                    <th className="pb-2 text-right font-normal lowercase">earn 5%?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-custom/50">
                  <tr>
                    <td className="py-2.5 lowercase">paid chat (standard / pro)</td>
                    <td className="py-2.5 text-right text-green-custom">✅ yes</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 lowercase">paid image generation</td>
                    <td className="py-2.5 text-right text-green-custom">✅ yes</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 lowercase">paid api usage</td>
                    <td className="py-2.5 text-right text-green-custom">✅ yes</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 lowercase">staker daily credits</td>
                    <td className="py-2.5 text-right text-green-custom">✅ yes</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 lowercase">free / onboarding prompts</td>
                    <td className="py-2.5 text-right text-error">❌ no</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>

        {/* Wallet lock overlay */}
        {!authenticated && (
          <div className="absolute inset-0 bg-bg/85 backdrop-blur-[1px] flex flex-col items-center justify-center rounded-lg border border-border-custom text-center p-4 h-[500px]">
            <Lock className="w-10 h-10 text-muted mb-4 animate-pulse" />
            <h3 className="text-white text-sm font-bold lowercase mb-2">wallet connection required</h3>
            <p className="text-xs text-muted lowercase max-w-sm mb-6">
              connect your wallet using privy to retrieve your unique affiliate credentials and manage referral statistics.
            </p>
            <button
              onClick={login}
              className="flex items-center gap-2 bg-white text-black text-xs font-bold font-mono px-6 py-3 rounded hover:bg-off-white transition-colors lowercase"
            >
              connect wallet
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
