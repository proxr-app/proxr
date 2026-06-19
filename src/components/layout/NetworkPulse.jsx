import React from 'react';
import { useMockStore } from '../../lib/mockStore';

export default function NetworkPulse({ className = '' }) {
  const { networkStats } = useMockStore();

  return (
    <div className={`flex items-center gap-2 text-xs font-mono text-muted ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-custom opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-custom"></span>
      </span>
      <span>
        {networkStats.workersOnline} workers online · {networkStats.inQueue} in queue
      </span>
    </div>
  );
}
