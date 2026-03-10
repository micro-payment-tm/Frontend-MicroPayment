'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Bitcoin,
  TrendingUp,
  Send,
  Plus,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
  Wallet,
  CreditCard,
  FileText,
  RotateCcw,
  DollarSign,
  Activity,
} from 'lucide-react';

export default function Dashboard() {
  const [showBalance, setShowBalance] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock Data
  const btcCollateral = 0.5;
  const musdBalance = 15250.00;
  const btcPrice = 45000;
  const collateralRatio = 156;
  const yieldAPY = 8.5;
  const monthlyYield = 108.33;

  const transactions = [
    {
      id: 1,
      type: 'Collateral Deposit',
      amount: 0.25,
      date: '2024-01-15',
      status: 'completed',
      icon: Bitcoin,
    },
    {
      id: 2,
      type: 'MUSD Minted',
      amount: 7500,
      date: '2024-01-14',
      status: 'completed',
      icon: Plus,
    },
    {
      id: 3,
      type: 'Yield Earned',
      amount: 108.33,
      date: '2024-01-10',
      status: 'completed',
      icon: TrendingUp,
    },
    {
      id: 4,
      type: 'P2P Transfer',
      amount: 500,
      date: '2024-01-08',
      status: 'completed',
      icon: Send,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-950">
      {/* Navigation Header */}
      <header className="border-b border-blue-500/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Bitcoin className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white tracking-tight">MUSD</h1>
                <p className="text-xs text-blue-300">Bitcoin-Backed Payments</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {['overview', 'cards', 'invoices', 'subscriptions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-medium transition-colors capitalize ${
                    activeTab === tab
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-400 hover:text-blue-400" />
              </button>
              <button className="p-2 hover:bg-blue-500/10 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400 hover:text-blue-400" />
              </button>
              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-400" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Alex</h2>
          <p className="text-gray-400">Manage your Bitcoin-backed MUSD payments</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* BTC Collateral */}
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/40 border border-blue-500/20 rounded-2xl p-6 backdrop-blur-xl hover:border-blue-400/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-400">BTC Collateral</span>
              <Bitcoin className="w-5 h-5 text-blue-400" />
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">{btcCollateral.toFixed(3)} BTC</div>
              <div className="text-sm text-gray-400">${(btcCollateral * btcPrice).toLocaleString()}</div>
              <div className="text-xs text-green-400 mt-2">↑ 2.4% this month</div>
            </div>
          </div>

          {/* MUSD Balance */}
          <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/40 border border-emerald-500/20 rounded-2xl p-6 backdrop-blur-xl hover:border-emerald-400/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-400">MUSD Balance</span>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="text-3xl font-bold text-white">
                  {showBalance ? musdBalance.toFixed(2) : '••••••'}
                </div>
                <button onClick={() => setShowBalance(!showBalance)} className="hover:bg-emerald-500/10 p-1 rounded">
                  {showBalance ? (
                    <Eye className="w-4 h-4 text-gray-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              <div className="text-xs text-emerald-400">1 MUSD = $1 USD (Bitcoin-backed)</div>
            </div>
          </div>

          {/* Collateral Ratio */}
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-xl hover:border-purple-400/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-400">Collateral Ratio</span>
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div className="space-y-3">
              <div className="text-3xl font-bold text-white">{collateralRatio}%</div>
              <div className="w-full bg-purple-900/40 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  style={{ width: `${Math.min(collateralRatio, 100)}%` }}
                />
              </div>
              <div className="text-xs text-gray-400">Min required: 120%</div>
            </div>
          </div>

          {/* Monthly Yield */}
          <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-950/40 border border-cyan-500/20 rounded-2xl p-6 backdrop-blur-xl hover:border-cyan-400/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-400">Yield Earned</span>
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-white">${monthlyYield.toFixed(2)}</div>
              <div className="text-sm text-gray-400">{yieldAPY}% APY</div>
              <div className="text-xs text-cyan-400 mt-2">Farming Compound</div>
            </div>
          </div>
        </div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-400" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Bitcoin, label: 'Deposit BTC', color: 'from-orange-500 to-red-500' },
                  { icon: Plus, label: 'Mint MUSD', color: 'from-green-500 to-emerald-500' },
                  { icon: Send, label: 'Transfer', color: 'from-blue-500 to-cyan-500' },
                  { icon: CreditCard, label: 'Get Card', color: 'from-purple-500 to-pink-500' },
                ].map((action, idx) => (
                  <button
                    key={idx}
                    className="group flex flex-col items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-300 text-center group-hover:text-white transition-colors">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Recent Transactions
                </span>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  View all <ArrowRight className="w-3 h-3 inline" />
                </button>
              </h3>
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-colors border border-slate-700/30">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <tx.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{tx.type}</p>
                        <p className="text-xs text-gray-400">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">
                        {tx.type.includes('Minted') || tx.type.includes('Transfer') || tx.type.includes('Earned')
                          ? '+'
                          : ''}
                        {typeof tx.amount === 'number' && tx.amount % 1 === 0
                          ? tx.amount.toFixed(0)
                          : tx.amount.toFixed(2)}
                        {tx.type.includes('Collateral') || tx.type.includes('Deposit') ? ' BTC' : ' MUSD'}
                      </p>
                      <p className="text-xs text-green-400">✓ {tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Collateral Position */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400" />
                Position Summary
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Collateral Value</div>
                  <div className="text-xl font-bold text-white">${(btcCollateral * btcPrice).toLocaleString()}</div>
                </div>
                <div className="border-t border-slate-700 pt-3">
                  <div className="text-xs text-gray-400 mb-1">MUSD Minted</div>
                  <div className="text-xl font-bold text-white">${musdBalance.toLocaleString()}</div>
                </div>
                <div className="border-t border-slate-700 pt-3">
                  <div className="text-xs text-gray-400 mb-1">Liquidation Price</div>
                  <div className="text-xl font-bold text-red-400">$21,600 BTC</div>
                </div>
              </div>
            </div>

            {/* Market Info */}
            <div className="bg-gradient-to-br from-slate-900/60 to-slate-800/60 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <h3 className="text-sm font-bold text-white mb-4">Market Info</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-400 mb-1">BTC Price</div>
                  <div className="text-lg font-bold text-white flex items-center gap-2">
                    ${btcPrice.toLocaleString()}
                    <span className="text-xs text-green-400">↑ 3.2%</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">1% Fixed Rate</div>
                  <div className="text-lg font-bold text-white flex items-center gap-2">
                    Annual APR
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
              Add More Collateral
            </button>
          </div>
        </div>

        {/* Risk Management Info */}
        <div className="bg-gradient-to-r from-yellow-950/40 to-orange-950/40 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-xl">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-yellow-400 font-bold">!</span>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-yellow-200 mb-1">Maintain Your Collateral Ratio</h4>
              <p className="text-xs text-yellow-100/70">
                Your current ratio is 156%, well above the 120% minimum. If BTC price drops significantly, consider adding more collateral to avoid liquidation.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
