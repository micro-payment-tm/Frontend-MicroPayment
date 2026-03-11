"use client";

import { useAccount, useBalance, useChainId, useDisconnect } from "wagmi";

export function WalletInfo() {
  const { address, isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });

  if (!isConnected || !address) return null;

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="wallet-card">
      <div className="wallet-header">
        <div className="wallet-status">
          <span className="status-dot" />
          <span className="status-text">Connected</span>
        </div>
        <button className="disconnect-btn" onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>

      <div className="wallet-body">
        <div className="info-row">
          <span className="info-label">Wallet</span>
          <span className="info-value">{connector?.name ?? "Unknown"}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Address</span>
          <span className="info-value address">{shortAddress}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Network ID</span>
          <span className="info-value">{chainId}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Balance</span>
          <span className="info-value">{balance}</span>
        </div>
        {balance && (
          <div className="info-row">
            <span className="info-label">Balance</span>
            <span className="info-value">
              {parseFloat(balance.formatted).toFixed(6)} {balance.symbol}
            </span>
          </div>
        )}
      </div>

      <div className="wallet-footer">
        <a
          href={`https://testnet.mezo.org/address/${address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="explorer-link"
        >
          View on Explorer ↗
        </a>
      </div>
    </div>
  );
}
