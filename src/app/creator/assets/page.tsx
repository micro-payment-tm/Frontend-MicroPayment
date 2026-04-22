"use client";

type AssetItem = {
  id: string;
  name: string;
  category: "NFT Certificate" | "Course Revenue" | "Creator Reward" | "Token";
  value: string;
  status: "Available" | "Locked" | "Distributed";
};

type TransactionItem = {
  id: string;
  title: string;
  date: string;
  amount: string;
  type: "Income" | "Withdrawal" | "Reward";
};

const assets: AssetItem[] = [
  {
    id: "a1",
    name: "Quantum Entanglement Revenue Pool",
    category: "Course Revenue",
    value: "1.25 ETH",
    status: "Available",
  },
  {
    id: "a2",
    name: "Relativity Completion NFT Batch",
    category: "NFT Certificate",
    value: "34 Minted",
    status: "Distributed",
  },
  {
    id: "a3",
    name: "Creator Loyalty Reward",
    category: "Creator Reward",
    value: "420 MUSDD",
    status: "Locked",
  },
  {
    id: "a4",
    name: "Platform Utility Token",
    category: "Token",
    value: "1,250 MILEA",
    status: "Available",
  },
];

const transactions: TransactionItem[] = [
  {
    id: "t1",
    title: "Course purchase payout",
    date: "2026-04-18",
    amount: "+0.42 ETH",
    type: "Income",
  },
  {
    id: "t2",
    title: "Reward distribution",
    date: "2026-04-16",
    amount: "+120 MUSDD",
    type: "Reward",
  },
  {
    id: "t3",
    title: "Wallet withdrawal",
    date: "2026-04-14",
    amount: "-0.30 ETH",
    type: "Withdrawal",
  },
  {
    id: "t4",
    title: "Course purchase payout",
    date: "2026-04-12",
    amount: "+0.18 ETH",
    type: "Income",
  },
];

export default function Page(): JSX.Element {
  return (
    <div style={{ padding: "12px", color: "#fff" }}>
      {/* HEADER */}
      <section
        style={{
          ...panel,
          padding: "20px",
          background:
            "linear-gradient(115deg, rgba(27,21,55,0.97), rgba(34,28,68,0.93), rgba(58,46,110,0.70))",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <span style={chip}>Wallet Assets</span>
              <span style={chip}>Web3 Creator</span>
              <span style={chip}>Revenue & Rewards</span>
            </div>

            <h1
              style={{
                margin: "16px 0 0 0",
                fontSize: "36px",
                lineHeight: 1.15,
                color: "rgba(255,255,255,0.96)",
              }}
            >
              Assets Overview
            </h1>

            <p
              style={{
                marginTop: "14px",
                fontSize: "15px",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.72)",
                maxWidth: "760px",
              }}
            >
              Monitor creator revenue, token balances, NFT-related assets, and
              recent financial activity connected to your educational products.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button style={secondaryBtn}>Transfer</button>
            <button style={secondaryBtn}>Export Report</button>
            <button style={primaryBtn}>Withdraw Funds</button>
          </div>
        </div>

        <div
          style={{
            marginTop: "22px",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "12px",
          }}
        >
          <StatCard label="Wallet Balance" value="4.82 ETH" accent />
          <StatCard label="Reward Tokens" value="1,250 MILEA" />
          <StatCard label="NFT Certificates" value="34" />
          <StatCard label="Pending Payout" value="0.73 ETH" />
        </div>
      </section>

      {/* MAIN */}
      <section
        style={{
          marginTop: "16px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 340px",
          gap: "14px",
          alignItems: "start",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "grid", gap: "14px" }}>
          <div style={{ ...panel, padding: "18px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "28px" }}>Owned Assets</h2>
              <button style={softBtn}>Refresh Assets</button>
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {assets.map((asset) => (
                <div key={asset.id} style={assetCard}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.94)",
                        }}
                      >
                        {asset.name}
                      </div>
                      <div
                        style={{
                          marginTop: "6px",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {asset.category}
                      </div>
                    </div>

                    <span style={statusChip(asset.status)}>{asset.status}</span>
                  </div>

                  <div
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: 700,
                        color: "#a78bfa",
                      }}
                    >
                      {asset.value}
                    </div>

                    <div style={{ display: "flex", gap: "8px" }}>
                      <button style={miniBtn}>View</button>
                      <button style={miniBtn}>Manage</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...panel, padding: "18px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "28px" }}>
                Recent Transactions
              </h2>
              <button style={softBtn}>View All</button>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              {transactions.map((tx) => (
                <div key={tx.id} style={transactionCard}>
                  <div>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.94)",
                      }}
                    >
                      {tx.title}
                    </div>
                    <div
                      style={{
                        marginTop: "4px",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.48)",
                      }}
                    >
                      {tx.date}
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color:
                          tx.type === "Withdrawal"
                            ? "#fca5a5"
                            : tx.type === "Reward"
                              ? "#fbbf24"
                              : "#34d399",
                      }}
                    >
                      {tx.amount}
                    </div>
                    <div
                      style={{
                        marginTop: "4px",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.42)",
                      }}
                    >
                      {tx.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "grid", gap: "14px" }}>
          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Wallet Snapshot</h3>
            <MiniStat label="Primary Wallet" value="0x892...32c1" />
            <MiniStat label="Available ETH" value="4.82 ETH" />
            <MiniStat label="Locked Rewards" value="420 MUSDD" />
            <MiniStat label="Creator Token" value="1,250 MILEA" />
          </div>

          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Asset Allocation</h3>

            <div style={{ marginTop: "16px", display: "grid", gap: "10px" }}>
              <AllocationRow label="Course Revenue" value="52%" />
              <AllocationRow label="Tokens" value="23%" />
              <AllocationRow label="NFT Certificates" value="15%" />
              <AllocationRow label="Rewards" value="10%" />
            </div>
          </div>

          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>Quick Actions</h3>
            <div style={{ marginTop: "14px", display: "grid", gap: "10px" }}>
              <button style={secondaryWideBtn}>Withdraw to Wallet</button>
              <button style={secondaryWideBtn}>Mint Certificate Batch</button>
              <button style={secondaryWideBtn}>Distribute Rewards</button>
              <button style={dangerWideBtn}>Lock Asset Pool</button>
            </div>
          </div>

          <div style={{ ...panel, padding: "18px" }}>
            <h3 style={{ margin: 0, fontSize: "22px" }}>💡 Tips & Insights</h3>

            <div style={{ marginTop: "14px", display: "grid", gap: "12px" }}>
              <TipItem
                title="Optimize Revenue Flow"
                desc="Distribute earnings regularly to avoid large locked balances and improve liquidity."
              />
              <TipItem
                title="Use Free Preview Strategically"
                desc="Unlock selected lessons to attract more students and increase conversion rate."
              />
              <TipItem
                title="Leverage NFT Certificates"
                desc="Mint certificates for completed courses to increase perceived value and engagement."
              />
              <TipItem
                title="Monitor Token Allocation"
                desc="Keep a balanced distribution between revenue, rewards, and platform tokens."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}): JSX.Element {
  return (
    <div style={{ ...panel, padding: "14px 16px" }}>
      <div
        style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "rgba(255,255,255,0.38)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          marginTop: "10px",
          fontSize: "24px",
          fontWeight: 700,
          color: accent ? "#a78bfa" : "#fff",
        }}
      >
        {value}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element {
  return (
    <div style={{ marginTop: "14px" }}>
      <div style={{ color: "rgba(255,255,255,0.42)", fontSize: "12px" }}>
        {label}
      </div>
      <div style={{ marginTop: "4px", color: "#fff", fontSize: "18px" }}>
        {value}
      </div>
    </div>
  );
}

function AllocationRow({
  label,
  value,
}: {
  label: string;
  value: string;
}): JSX.Element {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "14px",
          color: "rgba(255,255,255,0.78)",
          marginBottom: "6px",
        }}
      >
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div
        style={{
          height: "10px",
          borderRadius: "999px",
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: value,
            height: "100%",
            background: "linear-gradient(90deg, #5f47ff, #8b5cf6)",
          }}
        />
      </div>
    </div>
  );
}

function TipItem({
  title,
  desc,
}: {
  title: string;
  desc: string;
}): JSX.Element {
  return (
    <div
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.03)",
        padding: "12px 14px",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          fontWeight: 700,
          color: "#a78bfa",
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: "6px",
          fontSize: "13px",
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.6,
        }}
      >
        {desc}
      </div>
    </div>
  );
}

const panel: React.CSSProperties = {
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.04)",
  boxShadow: "0 18px 55px rgba(0,0,0,0.22)",
};

const chip: React.CSSProperties = {
  borderRadius: "999px",
  padding: "6px 12px",
  background: "rgba(255,255,255,0.06)",
  color: "rgba(255,255,255,0.8)",
  fontSize: "12px",
  fontWeight: 700,
};

const statusChip = (
  status: "Available" | "Locked" | "Distributed"
): React.CSSProperties => ({
  borderRadius: "999px",
  padding: "6px 12px",
  background:
    status === "Available"
      ? "rgba(16,185,129,0.18)"
      : status === "Locked"
        ? "rgba(245,158,11,0.18)"
        : "rgba(109,76,255,0.18)",
  color:
    status === "Available"
      ? "#34d399"
      : status === "Locked"
        ? "#fbbf24"
        : "#a78bfa",
  fontSize: "12px",
  fontWeight: 700,
});

const primaryBtn: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "12px",
  background: "#6d4cff",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  fontWeight: 700,
};

const secondaryBtn: React.CSSProperties = {
  padding: "12px 18px",
  borderRadius: "12px",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const softBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "14px",
  background: "rgba(109,76,255,0.10)",
  border: "1px solid rgba(109,76,255,0.20)",
  color: "#a78bfa",
  cursor: "pointer",
  fontWeight: 700,
};

const miniBtn: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
};

const secondaryWideBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.10)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
  textAlign: "left",
};

const dangerWideBtn: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: "12px",
  background: "rgba(239,68,68,0.10)",
  border: "1px solid rgba(239,68,68,0.22)",
  color: "#fca5a5",
  cursor: "pointer",
  fontWeight: 700,
  textAlign: "left",
};

const assetCard: React.CSSProperties = {
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.025)",
  padding: "16px",
};

const transactionCard: React.CSSProperties = {
  borderRadius: "16px",
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.025)",
  padding: "14px 16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "14px",
};