
export enum Page {
  Landing,
  InvestorDashboard,
  OperatorDashboard,
  ESGImpact,
  SLXMarketplace,
}

export type AssetType = 'EV' | 'Battery' | 'Cabinet';
export type AssetStatus = 'Available' | 'In Use' | 'Charging' | 'Maintenance';

export interface Asset {
  id: string;
  type: AssetType;
  model: string;
  status: AssetStatus;
  soh: number; // State of Health (%)
  swaps: number; // Cumulative swaps
  location: string;
  originalValue: number; // in Naira
  dailySwaps: number;
}

export interface Token {
  id: string;
  investorId: string;
  assetId: string;
  fraction: number; // 0 to 1.0
  investAmount: number; // in Naira
  roiProjection: number; // in Naira
  mintedAt: Date;
}

export interface Payout {
  payoutId: string;
  tokenId: string;
  month: string; // "YYYY-MM"
  grossRevenue: number;
  investorShare: number;
}

export interface SLXListing {
  assetId: string;
  soh: number;
  salvageValue: number; // in Naira
  listedAt: Date;
}
