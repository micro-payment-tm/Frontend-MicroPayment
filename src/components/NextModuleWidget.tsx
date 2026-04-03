"use client";

import { useRouter } from "next/navigation";

interface NextModuleWidgetProps {
  title: string;
  locked?: boolean;
  onUnlock?: () => void;
}

export default function NextModuleWidget({
  title,
  locked = true,
  onUnlock,
}: NextModuleWidgetProps) {
  const Router = useRouter();

  return (
    <div
      style={{
        borderRadius: "14px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        marginTop: "32px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            background: locked ? "rgba(255,165,0,0.15)" : "rgba(108,99,255,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          {locked ? "🔒" : "📚"}
        </div>
        <div>
          <p
            style={{
              fontWeight: 700,
              fontSize: "14px",
              color: "#e0e0f0",
              marginBottom: "2px",
            }}
          >
            {locked ? "Next Module Coming Soon" : "Continue Learning"}
          </p>
          <p style={{ fontSize: "12px", color: "#7777a0" }}>
            {locked ? `Up next: ${title}` : title}
          </p>
        </div>
      </div>
      {locked ? (
        <button
          onClick={onUnlock}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 22px",
            borderRadius: "10px",
            border: "1px solid rgba(255,165,0,0.3)",
            background: "rgba(255,165,0,0.1)",
            color: "#ffa500",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          🔔 Notify Me
        </button>
      ) : (
        <button
          onClick={() => Router.push("/courses")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 22px",
            borderRadius: "10px",
            border: "none",
            background: "linear-gradient(135deg, #6c63ff, #8b5cf6)",
            color: "#fff",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: "0 4px 20px rgba(108,99,255,0.3)",
          }}
        >
          Continue →
        </button>
      )}
    </div>
  );
}
