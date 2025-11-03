
import React, { useState, useEffect, useCallback } from 'react';
import { Page, Asset, Token, Payout, SLXListing } from './types';
import { initialAssets, initialTokens, initialPayouts, initialSLXListings } from './services/mockData';
import { Header } from './components/Header';
import { LandingPage } from './pages/LandingPage';
import { InvestorDashboard } from './pages/InvestorDashboard';
import { OperatorDashboard } from './pages/OperatorDashboard';
import { ESGImpactPage } from './pages/ESGImpactPage';
import { SLXMarketplace } from './pages/SLXMarketplace';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);
  const [userRole, setUserRole] = useState<'investor' | 'operator'>('investor');
  
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [tokens, setTokens] = useState<Token[]>(initialTokens);
  const [payouts, setPayouts] = useState<Payout[]>(initialPayouts);
  const [slxListings, setSlxListings] = useState<SLXListing[]>(initialSLXListings);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const updateTelemetry = useCallback(() => {
    setAssets(prevAssets => {
        const newAssets = prevAssets.map(asset => {
            if (asset.soh <= 0) return asset;
            const sohChange = (Math.random() * 0.1) - 0.05;
            const newSoh = Math.max(0, Math.min(100, parseFloat((asset.soh + sohChange).toFixed(2))));
            const newDailySwaps = asset.status === 'In Use' ? asset.dailySwaps + Math.floor(Math.random() * 2) : asset.dailySwaps;
            return {
                ...asset,
                soh: newSoh,
                dailySwaps: newDailySwaps
            };
        });

        const retiredAssets = newAssets.filter(a => a.soh < 50 && !slxListings.some(slx => slx.assetId === a.id));
        if (retiredAssets.length > 0) {
            const newSlxListings = retiredAssets.map(asset => ({
                assetId: asset.id,
                soh: asset.soh,
                salvageValue: asset.originalValue * 0.2,
                listedAt: new Date(),
            }));
            setSlxListings(prev => [...prev, ...newSlxListings]);
        }
        
        return newAssets;
    });
  }, [slxListings]);


  useEffect(() => {
    const interval = setInterval(updateTelemetry, 5000);
    return () => clearInterval(interval);
  }, [updateTelemetry]);

  const handleMintToken = (assetId: string, fraction: number, investAmount: number) => {
    const newToken: Token = {
        id: `TKN-${assetId}-${Date.now()}`,
        investorId: 'user-001',
        assetId,
        fraction,
        investAmount,
        roiProjection: investAmount * 0.45,
        mintedAt: new Date()
    };
    setTokens(prev => [...prev, newToken]);
  };

  const handleSimulateSwap = (assetId: string) => {
    setAssets(prev => prev.map(asset => 
        asset.id === assetId 
        ? {
            ...asset,
            soh: Math.max(0, asset.soh - 1),
            swaps: asset.swaps + 1,
            dailySwaps: asset.dailySwaps + 1,
          } 
        : asset
    ));
  };
    
  const handleSimulateCharge = (assetId: string) => {
    setAssets(prev => prev.map(asset => 
        asset.id === assetId
        ? {
            ...asset,
            soh: Math.min(100, asset.soh + 20)
          }
        : asset
    ));
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Landing:
        return <LandingPage onNavigate={handleNavigate} />;
      case Page.InvestorDashboard:
        return <InvestorDashboard assets={assets} tokens={tokens} payouts={payouts} onMintToken={handleMintToken} />;
      case Page.OperatorDashboard:
        return <OperatorDashboard assets={assets} onSimulateCharge={handleSimulateCharge} onSimulateSwap={handleSimulateSwap} />;
      case Page.ESGImpact:
        return <ESGImpactPage assets={assets} />;
      case Page.SLXMarketplace:
        return <SLXMarketplace slxListings={slxListings} assets={assets} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  if (currentPage === Page.Landing) {
    return <LandingPage onNavigate={handleNavigate} />;
  }

  return (
    <div className="min-h-screen bg-brand-charcoal">
      <Header 
        currentPage={currentPage} 
        userRole={userRole} 
        onNavigate={handleNavigate}
        onSetUserRole={setUserRole}
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
