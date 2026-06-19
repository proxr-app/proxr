import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MockStoreProvider } from './lib/mockStore';
import { ToastProvider } from './components/ui/ToastProvider';
import Navbar from './components/layout/Navbar';

// Pages
import Landing from './pages/Landing';
import Compute from './pages/Compute';
import Create from './pages/Create';
import Earn from './pages/Earn';
import Staking from './pages/Staking';
import Referral from './pages/Referral';
import Docs from './pages/Docs';

function App() {
  return (
    <Router>
      <MockStoreProvider>
        <ToastProvider>
          <div className="flex flex-col min-h-screen bg-bg text-off-white font-mono selection:bg-white selection:text-black">
            {/* Global Navigation Bar */}
            <Navbar />

            {/* Page Contents */}
            <main className="flex-1 flex flex-col">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/compute" element={<Compute />} />
                <Route path="/create" element={<Create />} />
                <Route path="/earn" element={<Earn />} />
                <Route path="/staking" element={<Staking />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </ToastProvider>
      </MockStoreProvider>
    </Router>
  );
}

export default App;
