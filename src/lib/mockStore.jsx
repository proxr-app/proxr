import React, { createContext, useContext, useState, useEffect } from 'react';

const MockStoreContext = createContext(null);

export function MockStoreProvider({ children }) {
  // Load initial state or set defaults
  const [credits, setCredits] = useState(() => {
    const saved = localStorage.getItem('proxr_credits');
    return saved ? parseInt(saved, 10) : 240;
  });

  const [workerStatus, setWorkerStatus] = useState('offline');
  const [workerJobs, setWorkerJobs] = useState(0);
  const [workerEarnings, setWorkerEarnings] = useState(0.00);
  
  const [stakedAmount, setStakedAmount] = useState(() => {
    const saved = localStorage.getItem('proxr_staked');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [claimableUSDC, setClaimableUSDC] = useState(0.00);
  const [autoCompound, setAutoCompound] = useState(false);

  const [referralEarnings, setReferralEarnings] = useState(0.00);
  const [referralsCount, setReferralsCount] = useState(0);
  const [activeReferrals, setActiveReferrals] = useState(0);
  const [referredUsers, setReferredUsers] = useState([]);

  const [networkStats, setNetworkStats] = useState({
    workersOnline: 12,
    inQueue: 3,
    proxrBurned: 0,
    totalStaked: 0,
    totalPaidOut: 0,
    workersEver: 30,
  });

  // Persist key states
  useEffect(() => {
    localStorage.setItem('proxr_credits', credits.toString());
  }, [credits]);

  useEffect(() => {
    localStorage.setItem('proxr_staked', stakedAmount.toString());
  }, [stakedAmount]);

  // Mock interval for network stats (fluctuates every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStats(prev => {
        const deltaOnline = Math.floor(Math.random() * 3) - 1;  // -1, 0, or +1
        const deltaQueue = Math.floor(Math.random() * 3) - 1;   // -1 to +1
        const nextOnline = Math.min(15, Math.max(10, prev.workersOnline + deltaOnline));
        return {
          ...prev,
          workersOnline: nextOnline,
          inQueue: Math.max(0, prev.inQueue + deltaQueue),
        };
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mock interval for browser worker earnings
  useEffect(() => {
    let interval;
    if (workerStatus === 'online') {
      interval = setInterval(() => {
        setWorkerJobs(prev => prev + 1);
        setWorkerEarnings(prev => {
          const updated = prev + 0.07;
          return parseFloat(updated.toFixed(2));
        });
      }, 8000); // job processed every 8s
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [workerStatus]);

  // Mock staking rewards accumulation (accrues USDC slowly if staking)
  useEffect(() => {
    let interval;
    if (stakedAmount > 0) {
      interval = setInterval(() => {
        setClaimableUSDC(prev => {
          // reward scales with staked amount
          const increment = (stakedAmount / 1000000) * 0.01;
          const updated = prev + increment;
          return parseFloat(updated.toFixed(4));
        });
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stakedAmount]);

  // Actions
  const buyCredits = (amount) => {
    setCredits(prev => prev + amount);
  };

  const deductCredits = (amount) => {
    setCredits(prev => Math.max(0, prev - amount));
  };

  const toggleWorker = () => {
    setWorkerStatus(prev => (prev === 'offline' ? 'online' : 'offline'));
  };

  const stakeTokens = (amount) => {
    if (amount <= 0) return false;
    setStakedAmount(prev => prev + amount);
    setNetworkStats(prev => ({
      ...prev,
      totalStaked: prev.totalStaked + amount
    }));
    return true;
  };

  const unstakeTokens = (amount) => {
    if (amount <= 0 || amount > stakedAmount) return false;
    setStakedAmount(prev => prev - amount);
    setNetworkStats(prev => ({
      ...prev,
      totalStaked: Math.max(0, prev.totalStaked - amount)
    }));
    return true;
  };

  const claimRewards = () => {
    if (claimableUSDC <= 0) return false;
    const claimed = claimableUSDC;
    
    if (autoCompound) {
      // simulate buying $PROXR with the USDC and re-staking it
      // price is $0.0042
      const tokensBought = Math.floor(claimed / 0.0042);
      if (tokensBought > 0) {
        stakeTokens(tokensBought);
      }
    } else {
      // add to worker earnings or just clear
      // let's add to worker earnings so it can be withdrawn together
      setWorkerEarnings(prev => parseFloat((prev + claimed).toFixed(2)));
    }
    setClaimableUSDC(0.00);
    return true;
  };

  const withdrawEarnings = () => {
    const total = parseFloat((workerEarnings + referralEarnings).toFixed(2));
    if (total < 1.00) return false;
    setWorkerEarnings(0.00);
    setReferralEarnings(0.00);
    return true;
  };

  const addReferral = (walletAddress) => {
    setReferralsCount(prev => prev + 1);
    setActiveReferrals(prev => prev + 1);
    
    // Add mock user to table
    const newUser = {
      wallet: walletAddress,
      joined: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      prompts: Math.floor(Math.random() * 20) + 1,
      earned: parseFloat((Math.random() * 2).toFixed(2))
    };
    
    setReferredUsers(prev => [newUser, ...prev]);
    setReferralEarnings(prev => parseFloat((prev + newUser.earned).toFixed(2)));
  };

  // Simulate a referred user sending a prompt and earning you commissions
  useEffect(() => {
    let interval;
    if (referralsCount > 0) {
      interval = setInterval(() => {
        // 5% of a random prompt (10, 15, or 20 credits)
        const creditCosts = [10, 15, 20];
        const cost = creditCosts[Math.floor(Math.random() * creditCosts.length)];
        const dollarValue = cost * 0.01;
        const commission = dollarValue * 0.05; // 5%
        
        setReferralEarnings(prev => parseFloat((prev + commission).toFixed(4)));
        
        // update random user's prompts
        setReferredUsers(prev => {
          if (prev.length === 0) return prev;
          const randomIndex = Math.floor(Math.random() * prev.length);
          return prev.map((u, i) => {
            if (i === randomIndex) {
              const updatedEarned = parseFloat((u.earned + commission).toFixed(4));
              return { ...u, prompts: u.prompts + 1, earned: updatedEarned };
            }
            return u;
          });
        });
      }, 15000); // every 15s
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [referralsCount]);

  return (
    <MockStoreContext.Provider value={{
      credits,
      workerStatus,
      workerJobs,
      workerEarnings,
      stakedAmount,
      claimableUSDC,
      autoCompound,
      referralEarnings,
      referralsCount,
      activeReferrals,
      referredUsers,
      networkStats,
      setAutoCompound,
      buyCredits,
      deductCredits,
      toggleWorker,
      stakeTokens,
      unstakeTokens,
      claimRewards,
      withdrawEarnings,
      addReferral
    }}>
      {children}
    </MockStoreContext.Provider>
  );
}

export function useMockStore() {
  const context = useContext(MockStoreContext);
  if (!context) {
    throw new Error('useMockStore must be used within a MockStoreProvider');
  }
  return context;
}
