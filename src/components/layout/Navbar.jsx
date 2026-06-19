import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { usePrivy } from '../../lib/auth';
import { useMockStore } from '../../lib/mockStore';
import { useToast } from '../ui/ToastProvider';
import { Menu, X, ChevronDown, LogOut, Coins } from 'lucide-react';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const { authenticated, user, login, logout } = usePrivy();
  const { credits, buyCredits } = useMockStore();
  const { showSuccess } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getWalletAddress = () => {
    if (!user) return '';
    const solanaWallet = user.wallets?.find(w => w.chainType === 'solana');
    if (solanaWallet) return solanaWallet.address;
    return user.wallet?.address || user.wallets?.[0]?.address || '';
  };

  const [wasAuthenticated, setWasAuthenticated] = useState(authenticated);

  React.useEffect(() => {
    if (authenticated && !wasAuthenticated) {
      showSuccess('wallet connected successfully');
    }
    setWasAuthenticated(authenticated);
  }, [authenticated, wasAuthenticated, showSuccess]);

  const handleConnect = () => {
    login();
  };

  const handleDisconnect = () => {
    logout();
    setDropdownOpen(false);
    showSuccess('wallet disconnected');
  };

  const handleBuyCredits = () => {
    buyCredits(100);
    showSuccess('purchased 100 credits ($1.00 USDC)');
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-mono transition-colors lowercase ${
      isActive ? 'text-white' : 'text-muted hover:text-white'
    }`;

  return (
    <nav className="sticky top-0 z-40 w-full bg-bg/85 backdrop-blur-md border-b border-border-custom px-4 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="proxr" className="h-7 w-auto" />
        </Link>

        {/* Center: Desktop Navigation links */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/compute" className={linkClass}>
            compute
          </NavLink>
          <NavLink to="/create" className={linkClass}>
            create
          </NavLink>
          <NavLink to="/earn" className={linkClass}>
            earn
          </NavLink>
          <NavLink to="/staking" className={linkClass}>
            staking
          </NavLink>
          <NavLink to="/referral" className={linkClass}>
            referral
          </NavLink>
          <NavLink to="/docs" className={linkClass}>
            docs
          </NavLink>
        </div>

        {/* Right: Auth / Wallet & Credits */}
        <div className="hidden md:flex items-center gap-4 font-mono">
          {authenticated && (
            <div className="flex items-center gap-3.5 bg-surface border border-border-custom px-4 py-2 rounded text-sm">
              <Coins className="w-4 h-4 text-muted" />
              <span className="text-muted">credits:</span>
              <span className="text-white font-bold">{credits}</span>
              <button 
                onClick={handleBuyCredits} 
                className="ml-2 text-xs bg-white text-black font-bold px-2.5 py-1 rounded hover:bg-off-white transition-colors uppercase"
              >
                + top up
              </button>
            </div>
          )}

          {!authenticated ? (
            <button
              onClick={handleConnect}
              className="text-sm bg-white text-black font-bold px-5 py-2.5 rounded hover:bg-off-white transition-all lowercase"
            >
              connect wallet
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 bg-surface hover:bg-hover border border-border-custom text-sm text-white px-4 py-2.5 rounded transition-all font-mono"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-green-custom animate-pulse"></span>
                <span>{formatAddress(getWalletAddress())}</span>
                <ChevronDown className="w-4 h-4 text-muted" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface border border-border-custom rounded shadow-lg z-50 py-1 page-transition">
                  <div className="px-4 py-2 border-b border-border-custom text-[10px] text-muted uppercase tracking-wider">
                    wallet settings
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="w-full text-left px-4 py-2.5 text-sm text-error hover:bg-hover flex items-center gap-2 transition-colors lowercase"
                  >
                    <LogOut className="w-4 h-4" />
                    disconnect
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden gap-3">
          {authenticated && (
            <div className="flex items-center gap-1.5 bg-surface border border-border-custom px-2 py-1 rounded text-[11px] font-mono">
              <span className="text-muted">c:</span>
              <span className="text-white font-bold">{credits}</span>
            </div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-muted hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-border-custom flex flex-col gap-4 font-mono pb-2 page-transition">
          <NavLink
            to="/compute"
            onClick={() => setMobileMenuOpen(false)}
            className={linkClass}
          >
            compute
          </NavLink>
          <NavLink
            to="/create"
            onClick={() => setMobileMenuOpen(false)}
            className={linkClass}
          >
            create
          </NavLink>
          <NavLink
            to="/earn"
            onClick={() => setMobileMenuOpen(false)}
            className={linkClass}
          >
            earn
          </NavLink>
          <NavLink
            to="/staking"
            onClick={() => setMobileMenuOpen(false)}
            className={linkClass}
          >
            staking
          </NavLink>
          <NavLink
            to="/referral"
            onClick={() => setMobileMenuOpen(false)}
            className={linkClass}
          >
            referral
          </NavLink>
          <NavLink
            to="/docs"
            onClick={() => setMobileMenuOpen(false)}
            className={linkClass}
          >
            docs
          </NavLink>

          <div className="border-t border-border-custom pt-4 flex flex-col gap-3">
            {authenticated && (
              <button
                onClick={() => {
                  handleBuyCredits();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-center border border-border-custom text-white px-4 py-2 rounded hover:bg-hover transition-all lowercase"
              >
                top up credits (+100)
              </button>
            )}
            
            {!authenticated ? (
              <button
                onClick={() => {
                  handleConnect();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center text-xs bg-white text-black font-semibold px-4 py-2 rounded hover:bg-off-white transition-all lowercase"
              >
                connect wallet
              </button>
            ) : (
              <button
                onClick={() => {
                  handleDisconnect();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center text-xs bg-surface text-error border border-border-custom px-4 py-2 rounded hover:bg-hover transition-all lowercase"
              >
                disconnect wallet
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
