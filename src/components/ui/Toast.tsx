"use client";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  visible: boolean;
  onClose?: () => void;
};

export default function Toast({
  message,
  type = "success",
  visible,
  onClose,
}: ToastProps): JSX.Element | null {
  const bgColor =
    type === "success"
      ? "rgba(16,185,129,0.18)"
      : type === "error"
        ? "rgba(239,68,68,0.18)"
        : "rgba(59,130,246,0.18)";

  const textColor =
    type === "success"
      ? "#34d399"
      : type === "error"
        ? "#fca5a5"
        : "#93c5fd";

  const borderColor =
    type === "success"
      ? "rgba(16,185,129,0.28)"
      : type === "error"
        ? "rgba(239,68,68,0.28)"
        : "rgba(59,130,246,0.28)";

  const icon =
    type === "success" ? "✓" : type === "error" ? "✕" : "i";

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 9999,
        minWidth: "300px",
        maxWidth: "420px",
        borderRadius: "16px",
        padding: "14px 16px",
        background: bgColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
        fontSize: "14px",
        fontWeight: 700,
        boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "12px",
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "all 0.28s ease",
      }}
    >
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "999px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.08)",
            fontSize: "13px",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        <div
          style={{
            lineHeight: 1.6,
            color: textColor,
            paddingTop: "1px",
          }}
        >
          {message}
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        style={{
          border: "none",
          background: "transparent",
          color: textColor,
          fontSize: "16px",
          fontWeight: 700,
          cursor: "pointer",
          padding: 0,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}